import { useParams, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

/*
import {
  useGetAdminUserByIdQuery,
  useFreezeUserMutation,
  useActivateUserMutation,
  useUpdateUserRolesMutation,
  useSendNotificationToUserMutation
} from "../../api/endpoints/admin/usersOptionsApi.js";
*/
// import { showError, showSuccess } from "../../Utils/toast";

import UserHeaderActions from "../../components/Admin_Dashboard/Users/UserHeaderActions";
import UserInfoCard from "../../components/Admin_Dashboard/Users/UserInfoCard";
import UserMessagesSection from "../../components/Admin_Dashboard/Users/UserMessageSection";
import VolunteerWorkshopsSection from "../../components/Admin_Dashboard/Users/VolunteerWorkshopSection";
import EvaluationSection from "../../components/Admin_Dashboard/Users/EvaluationSection";

const UserDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  /*
  const { data: serverUser, isLoading, isError } = useGetAdminUserByIdQuery(id);
  
  useEffect(() => {
    if (serverUser) {
      console.log("البيانات القادمة من الباك إند:", serverUser);
    }
  }, [serverUser]);
  */

  /*
  const [freezeUser] = useFreezeUserMutation();
  const [activateUser] = useActivateUserMutation();
  const [updateUserRoles] = useUpdateUserRolesMutation();
  const [sendNotification] = useSendNotificationToUserMutation();
  */

  const fallbackUser = {
    basic_info: {
      id,
      full_name: "مايا المحمد", 
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
            { id: 1, title: "روبوت سابك الورشة الأولى", start_date: "12/02/2024", status: "قيد المراجعة" },
            { id: 2, title: "روبوت سابك الورشة الثانية", start_date: "15/02/2024", status: "مرفوض" },
            { id: 3, title: "روبوت سابك الورشة الثالثة", start_date: "20/02/2024", status: "مقبول" },
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
                { evaluator_name: "سهيل أحمد", score: 40, note: "مشروع واعد جداً ومكتمل الأركان" },
                { evaluator_name: "رنا محمود", score: 38, note: "حضور متميز ومتابعة مستمرة" }
              ]
            }
          ]
        }
      }
    ]
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
          onFreeze={handleFreeze}
          onActivate={handleActivate}
          onChangeRole={handleChangeRole}
          onSendNotification={handleSendNotification}
        />

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
          />
        )}

      </div>
    </div>
  );
};

export default UserDetailsPage;