const homeRoutes = {
  visitor: "/visitor-mainpage",
  idea_owner: "/ideaowner-mainpage",
  volunteer: "/volunteer-mainpage",
  evaluator: "/volunteer-evaluated-mainpage",
  incubator: "/volunteer-incubated-mainpage",
  admin: "/admin-mainpage",
};

export const getMainPageByRole = (roles) => {
  if (!roles || !Array.isArray(roles)) {
    return homeRoutes.visitor;
  }

  if (roles.includes("admin")) {
    return homeRoutes.admin;
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