import { useParams, useNavigate } from "react-router-dom";
<<<<<<< HEAD
// import { useState, useEffect } from "react";

/*
=======
import { useEffect } from "react";

>>>>>>> adminFeature
import {
  useGetAdminUserByIdQuery,
  useFreezeUserMutation,
  useActivateUserMutation,
  useUpdateUserRolesMutation,
  useSendNotificationToUserMutation
} from "../../api/endpoints/admin/usersOptionsApi.js";
<<<<<<< HEAD
*/
// import { showError, showSuccess } from "../../Utils/toast";
=======

import { showError, showSuccess } from "../../Utils/toast";
>>>>>>> adminFeature

import UserHeaderActions from "../../components/Admin_Dashboard/Users/UserHeaderActions";
import UserInfoCard from "../../components/Admin_Dashboard/Users/UserInfoCard";
import UserMessagesSection from "../../components/Admin_Dashboard/Users/UserMessageSection";
import VolunteerWorkshopsSection from "../../components/Admin_Dashboard/Users/VolunteerWorkshopSection";
import EvaluationSection from "../../components/Admin_Dashboard/Users/EvaluationSection";

const UserDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

<<<<<<< HEAD
  /*
  const { data: serverUser, isLoading, isError } = useGetAdminUserByIdQuery(id);
  
=======
  const {
    data: serverUser,
    isLoading,
    isError
  } = useGetAdminUserByIdQuery(id);

>>>>>>> adminFeature
  useEffect(() => {
    if (serverUser) {
      console.log("البيانات القادمة من الباك إند:", serverUser);
    }
  }, [serverUser]);
<<<<<<< HEAD
  */

  /*
=======

>>>>>>> adminFeature
  const [freezeUser] = useFreezeUserMutation();
  const [activateUser] = useActivateUserMutation();
  const [updateUserRoles] = useUpdateUserRolesMutation();
  const [sendNotification] = useSendNotificationToUserMutation();
<<<<<<< HEAD
  */
=======
>>>>>>> adminFeature

  const fallbackUser = {
    basic_info: {
      id,
<<<<<<< HEAD
      full_name: "مايا المحمد", 
=======
      full_name: "مايا المحمد",
>>>>>>> adminFeature
      email: "ahmadalmo12@gmail.com",
      phone: "093883273883",
      avatar: null,
      joined_at: "12/03/2025",
      is_active: false,
      current_roles: ["VOLUNTEER", "EVALUATOR"],
      all_roles: ["VOLUNTEER", "IDEA_OWNER"]
    },
    roles: ["VOLUNTEER", "IDEA_OWNER"],
    sections: [
      {
        type: "VOLUNTEER",
        data: {
          workshops: [
<<<<<<< HEAD
            { id: 1, title: "روبوت سابك الورشة الأولى", start_date: "12/02/2024", status: "قيد المراجعة" },
            { id: 2, title: "روبوت سابك الورشة الثانية", start_date: "15/02/2024", status: "مرفوض" },
            { id: 3, title: "روبوت سابك الورشة الثالثة", start_date: "20/02/2024", status: "مقبول" },
=======
            {
              id: 1,
              title: "روبوت سابك الورشة الأولى",
              start_date: "12/02/2024",
              status: "قيد المراجعة"
            },
            {
              id: 2,
              title: "روبوت سابك الورشة الثانية",
              start_date: "15/02/2024",
              status: "مرفوض"
            },
            {
              id: 3,
              title: "روبوت سابك الورشة الثالثة",
              start_date: "20/02/2024",
              status: "مقبول"
            }
>>>>>>> adminFeature
          ]
        }
      },
      {
        type: "IDEA_OWNER",
        data: {
          ideas: [
            {
              idea_id: 22,
              title: "مشروع نظام الحواضن الذكي",
              status: "INCUBATION",
              commitment_percentage: 75.5,
              evaluations: [
<<<<<<< HEAD
                { evaluator_name: "سهيل أحمد", score: 40, note: "مشروع واعد جداً ومكتمل الأركان" },
                { evaluator_name: "رنا محمود", score: 38, note: "حضور متميز ومتابعة مستمرة" }
=======
                {
                  evaluator_name: "سهيل أحمد",
                  score: 40,
                  note: "مشروع واعد جداً ومكتمل الأركان"
                },
                {
                  evaluator_name: "رنا محمود",
                  score: 38,
                  note: "حضور متميز ومتابعة مستمرة"
                }
>>>>>>> adminFeature
              ]
            }
          ]
        }
      }
    ]
<<<<<<< HEAD
  };

  // عند الربط الفعلي نكتب: const finalUser = serverUser || fallbackUser;
  const finalUser = fallbackUser; 

  const userRolesCodes = finalUser.roles || [];

  const getSectionData = (type) => {
    const section = finalUser.sections?.find((sec) => sec.type === type);
    return section ? section.data : null;
  };

  // ---------------------------------------------------------

  const handleFreeze = async (user_id) => {
    console.log("إرسال طلب تجميد للمستخدم ذو المعرف:", user_id);
  //   try {
  //   
  //   await freezeUser(user_id).unwrap();
  //   
  //   showSuccess("تم تجميد حساب المستخدم بنجاح");
  // } catch (error) {
  //   console.error("خطأ أثناء تجميد الحساب:", error);
  //   showError("فشل تجميد الحساب، يرجى المحاولة لاحقاً");
  // }
  };

  const handleActivate = async (user_id) => {
    console.log("إرسال طلب تفعيل للمستخدم ذو المعرف:", user_id);
  //   try {
  //   await activateUser(user_id).unwrap();
  //   showSuccess("تم تفعيل حساب المستخدم بنجاح");
  // } catch (error) {
  //   console.error("خطأ أثناء تفعيل الحساب:", error);
  //   showError("فشل تفعيل الحساب");
  // }
  };

  const handleChangeRole = async (user_id, selectedRoleIds) => {
    console.log("تحديث الأدوار للمستخدم:", user_id, "الأرقام المرسلة:", selectedRoleIds);
  //   try {
  //
  //   await updateUserRoles({ 
  //     user_id: user_id, 
  //     roles: selectedRoleIds 
  //   }).unwrap();
    
  //   showSuccess("تم تحديث أدوار وصلاحيات المستخدم بنجاح");
  // } catch (error) {
  //   console.error("خطأ أثناء تحديث الأدوار:", error);
  //   showError("حدث خطأ أثناء حفظ الأدوار الجديدة");
  // }
  };

  const handleSendNotification = async (user_id, text) => {
    console.log("إرسال إشعار للمستخدم:", user_id, "النص المعطى:", text);
  //   if (!text.trim()) return; // منع إرسال نص فارغ
  
  // try {
  //   await sendNotification({ 
  //     user_id: user_id, 
  //     message: text 
  //   }).unwrap();
    
  //   showSuccess("تم إرسال الإشعار إلى المستخدم بنجاح");
  // } catch (error) {
  //   console.error("خطأ أثناء إرسال الإشعار:", error);
  //   showError("فشل إرسال الإشعار");
  // }
  };

  // ---------------------------------------------------------
  // التنقلات
  const handleMessageClick = () => navigate(`/messagespage/${finalUser.basic_info.id}`);
  const handleTaskClick = (taskId) => navigate(`/workshopinfo/${taskId}`);
  const handleViewProject = (projectId) => navigate(`/admin/projects-details/${projectId}`);
  
  return (
    <div className="bg-white-color min-h-screen pb-6" dir="rtl">
      <div className="container">

        {/* 1. قسم الهيدر والأكشنز الأساسية */}
        <UserHeaderActions
          user={{
            id: finalUser.basic_info.id,
            name: finalUser.basic_info.full_name,
            role: userRolesCodes
          }}
          is_active={finalUser.basic_info.is_active}
=======
  };

  const finalUser = serverUser || fallbackUser;

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

  const handleMessageClick = () =>
    navigate(
      `/messagespage/${finalUser.basic_info.id}`
    );

  const handleTaskClick = (taskId) =>
    navigate(`/workshopinfo/${taskId}`);

  const handleViewProject = (projectId) =>
    navigate(`/projectinfo/${projectId}`);

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
>>>>>>> adminFeature
          onFreeze={handleFreeze}
          onActivate={handleActivate}
          onChangeRole={handleChangeRole}
          onSendNotification={
            handleSendNotification
          }
        />

