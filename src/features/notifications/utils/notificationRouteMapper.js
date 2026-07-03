const staticRoutes = {
 
  "/notifications": "/notificationspage",
  "/contact-admin": "/contact",

  // WORKSHOPS
  "/api/admin/workshops/": "/admin/workshops",
  "/api/volunteers/public-workshops/": "/activitiespage",

  // CONSULTATIONS
  "/api/volunteers/consultations/": "/requests-page",

  // TEAM JOIN REQUESTS & VOLUNTEERS
  "/api/volunteers/join-requests/": "/team",
  "/api/ideas/team-dashboard/": "/team",
  "/api/ideas/suggested-volunteers/": "/team",
  "/api/volunteers/me/": "/volunteer-profile",

  // BOOTCAMP & EXHIBITION
  
  "/api/admin/exhibition/submissions/": "/admin/exhibition",
  "/api/ideas/exhibition/dashboard/": "/incubation-stages",

  // TEAM BUILDING
  "/api/admin/volunteers/team-request-owners/": "/admin/volunteers",

  // ADMIN SEASON EVENTS
  "/api/ideas/form/": "/ideaform",
};


const dynamicRoutes = [
  
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

  if (staticRoutes[cleanUrl]) {
    return staticRoutes[cleanUrl];
  }

  for (const route of dynamicRoutes) {
    const match = cleanUrl.match(route.pattern);

    if (match) {
      
      return route.build(match[1]);
    }
  }


  return null;
}