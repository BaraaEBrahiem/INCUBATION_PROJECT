import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useGetMeQuery } from "../api/endpoints/authApi";
import { updateRoles as updateReduxRoles } from "../redux/authSlice";

import { RoleContext } from "../Context/RoleContext";


// =====================================================
// Normalize Roles
// =====================================================

const normalizeRoles = (roles) => {
  // إذا لم تكن Array نحولها إلى Array
  if (!Array.isArray(roles)) {
    roles = roles ? [roles] : [];
  }

  const normalizedRoles = roles
    .filter(Boolean)
    .map((role) =>
      typeof role === "string"
        ? role.toLowerCase().trim()
        : role
    )
    .filter(Boolean);

  // المستخدم بدون Role يعتبر Visitor
  return normalizedRoles.length > 0
    ? normalizedRoles
    : ["visitor"];
};


// =====================================================
// Compare Roles
// =====================================================

const rolesAreEqual = (rolesA = [], rolesB = []) => {
  const normalizedA = normalizeRoles(rolesA).sort();
  const normalizedB = normalizeRoles(rolesB).sort();

  return (
    JSON.stringify(normalizedA) ===
    JSON.stringify(normalizedB)
  );
};


// =====================================================
// RoleChecker
// =====================================================

const RoleChecker = () => {
  const dispatch = useDispatch();

  // ===================================================
  // Role Context
  // ===================================================

  const { updateRoles: updateContextRoles } =
    useContext(RoleContext);


  // ===================================================
  // Redux
  // ===================================================

  const token = useSelector(
    (state) => state.auth.token
  );

  const currentRoles = useSelector(
    (state) => state.auth.roles || []
  );


  // ===================================================
  // Get Current User
  // ===================================================

  const {
    data,
    isSuccess,
  } = useGetMeQuery(undefined, {
    skip: !token,

    // فحص التغييرات كل 30 ثانية
    pollingInterval: 30000,

    // إعادة الجلب عند الحاجة
    refetchOnMountOrArgChange: true,
  });


  // ===================================================
  // Check Roles
  // ===================================================

  useEffect(() => {
    // لا يوجد Token
    if (!token) {
      return;
    }

    // لم تصل البيانات بعد
    if (!isSuccess || !data) {
      return;
    }


    // =================================================
    // استخراج Roles من أكثر من احتمال
    // =================================================

    const serverRoles =
      data?.roles ??
      data?.user?.roles ??
      data?.user?.role ??
      data?.role ??
      [];


    // =================================================
    // Normalize
    // =================================================

    const newRoles = normalizeRoles(serverRoles);


    // =================================================
    // إذا لم يتغير الدور لا تعمل أي شيء
    // =================================================

    if (rolesAreEqual(currentRoles, newRoles)) {
      return;
    }


    // =================================================
    // Roles Changed
    // =================================================

    console.log("====================================");
    console.log("🔄 ROLES CHANGED");
    console.log("Old roles:", currentRoles);
    console.log("New roles:", newRoles);
    console.log("====================================");


    // =================================================
    // 1. تحديث Redux
    // =================================================

    dispatch(
      updateReduxRoles(newRoles)
    );


    // =================================================
    // 2. تحديث RoleContext
    // =================================================

    updateContextRoles(newRoles);

  }, [
    token,
    data,
    isSuccess,
    currentRoles,
    dispatch,
    updateContextRoles,
  ]);


  return null;
};


export default RoleChecker;