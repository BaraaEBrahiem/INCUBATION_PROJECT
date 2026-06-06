import { navOptions } from "../config/NavOptions";

export function buildUserNavOptions(roles) {
  if (!roles || !Array.isArray(roles) || roles.length === 0) {
    return [
      { label: "الرئيسية", to: "/visitor-mainpage", scrollId: "" },
      ...(navOptions.visitor || [])
    ];
  }

  let mainRole = "visitor";

  if (roles.includes("idea_owner")) {
    mainRole = "idea_owner";
  } else if (roles.includes("evaluator")) {
    mainRole = "evaluator";
  } else if (roles.includes("incubator")) {
    mainRole = "incubator";
  } else if (roles.includes("volunteer")) {
    mainRole = "volunteer";
  }

  const homeRoutes = {
    visitor: "/visitor-mainpage",
    idea_owner: "/ideaowner-mainpage",
    volunteer: "/volunteer-mainpage",
    evaluator: "/evaluator-mainpage",
    incubator: "/incubator-mainpage",
  };

  const homeLink = { label: "الرئيسية", to: homeRoutes[mainRole] || "/visitor-mainpage", scrollId: "" };

  const mergedOptions = roles.flatMap((role) => navOptions[role] || []);
  const withoutHome = mergedOptions.filter(opt => opt.label !== "الرئيسية");

  const cleanedOptions = Array.from(
    new Map(withoutHome.map(opt => [opt.to, opt])).values()
  );

  return [homeLink, ...cleanedOptions].filter(Boolean);
}