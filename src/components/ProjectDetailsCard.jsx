import React from "react";
import useConversationLauncher
from "../features/messaging/hooks/useConversationLauncher";

const ProjectDetailsCard = ({ project }) => {

  const {
    launchConversation,
    isLoading,
} = useConversationLauncher();

  const {
    title,
    sector,
    team_members = [],
    project_goal,
    project_services = [],
    owner_email,
    owner_id,
    image, // نحتفظ بالصورة لو موجودة
  } = project || {};

  const contactEmail = owner_email;

  return (
    <div className="container mx-auto max-w-5xl bg-white p-6 md:p-8 text-right" dir="rtl">
      <h2 className="text-2xl text-second-color font-bold mb-8 border-b border-gray-100 pb-3">
         تفاصيل المشروع 
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-start">
        {/* النصوص والمعلومات */}
        <div className="space-y-5 text-gray-700 leading-relaxed">
          <p className="text-lg">
            <span className="font-bold text-2xl">اسم المشروع:</span> {title || "غير محدد"}
          </p>
          
          <p>
            <span className="font-bold text-2xl">القطاع / الفئة:</span> {sector || "غير محدد"}
          </p>

          <div>
            <p className="font-bold mb-1 text-2xl">أعضاء الفريق المساهمين:</p>
            {team_members.length > 0 ? (
              <ul className="list-disc pr-6 space-y-1 text-gray-600">
                {team_members.map((member, index) => (
                  <li key={index} className="text-xl">{member}</li>
                ))}
              </ul>
            ) : (
              <p className="text-xl text-gray-400 pr-2">لم يتم إدراج أعضاء فريق لهذا المشروع.</p>
            )}
          </div>
          
          {project_goal && (
            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
              <span className="font-bold block mb-1 text-2xl">الرؤية والهدف الأساسي:</span> 
              <p className="text-xl text-gray-600 leading-relaxed">{project_goal}</p>
            </div>
          )}

          <div>
            <p className="font-bold mb-1 text-2xl">المخرجات والخدمات التي يقدمها:</p>
            {project_services.length > 0 ? (
              <ul className="list-decimal pr-6 space-y-1 text-gray-600">
                {project_services.map((service, index) => (
                  <li key={index} className="text-xl">{service}</li>
                ))}
              </ul>
            ) : (
              <p className="text-xl text-gray-400 pr-2">لم يتم تحديد خدمات معينة.</p>
            )}
          </div>
        </div>
        
        {/* صورة المشروع */}
        <div className="w-full">
          {image ? (
            <img
  src={`http://127.0.0.1:8000${image}`}
  alt={title}
  className="w-full h-auto max-h-[350px] object-cover rounded-2xl shadow-sm border border-gray-100"
/>
          ) : (
            <div className="w-full h-[280px] bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400">
              <span className="text-4xl mb-2">🖼️</span>
              <p className="text-xs font-medium">لم يتم رفع صورة توضيحية للمشروع</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        {contactEmail ? (
          <button
              onClick={() => launchConversation(owner_id)}
              disabled={isLoading}
              className="bg-main-color text-white px-6 py-2.5 rounded-xl font-bold text-xl shadow-sm hover:opacity-95 transition-all text-center disabled:opacity-60"
          >
              {isLoading ? "جاري الفتح..." : "تواصل معنا "}
          </button>
        ) : (
          <button 
            disabled
            className="bg-gray-300 px-6 py-2.5 rounded-xl font-bold text-xl cursor-not-allowed"
          >
            بيانات التواصل غير متاحة
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailsCard;