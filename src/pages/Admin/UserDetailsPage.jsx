import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import {
  useGetAdminUserByIdQuery,
  useFreezeUserMutation,
  useActivateUserMutation,
  useUpdateUserRolesMutation,
  useSendNotificationToUserMutation
} from "../../api/endpoints/admin/usersOptionsApi.js";

import { showError, showSuccess } from "../../Utils/toast";

import UserHeaderActions from "../../components/Admin_Dashboard/Users/UserHeaderActions";
import UserInfoCard from "../../components/Admin_Dashboard/Users/UserInfoCard";
import VolunteerWorkshopsSection from "../../components/Admin_Dashboard/Users/VolunteerWorkshopSection";
import EvaluationSection from "../../components/Admin_Dashboard/Users/EvaluationSection";


const UserDetailsPage = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const {
    data: serverUser,
    isLoading,
    isError
  } = useGetAdminUserByIdQuery(id);

  useEffect(() => {
    if (serverUser) {
      console.log("البيانات القادمة من الباك إند:", serverUser);
    }
  }, [serverUser]);

  const [freezeUser] = useFreezeUserMutation();
  const [activateUser] = useActivateUserMutation();
  const [updateUserRoles] = useUpdateUserRolesMutation();
  const [sendNotification] = useSendNotificationToUserMutation();


  const finalUser = serverUser ;

  const userRolesCodes =
    finalUser?.roles ||
    finalUser?.basic_info?.current_roles ||
    [];

  const getSectionData = (type) => {
    const section = finalUser?.sections?.find(
      (sec) => sec.type === type
    );

    return section ? section.data : null;
  };

  const handleFreeze = async (user_id) => {
    try {
      await freezeUser(user_id).unwrap();

      showSuccess("تم تجميد حساب المستخدم بنجاح");
    } catch (error) {
      console.error("خطأ أثناء تجميد الحساب:", error);
      showError("فشل تجميد الحساب، يرجى المحاولة لاحقاً");
    }
  };

  const handleActivate = async (user_id) => {
    try {
      await activateUser(user_id).unwrap();

      showSuccess("تم تفعيل حساب المستخدم بنجاح");
    } catch (error) {
      console.error("خطأ أثناء تفعيل الحساب:", error);
      showError("فشل تفعيل الحساب");
    }
  };

  const handleChangeRole = async (
    user_id,
    selectedRoleIds
  ) => {
    try {
      await updateUserRoles({
        user_id,
        roles: selectedRoleIds
      }).unwrap();

      showSuccess(
        "تم تحديث أدوار وصلاحيات المستخدم بنجاح"
      );
    } catch (error) {
      console.error(
        "خطأ أثناء تحديث الأدوار:",
        error
      );
      showError(
        "حدث خطأ أثناء حفظ الأدوار الجديدة"
      );
    }
  };

  const handleSendNotification = async (
    user_id,
    text
  ) => {
    if (!text.trim()) return;

    try {
      await sendNotification({
        user_id,
        message: text
      }).unwrap();

      showSuccess(
        "تم إرسال الإشعار إلى المستخدم بنجاح"
      );
    } catch (error) {
      console.error(
        "خطأ أثناء إرسال الإشعار:",
        error
      );
      showError("فشل إرسال الإشعار");
    }
  };

  
  const handleTaskClick = (taskId) =>
    navigate(`/workshopinfo/${taskId}`);

  const handleViewProject = (projectId) =>

    navigate(`/admin/projects-details/${projectId}`);

  if (isLoading) {
    return (
      <div className="text-center mt-20 font-bold">
        جاري تحميل بيانات المستخدم...
      </div>
    );
  }

  if (isError && !finalUser) {
    return (
      <div className="text-center mt-20 text-red-500 font-bold">
        حدث خطأ أثناء جلب بيانات المستخدم
      </div>
    );
  }

  return (
    <div
      className="bg-white-color min-h-screen pb-6"
      dir="rtl"
    >
      <div className="container">
        <UserHeaderActions
          user={{
            id: finalUser.basic_info.id,
            name:
              finalUser.basic_info.full_name,
            role: userRolesCodes,
            volunteer_request_id:
      finalUser.basic_info
        ?.volunteer_request_id

          }}
          is_active={
            finalUser.basic_info.is_active
          }
          onFreeze={handleFreeze}
          onActivate={handleActivate}
          onChangeRole={handleChangeRole}
          onSendNotification={
            handleSendNotification
          }
        />

        <UserInfoCard
          basicInfo={finalUser.basic_info}
        />

        {userRolesCodes.includes(
          "VOLUNTEER"
        ) && (
          <VolunteerWorkshopsSection
            workshops={
              getSectionData(
                "VOLUNTEER"
              )?.workshops || []
            }
            onTaskClick={
              handleTaskClick
            }
          />
        )}

        {userRolesCodes.includes(
          "EVALUATOR"
        ) && (
          <EvaluationSection
            assignments={
              getSectionData(
                "EVALUATOR"
              )?.assignments || []
            }
            roleType="EVALUATOR"
            onViewProject={
              handleViewProject
            }
          />
        )}

        {userRolesCodes.includes(
          "INCUBATOR"
        ) && (
          <EvaluationSection
            ideas={
              getSectionData(
                "INCUBATOR"
              )?.ideas || []
            }
            roleType="INCUBATOR"
            onViewProject={
              handleViewProject
            }
          />
        )}

        {userRolesCodes.includes(
          "IDEA_OWNER"
        ) && (
          <EvaluationSection
            ideas={
              getSectionData(
                "IDEA_OWNER"
              )?.ideas || []
            }
            roleType="IDEA_OWNER"
            onViewProject={
              handleViewProject
            }
          />
        )}
      </div>
    </div>
  );
};

export default UserDetailsPage;