<<<<<<< HEAD
        {/* 2. كرت معلومات الحساب*/}
        <UserInfoCard basicInfo={finalUser.basic_info} />

        {/* 3. قسم المراسلات */}
      <UserMessagesSection 
           lastMessage={finalUser.basic_info?.last_message || "لا توجد رسائل جديدة غير مقروءة حالياً"}
          onMessageClick={handleMessageClick}
       />

        {/* قسم المتطوع VOLUNTEER */}
        {userRolesCodes.includes("VOLUNTEER") && (
          <VolunteerWorkshopsSection 
            workshops={getSectionData("VOLUNTEER")?.workshops || []}
            onTaskClick={handleTaskClick}
          />
        )}

        {/* قسم المقيم EVALUATOR */}
        {userRolesCodes.includes("EVALUATOR") && (
          <EvaluationSection
            assignments={getSectionData("EVALUATOR")?.assignments || []}
            roleType="EVALUATOR"
            onViewProject={handleViewProject}
          />
        )}

        {/* قسم المحتضن INCUBATOR */}
        {userRolesCodes.includes("INCUBATOR") && (
          <EvaluationSection
            ideas={getSectionData("INCUBATOR")?.ideas || []}
            roleType="INCUBATOR"
            onViewProject={handleViewProject}
          />
        )}

        {/* قسم صاحب الفكرة IDEA_OWNER */}
        {userRolesCodes.includes("IDEA_OWNER") && (
          <EvaluationSection
            ideas={getSectionData("IDEA_OWNER")?.ideas || []}
            roleType="IDEA_OWNER"
            onViewProject={handleViewProject}
=======
        <UserInfoCard
          basicInfo={finalUser.basic_info}
        />

        <UserMessagesSection
          lastMessage={
            finalUser.basic_info
              ?.last_message ||
            "لا توجد رسائل جديدة غير مقروءة حالياً"
          }
          onMessageClick={
            handleMessageClick
          }
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
>>>>>>> adminFeature
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