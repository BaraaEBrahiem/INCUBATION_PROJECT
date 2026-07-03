// src/features/notifications/utils/notificationRouteMapper.js

const staticRoutes = {
  "/notifications": "/notificationspage",

  "/api/ideas/form/": "/ideaform",

  "/api/volunteers/consultations/":"/volunteer-center",

  "/api/volunteers/me/": "/volunteer-profile",

  "/api/volunteers/join-requests/": "/requests-page",

  

  "/contact-admin": "/contact",
};

const dynamicRoutes = [
  {
    pattern: /^\/api\/volunteers\/workshop-details\/(\d+)\/?$/,
    build: (id) => `/workshopinfo/${id}`,
  },

  {
    pattern: /^\/api\/ideas\/public-workshops-details\/(\d+)\/?$/,
    build: (id) => `/public-workshops/${id}`,
  },

  {
    pattern: /^\/api\/admin\/ideas\/(\d+)\/details\/?$/,
    build: (id) => `/admin/projects-details/${id}`,
  },

  {
    pattern: /^\/chat\/(\d+)\/?$/,
    build: (id) => `/messagespage/${id}`,
  },
];

export function mapNotificationRoute(actionUrl) {
  if (!actionUrl) {
    return null;
  }

  // Static routes
  if (staticRoutes[actionUrl]) {
    return staticRoutes[actionUrl];
  }

  // Dynamic routes
  for (const route of dynamicRoutes) {
    const match = actionUrl.match(route.pattern);

    if (match) {
      return route.build(match[1]);
    }
  }

  return null;
}