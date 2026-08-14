import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetIdeaNotesQuery } from "../../api/endpoints/incubationApi"; 

const IdeaRejectionNotes = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: notesList, isLoading, error } = useGetIdeaNotesQuery(id);

  // حالة جاري تحميل البيانات
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
        <div className="text-xl font-bold text-gray-600 animate-pulse">جاري تحميل ملاحظات اللجنة...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
        <div className="bg-white p-6 rounded-xl shadow-md border border-red-100 text-center">
          <p className="text-xl font-bold text-red-600 mb-2">فشل تحميل الملاحظات!</p>
          <p className="text-sm text-gray-550 mb-4">{error?.data?.detail || "تأكد من اتصال السيرفر أو صلاحية الحساب."}</p>
          <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 font-semibold text-sm">رجوع</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 md:p-8" dir="rtl">
      
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 md:p-10 relative overflow-hidden border border-gray-100">
        
        <div className="absolute top-0 inset-x-0 h-1.5 bg-main-color"></div>

        {/* نص الرفض الثابت من التصميم */}
        <div className="text-right mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
            للأسف، لم يتم قبول مشروعك لهذا الموسم.
          </h2>
        </div>

        <div className="text-right mb-10">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📋</span> ملاحظات اللجنة:
          </h3>
          
          {notesList && notesList.length > 0 ? (
            <ul className="space-y-3 md:pr-2">
          
              {notesList.map((item, index) => (
                <li 
                  key={index} 
                  className="text-gray-700 text-md md:text-lg flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-150"
                >
                  {/* النقطة الحمراء الجانبية */}
                  <span className="w-2.5 h-2.5 rounded-full bg-main-color shrink-0 mt-2"></span>
                  <span className="font-medium leading-relaxed">{item.note}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="bg-gray-50 p-4 rounded-xl text-center text-gray-500 italic">
              لا توجد ملاحظات مسجلة من قبل اللجنة لهذه الفكرة.
            </div>
          )}
        </div>

        <div className="flex justify-start pt-4 border-t border-gray-100">
          <button
            onClick={() => navigate(-1)} 
            className="px-6 py-3 rounded-xl bg-[#2D537E] hover:bg-[#234265] text-white font-bold text-md md:text-lg shadow-md transition-all duration-200 active:scale-95"
          >
            العودة الى الصفحات الرئيسية
          </button>
        </div>

      </div>
    </div>
  );
};

export default IdeaRejectionNotes;