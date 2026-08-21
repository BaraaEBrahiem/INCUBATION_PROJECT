import { createContext, useCallback, useMemo, useState } from "react";

export const RoleContext = createContext(null);

const normalizeRoles = (roles) => {
  if (!Array.isArray(roles)) {
    roles = roles ? [roles] : [];
  }

  const normalized = roles
    .filter(Boolean)
    .map((role) =>
      typeof role === "string"
        ? role.toLowerCase().trim()
        : role
    )
    .filter(Boolean);

  return normalized.length > 0 ? normalized : ["visitor"];
};

export const RoleProvider = ({ children }) => {
  const [roles, setRoles] = useState(() => {
    try {
      const stored = localStorage.getItem("roles");

      if (!stored) {
        return ["visitor"];
      }

      return normalizeRoles(JSON.parse(stored));
    } catch (error) {
      console.error("Failed to load roles:", error);
      return ["visitor"];
    }
  });

  const updateRoles = useCallback((newRoles) => {
    const normalizedRoles = normalizeRoles(newRoles);

    setRoles(normalizedRoles);

    localStorage.setItem(
      "roles",
      JSON.stringify(normalizedRoles)
    );
  }, []);

  const value = useMemo(
    () => ({
      roles,
      updateRoles,
    }),
    [roles, updateRoles]
  );

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
};