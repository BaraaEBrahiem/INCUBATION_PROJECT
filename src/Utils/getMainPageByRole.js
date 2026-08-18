const homeRoutes = {
  visitor: "/visitor-mainpage",
  idea_owner: "/ideaowner-mainpage",
  volunteer: "/volunteer-mainpage",
  evaluator: "/evaluator-mainpage",
  incubator: "/incubator-mainpage",
  admin: "/admin-mainpage",
  secretary: "/admin-mainpage",
};

export const getMainPageByRole = (roles) => {
  if (!roles || !Array.isArray(roles)) {
    return homeRoutes.visitor;
  }

  if (roles.includes("admin")) {
    return homeRoutes.admin;
  }
  if (roles.includes("secretary")) {
    return homeRoutes.secretary;
  }
  if (roles.includes("idea_owner")) {
    return homeRoutes.idea_owner;
  }
  if (roles.includes("evaluator")) {
    return homeRoutes.evaluator;
  }
  if (roles.includes("incubator")) {
    return homeRoutes.incubator;
  }
  if (roles.includes("volunteer")) {
    return homeRoutes.volunteer;
  }
  if (roles.includes("visitor")) {
    return homeRoutes.visitor;
  }
  
  return homeRoutes.visitor;
};