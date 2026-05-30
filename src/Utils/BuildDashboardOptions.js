import { RoleOptions } from "../config/RoleOptions";

export function BuildDashboardOptions(roles) {
  if (!roles || !Array.isArray(roles) || roles.length === 0) {
    return RoleOptions.visitor || [];
  }

  const allCombinedOptions = [];

  roles.forEach((role) => {
    if (RoleOptions[role]) {
      allCombinedOptions.push(...RoleOptions[role]);
    }
  });

  if (allCombinedOptions.length === 0) {
    return RoleOptions.visitor || [];
  }


  const uniqueOptions = allCombinedOptions.filter((option, index, self) => {
    if (option.link === "/profile") {
    
      const hasVolunteerProfile = self.some(o => o.link === "/volunteer-profile");
     
      if (hasVolunteerProfile) return false;
    }

    return self.findIndex((o) => o.link === option.link) === index;
  });

  return uniqueOptions;
}