 import { useParams, useNavigate } from "react-router-dom";
import {
  useGetAdminUserByIdQuery,
  useUpdateUserStatusMutation,
  useUpdateUserRoleMutation,
} from "../../api/endpoints/admin/adminUsersApi";

import { useSendNotificationMutation } from "../../api/endpoints/admin/adminDashboardApi";

import UserHeaderActions from "../../components/Admin_Dashboard/Users/UserHeaderActions";
import UserInfoCard from "../../components/Admin_Dashboard/Users/UserInfoCard";
import UserMessagesSection from "../../components/Admin_Dashboard/Users/UserMessageSection";
import VolunteerWorkshopsSection from "../../components/Admin_Dashboard/Users/VolunteerWorkshopSection";
import EvaluationSection from "../../components/Admin_Dashboard/Users/EvaluationSection";

const UserDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ---------------------------------------------------------
  //   1) جلب بيانات المستخدم
  const { data: user, isLoading, refetch } = useGetAdminUserByIdQuery(id);

  // تم تعديل الـ fallback لتصبح الأدوار مصفوفة افتراضياً
  const fallbackUser = {
    id,
    name: "مايا المحمد",
    role: ["صاحب فكرة","متطوع"], // تحويلها لمصفوفة لتتوافق مع التحديث الجديد
    email: "ahmadalmo12@gmail.com",
    phone: "093883273883",
    joinedAt: "12/3/2025",
    rolesHistory: ["متطوع", "مختص"],
    location: "حمص",
    lastActive: "الأمس",
    status: "نشط",
    lastMessage: "هنا يكتب رسالة المستخدم والتفاصيل تكتب هنا",
    workshops: [
      { id: 1, taskName: "روبوت سابك", type: "ورشة عمل", assignedAt: "12/2/2024", status: "قيد المراجعة" },
      { id: 2, taskName: "روبوت سابك", type: "ورشة عمل", assignedAt: "12/2/2024", status: "مرفوضة" },
      { id: 3, taskName: "روبوت سابك", type: "ورشة عمل", assignedAt: "12/2/2024", status: "مقبولة" },
    ],
    evaluations: [
      { evaluator: "سهيل أحمد", score: 40, note: "جيد جداً" },
      { evaluator: "سهيل أحمد", score: 40, note: "جيد جداً" },
      { evaluator: "سهيل أحمد", score: 40, note: "جيد جداً" },
    ],
    notes: ["تكتب هنا الملاحظة الأولى", "تكتب هنا الملاحظة الأولى", "تكتب هنا الملاحظة الأولى"],
    attendanceRate: 75,
    project: { id: 22 },
  };

  const finalUser = user || fallbackUser;

  // التعديل الأساسي: التأكد من تحويل الأدوار إلى مصفوفة للتعامل معها بمرونة
  const userRoles = Array.isArray(finalUser.role) ? finalUser.role : [finalUser.role];
  // ---------------------------------------------------------

  // ---------------------------------------------------------
  //   2) Mutations
  const [updateStatus] = useUpdateUserStatusMutation();
  const [updateRole] = useUpdateUserRoleMutation();
  const [sendNotification] = useSendNotificationMutation();
  // ---------------------------------------------------------

  // ---------------------------------------------------------
  //   3) Handlers (تمريرها للهيدر)
  const handleFreeze = async (userId) => {
    await updateStatus({ id: userId, status: "مجمد" });
    refetch();
  };

  const handleActivate = async (userId) => {
    await updateStatus({ id: userId, status: "نشط" });
    refetch();
  };

  const handleChangeRole = async (userId, newRoles) => {
    // نرسل الأدوار الجديدة (سواء كانت مصفوفة أو مجهزة للباكيند)
    await updateRole({ id: userId, role: newRoles });
    refetch();
  };

  const handleSendNotification = async (userId, text) => {
    await sendNotification({
      target: "user",
      userId,
      message: text,
    });
  };
  // ---------------------------------------------------------

  // ---------------------------------------------------------
  //   4) Handlers للأقسام الأخرى
  const handleMessageClick = () => {
    navigate(`/messagespage/${finalUser.id}`);
  };

  const handleTaskClick = (task) => {
    navigate(`/admin/tasks/${task.id}`);
  };

  const handleEvaluationClick = (evaluation) => {
    console.log("تفاصيل التقييم:", evaluation);
  };

  const handleViewProject = () => {
    navigate(`/projectinfo/${finalUser.project.id}`);
  };
  // ---------------------------------------------------------
 if (isLoading) return <p className="text-center mt-10">جاري التحميل...</p>;

  return (
    <div className="bg-white-color min-h-screen pb-6">
      <div className="container">

        {/* الهيدر */}
        <UserHeaderActions
          user={finalUser}
          onFreeze={handleFreeze}
          onActivate={handleActivate}
          onChangeRole={handleChangeRole}
          onSendNotification={handleSendNotification}
        />

        {/* معلومات الحساب */}
        <UserInfoCard user={finalUser} />

        {/* المراسلات */}
        <UserMessagesSection 
          user={finalUser}
          onMessageClick={handleMessageClick}
        />

        {/* التعديل هنا: فحص الأدوار باستخدام .includes لدعم تعدد الأدوار وعرض الأقسام معاً */}
        
    
{/* إضافة قسم المقيم هنا 🚀 */}
{userRoles.includes("متطوع") && (
  <VolunteerWorkshopsSection 
    workshops={finalUser.workshops}
    onTaskClick={handleTaskClick}
  />
)}

{/* حماية شرط المقيم: نتأكد من وجود مشروع أولاً قبل تمريره، أو نمرر كائن فارغ كـ fallback للـ project */}
{userRoles.includes("مقيم") && (
  <EvaluationSection
    evaluations={finalUser.evaluations || []}
    notes={finalUser.notes || []}
    project={finalUser.project || { id: null }} // حماية الـ id هنا 
    onEvaluationClick={handleEvaluationClick}
    onViewProject={handleViewProject}
  />
)}

{userRoles.includes("محتضن") && (
  <EvaluationSection
    evaluations={finalUser.evaluations || []}
    notes={finalUser.notes || []}
    project={finalUser.project || { id: null }}
    onEvaluationClick={handleEvaluationClick}
    onViewProject={handleViewProject}
  />
)}

{userRoles.includes("صاحب فكرة") && (
  <EvaluationSection
    evaluations={finalUser.evaluations || []}
    attendanceRate={finalUser.attendanceRate}
    project={finalUser.project || { id: null }}
    onEvaluationClick={handleEvaluationClick}
    onViewProject={handleViewProject}
  />
)}
      </div>
    </div>
  );
};

export default UserDetailsPage;