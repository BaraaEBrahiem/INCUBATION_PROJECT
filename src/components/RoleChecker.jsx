import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useGetMeQuery } from "../api/endpoints/authApi";
import { updateRoles as updateReduxRoles } from "../redux/authSlice";

import { RoleContext } from "../Context/RoleContext";


const RoleChecker = () => {

  const dispatch = useDispatch();

  const { updateRoles: updateContextRoles } =
    useContext(RoleContext);


  // الأدوار الحالية الموجودة في Redux
  const currentRoles = useSelector(
    (state) => state.auth.roles || []
  );


  // التوكن
  const token = useSelector(
    (state) => state.auth.token
  );


  // جلب المستخدم + Polling
  const { data } = useGetMeQuery(undefined, {
    skip: !token,
    pollingInterval: 30000,
  });


  useEffect(() => {

    if (!data?.roles) return;


    // Roles القادمة من Django
    // ["VOLUNTEER", "EVALUATOR"]
    //
    // نحولها إلى:
    // ["volunteer", "evaluator"]

    const newRoles = data.roles
      .map((role) =>
        typeof role === "string"
          ? role.toLowerCase().trim()
          : role
      )
      .filter(Boolean);


    // Roles الموجودة حالياً في Redux
    const oldRoles = currentRoles
      .map((role) =>
        typeof role === "string"
          ? role.toLowerCase().trim()
          : role
      )
      .filter(Boolean);


    // ترتيب العناصر حتى لا نعتبر:
    //
    // ["admin", "evaluator"]
    //
    // مختلفة عن:
    //
    // ["evaluator", "admin"]

    const sortedNewRoles = [...newRoles].sort();
    const sortedOldRoles = [...oldRoles].sort();


    const rolesChanged =
      JSON.stringify(sortedNewRoles) !==
      JSON.stringify(sortedOldRoles);


    // لا يوجد تغيير
    if (!rolesChanged) {
      return;
    }


    console.log("🔄 ROLES CHANGED");
    console.log("Old roles:", oldRoles);
    console.log("New roles:", newRoles);


    // 1️⃣ تحديث Redux
    dispatch(updateReduxRoles(newRoles));


    // 2️⃣ تحديث RoleContext
    updateContextRoles(newRoles);


  }, [
    data,
    currentRoles,
    dispatch,
    updateContextRoles,
  ]);


  return null;
};


export default RoleChecker;