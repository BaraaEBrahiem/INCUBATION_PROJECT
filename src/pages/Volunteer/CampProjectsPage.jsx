 import React, { useState } from 'react';

const CampProjectsPage = () => {
  const [projects, setProjects] = useState([
    { id: 1, title: "منصة تعليمية", owner: "احمد الاحمد", status: null },
    { id: 2, title: "منصة تعليمية", owner: "احمد الاحمد", status: null },
    { id: 3, title: "منصة تعليمية", owner: "احمد الاحمد", status: null },
    { id: 4, title: "منصة تعليمية", owner: "احمد الاحمد", status: null },
  ]);

  // دالة لتحديث حالة الحضور والغياب عند الضغط على الأزرار
  const handleStatusChange = (id, newStatus) => {
    setProjects(prev =>
      prev.map(item => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  return (
    <div className="bg-white min-h-screen p-6 md:p-12 flex justify-center items-start" dir="rtl">
      <div className="w-full max-w-[1200px]  p-8 relative min-h-[600px]">
    
        <div className="text-center mt-4 mb-12">
          <h1 className="text-2xl font-bold text-black">المشاريع التي دخلت المعسكر</h1>
        </div>

        <div className="overflow-x-auto max-w-[900px] mx-auto border-gray-100 shadow-2xl rounded-2xl mt-30">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-black font-semibold">
                <th className="font-semibold text-right p-5 pr-4 w-1/2">اسم المشروع</th>
                <th className="font-semibold text-center p-5 w-1/2">صاحب الفكرة</th>
                <th className="font-semibold text-center p-5 pl-4 w-1/2">الاجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects.map((project) => (
                <tr key={project.id} className="text-black text-lg hover:bg-gray-50/40 transition-colors">
                  <td className="py-5 pr-4 font-medium text-right text-black">
                    {project.title}
                  </td>
                  
                  {/* صاحب الفكرة */}
                  <td className="py-5 text-center text-black">
                    {project.owner}
                  </td>
                  
                  {/* أزرار الحضور والغياب */}
                  <td className="py-5 pl-4">
                    <div className="flex items-center justify-center gap-4">
                      
                      {/* زر حضور الأخضر */}
                      <button
                        onClick={() => handleStatusChange(project.id, 'present')}
                        className={`min-w-[110px] py-2 rounded-md font-medium text-base text-white transition-all shadow-sm ${
                          project.status === 'present'
                            ? 'bg-green-color ring-2 ring-green-300 scale-95'
                            : 'bg-[#22C55E] hover:bg-[#16A34A]'
                        }`}
                      >
                        حضور
                      </button>

                      {/* زر غياب الأحمر */}
                      <button
                        onClick={() => handleStatusChange(project.id, 'absent')}
                        className={`min-w-[110px] py-2 rounded-md font-medium text-base text-white transition-all shadow-sm ${
                         project.status === 'absent'
                            ? 'bg-red-color ring-2 ring-red-300 scale-95'
                            : 'bg-[#EF4444] hover:bg-[#DC2626]'
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
        </div>

      </div>
    </div>
  );
};

export default CampProjectsPage;