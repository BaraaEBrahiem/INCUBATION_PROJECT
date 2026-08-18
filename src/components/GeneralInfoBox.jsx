import React from 'react';

const GeneralInfoBox = ({ info }) => {
  if (!info) return null;

  const skillsList = typeof info.additional_skills === 'string'
    ? info.additional_skills.split(/,|،/).map(skill => skill.trim()).filter(Boolean)
    : (Array.isArray(info.additional_skills) ? info.additional_skills : []);

  return (
    <div className="md:left-50 bg-white rounded-xl border border-main-color border-t-10 p-6 shadow-lg flex flex-col md:flex-row-reverse gap-12 mx-auto md:w-auto mt-6 md:mt-0" dir="rtl">
      <div className="flex-1 min-w-[180px]">
        <h3 className="font-bold text-lg mb-2">الخبرة العامة:</h3>
        <p className="text-gray-700 text-md mb-4">{info.specialization || "غير محدد"}</p>

        <h3 className="font-bold text-lg mb-2">عدد المشاريع في الحاضنة:</h3>
        <p className="text-gray-700 text-md mb-4">{info.projects_count} مشاريع</p>

        <h3 className="font-bold text-lg mb-2">عدد سنوات الخبرة:</h3>
        <p className="text-gray-700 text-md">{info.year_of_experience || info.years_of_experience}</p>
      </div>

      <div className="flex-1 min-w-[180px] border-r md:border-r-0 md:border-l border-gray-100 md:pl-6">
        <h3 className="font-bold text-lg mb-2">المهارات الإضافية:</h3>
        {skillsList.length === 0 ? (
          <p className="text-gray-500 text-md mb-4">لا يوجد مهارات إضافية.</p>
        ) : (
          <ul className="list-disc list-inside flex flex-col gap-1 text-gray-700 text-md mb-4">
            {skillsList.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        )}

        <h3 className="font-bold text-lg mb-2">متاح لـ:</h3>
        <p className="text-gray-700 text-md">{info.volunteer_type}</p>
      </div>
    </div>
  );
};

export default GeneralInfoBox;