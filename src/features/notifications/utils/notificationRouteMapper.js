// src/features/notifications/utils/notificationRouteMapper.js

const staticRoutes = {
 
  "/notifications": "/notificationspage",
  "/contact-admin": "/contact",

  // WORKSHOPS
  "/api/admin/workshops/": "/admin/workshops",
  "/api/volunteers/public-workshops/": "/activitiespage",
  "/api/workshops/": "/admin/workshops",

  // CONSULTATIONS
  "/api/volunteers/consultations/": "/requests-page",

  // TEAM JOIN REQUESTS & VOLUNTEERS
  "/api/volunteers/join-requests/": "/requests-page",
  "/api/ideas/team/": "/team",
  "/api/ideas/suggested-volunteers/": "/team",
  "/api/volunteers/me/": "/volunteer-profile",

  // BOOTCAMP & EXHIBITION
  
  "/api/admin/exhibition/submissions/": "/admin/exhibition",
  "/api/ideas/exhibition/dashboard/": "/incubation-stages",

  // TEAM BUILDING
  "/api/admin/volunteers/team-request-owners/": "/admin/volunteers",

  // ADMIN SEASON EVENTS
  "/api/ideas/form/": "/ideaform",

  //"/api/volunteers/consultants/<str:primary_skill>/":"/Consultants",
};


const dynamicRoutes = [
  {
  pattern: /^\/?api\/evaluations\/ideas\/(\d+)\/notes\/?$/,
  build: (ideaId) => `/rejection-notes/${ideaId}`,
},
  {
  pattern: /^\/?api\/evaluations\/invitation-details\/(\d+)\/?$/,
  build: (invitationId) => `/evaluation-invitation/${invitationId}`,
},
  {
  pattern: /^\/?admin\/camp-management\/(\d+)\/?$/,
  build: (seasonId) => `/admin/camp-management/${seasonId}`,
},
  {
  pattern: /^\/?api\/volunteers\/consultants\/([^/]+)\/?$/,
  build: (primarySkill) => `/consultantslist/${primarySkill}`,
},
  
  {
   
    pattern: /^\/?api\/volunteers\/workshop-details\/(\d+)\/?$/,
    build: (id) => `/workshopinfo/${id}`,
  },
  {
    pattern: /^\/api\/ideas\/public-workshops-details\/(\d+)\/?$/,
    build: (workshop_id) => `/public-workshops/${workshop_id}`,
  },

  
  {
  
    pattern: /^\/?api\/admin\/ideas\/(\d+)\/details\/?$/,
    build: (id) => `/admin/projects-details/${id}`,
  },
  {
    pattern: /^\/?ideas\/(\d+)\/?$/,
    build: (id) => `/ideas-details/${id}`,
  },

  {
    pattern: /^\/?chat\/(\d+)\/?$/,
    build: (id) => `/messagespage/${id}`,
  },

  //ملاحظات اللجنة
  ///rejection-notes/:id
  //دعوة التقييم
  ///evaluation-invitation/:id
];

export function mapNotificationRoute(actionUrl) {
  if (!actionUrl) {
    return null;
  }

  const cleanUrl = actionUrl.trim();

  // 1. Exact match
  if (staticRoutes[cleanUrl]) {
    return staticRoutes[cleanUrl];
  }

  // 2. Normalize trailing slash
  const normalizedUrl = cleanUrl.endsWith("/")
    ? cleanUrl
    : `${cleanUrl}/`;

  if (staticRoutes[normalizedUrl]) {
    return staticRoutes[normalizedUrl];
  }

  // 3. Dynamic routes
  for (const route of dynamicRoutes) {
    const match = normalizedUrl.match(route.pattern);

    if (match) {
      return route.build(match[1]);
    }
  }

  console.warn(
    "[Notification] No frontend route found for:",
    actionUrl
  );

  return null;
}