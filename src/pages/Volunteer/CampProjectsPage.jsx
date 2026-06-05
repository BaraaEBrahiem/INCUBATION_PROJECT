import React from 'react';
import { useParams } from 'react-router-dom';
import { showSuccess, showError } from '../../Utils/toast';
import { 
  useGetCampWorkshopProjectsQuery, 
  useUpdateProjectAttendanceMutation 
} from '../../api/endpoints/workshopsApi'; 

const CampProjectsPage = () => {

  const { workshopId } = useParams();

 
  const { data: projects = [], isLoading, isError } = useGetCampWorkshopProjectsQuery(workshopId);


  const [updateAttendance, { isLoading: isUpdating }] = useUpdateProjectAttendanceMutation();

  const handleStatusChange = async (ideaId, newStatus) => {

    if (isUpdating) return;

    try {

      await updateAttendance({
        sessionId: workshopId,
        idea_id: ideaId,
        status: newStatus,
      }).unwrap();

      showSuccess(
        newStatus === 'present'
          ? 'تم تسجيل حضور المشروع بنجاح'
          : 'تم تسجيل غياب المشروع'
      );

    } catch (err) {

      console.error(err);

      showError(
        err?.data?.message ||
        err?.data?.non_field_errors?.[0] ||
        'حدث خطأ أثناء تحديث حالة الحضور.'
      );
    }
  };

  if (isLoading) {
    return <p className="text-center mt-20 font-bold">جاري تحميل مشاريع المعسكر...</p>;
  }


  if (isError) {
    return <p className="text-center mt-20 text-red-500 font-bold">حدث خطأ أثناء جلب المشاريع من السيرفر.</p>;
  }

  return (
    <div className="bg-white min-h-screen p-6 md:p-12 flex justify-center items-start" dir="rtl">
      <div className="w-full max-w-[1200px] p-8 relative min-h-[600px]">
    
        <div className="text-center mt-4 mb-12">
          <h1 className="text-2xl font-bold text-black">المشاريع التي دخلت المعسكر</h1>
        </div>

        <div className="overflow-x-auto max-w-[900px] mx-auto border-gray-100 shadow-2xl rounded-2xl mt-10">
          {projects.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-black font-semibold">
                  <th className="font-semibold text-right p-5 pr-4 w-1/3">اسم المشروع</th>
                  <th className="font-semibold text-center p-5 w-1/3">صاحب الفكرة</th>
                  <th className="font-semibold text-center p-5 pl-4 w-1/3">الاجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {projects.map((project) => (
                  <tr key={project.id} className="text-black text-lg hover:bg-gray-50/40 transition-colors">
                    
                    {/* اسم المشروع */}
                    <td className="py-5 pr-4 font-medium text-right text-black">
                      {project.title}
                    </td>
                    
                    {/* صاحب الفكرة */}
                    <td className="py-5 text-center text-black">
                      {project.owner_name}
                    </td>
                    
                    {/* أزرار الحضور والغياب */}
                    <td className="py-5 pl-4">
                      <div className="flex items-center justify-center gap-4">
                        
                        {/* زر حضور الأخضر */}
                        <button
                          onClick={() => handleStatusChange(project.id, 'present')}
                          disabled={isUpdating}
                          className={`min-w-[110px] py-2 rounded-md font-medium text-base text-white transition-all shadow-sm ${
                            project.status === 'present'
                              ? 'bg-green-600 ring-2 ring-green-300 scale-95 font-bold'
                              : 'bg-[#22C55E] hover:bg-[#16A34A] disabled:bg-gray-300'
                          }`}
                        >
                          حضور
                        </button>

                        {/* زر غياب الأحمر */}
                        <button
                          onClick={() => handleStatusChange(project.id, 'absent')}
                          disabled={isUpdating}
                          className={`min-w-[110px] py-2 rounded-md font-medium text-base text-white transition-all shadow-sm ${
                            project.status === 'absent'
                              ? 'bg-red-600 ring-2 ring-red-300 scale-95 font-bold'
                              : 'bg-[#EF4444] hover:bg-[#DC2626] disabled:bg-gray-300'
                          }`}
                        >
                          غياب
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500 py-10 font-medium">لا توجد مشاريع مسجلة في هذه الورشة بعد.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default CampProjectsPage;