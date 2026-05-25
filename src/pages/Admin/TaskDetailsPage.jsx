import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TaskDetailsInfo from "../../components/Admin_Dashboard/Users/TaskDetailsInfo";
import { showSuccess, showError } from "../../Utils/toast";
import {
  useGetTaskByIdQuery,
} from "../../api/endpoints/admin/adminTasksApi";
import {
  useApproveGeneralMutation,
  useRejectGeneralMutation,
} from "../../api/endpoints/approvalApi";

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const { data: task, isLoading: isTaskLoading, refetch } = useGetTaskByIdQuery(taskId);

  const fallbackTask = {
    id: taskId,
    description:
      "دورة تدريب مدربين روبوت سبايك Spike من ITOT. هل ترغب في أن تكون جزءاً من المستقبل التكنولوجي؟ هل تحلم أن تصبح مدرباً محترفاً في مجال الروبوتات؟",
    date: "السبت 8/11/2025",
    days: "السبت - الثلاثاء",
    time: "من الساعة 2 - 5",
    suitableFor: [
      "المعلمون الراغبون بتعليم التكنولوجيا للطلاب",
      "المعلمون الذين يرغبون في استخدام الروبوتات في التعليم",
      "الأشخاص الذين يسعون لإضافة مهارات جديدة إلى سيرتهم الذاتية",
    ],
    participants: [
      { name: "فهد الجاسم", email: "fahad@gmail.com" },
      { name: "فهد الجاسم", email: "fahad@gmail.com" },
      { name: "فهد الجاسم", email: "fahad@gmail.com" },
    ],
    status: "pending",
  };

  const finalTask = task || fallbackTask;
  const [status, setStatus] = useState(finalTask.status);

  
  useEffect(() => {
    if (task?.status) {
      //eslint-disable-next-line
      setStatus(task.status);
    }
  }, [task]);

  const [approve, { isLoading: isApproving }] = useApproveGeneralMutation();
  const [reject, { isLoading: isRejecting }] = useRejectGeneralMutation();
  const isActionLoading = isApproving || isRejecting;

  const handleApprove = async () => {
    if (isActionLoading) return;
    try {
     
      await approve({ type: "tasks", id: taskId }).unwrap();
      setStatus("approved");
      showSuccess("تمت الموافقة على المهمة بنجاح");
      refetch();
    } catch (err) {
      console.error(err);
      showError(err?.data?.message || "حدث خطأ أثناء محاولة الموافقة");
    }
  };

  const handleReject = async () => {
    if (isActionLoading) return;
    try {
      // تستطيع تمرير سبب رفض ثابت أو تهيئة نافذة منبثقة لاحقاً لتمرير الـ reason
      await reject({ type: "tasks", id: taskId, reason: "لم يستوفِ الشروط" }).unwrap();
      setStatus("rejected");
      showSuccess("تم رفض المهمة");
      refetch();
    } catch (err) {
      console.error(err);
      showError(err?.data?.message || "حدث خطأ أثناء محاولة الرفض");
    }
  };

  if (isTaskLoading) return <p className="text-center mt-10">جاري تحميل تفاصيل المهمة...</p>;

  return (
    <div className="bg-white-color min-h-screen pt-20">
      <div className="container mx-auto px-4">

        <TaskDetailsInfo
          task={{ ...finalTask, status }} 
          onApprove={handleApprove}
          onReject={handleReject}
          disabled={isActionLoading} 
        />

        {/* جدول المشاركين يظهر فقط بعد التأكد من الموافقة */}
        {status === "approved" && (
          <div className="bg-main-color text-white p-6 mt-6 rounded-md shadow-md animate-fade-in">
            <h3 className="font-bold text-lg mb-3 pb-2 border-b border-white/20">
              المشاركين في الورشة ({finalTask.participants?.length || 0}):
            </h3>

            <div className="space-y-2">
              {finalTask.participants && finalTask.participants.length > 0 ? (
                finalTask.participants.map((p, i) => (
                  <div key={i} className="flex justify-between items-center bg-white/10 p-2 rounded">
                    <span className="font-medium">{p.name}</span>
                    <span className="text-sm opacity-90">{p.email}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-white/80 text-center py-2">لا يوجد مشاركين مسجلين حتى الآن.</p>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TaskDetailsPage;