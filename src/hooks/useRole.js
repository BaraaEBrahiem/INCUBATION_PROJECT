import { useContext } from "react";
import { RoleContext } from "../Context/RoleContext.jsx";

export const useRole = () => useContext(RoleContext);
