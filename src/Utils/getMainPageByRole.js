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

  const normalizedRoles = roles.map(role => 
    typeof role === 'string' ? role.toLowerCase().trim() : role
  );

  if (normalizedRoles.includes("admin")) {
    return homeRoutes.admin;
  }
  if (normalizedRoles.includes("idea_owner")) {
    return homeRoutes.idea_owner;
  }
  if (normalizedRoles.includes("evaluator")) {
    return homeRoutes.evaluator;
  }
  if (normalizedRoles.includes("incubator")) {
    return homeRoutes.incubator;
  }
  if (normalizedRoles.includes("volunteer")) {
    return homeRoutes.volunteer;
  }
  if (normalizedRoles.includes("visitor")) {
    return homeRoutes.visitor;
  }
  
  return homeRoutes.visitor;
};