import React from 'react';
import Button from '../../components/Button';
import NavLinkUniversal from '../../components/NavLinkUniversal';

import { useGetCampWorkshopsQuery } from '../../api/endpoints/workshopsApi'; 

const CampWorkshopsPage = () => {
  
 
  const { data: workshops = [], isLoading, isError } = useGetCampWorkshopsQuery();


  if (isLoading) {
    return <p className="text-center mt-20 font-bold">جاري تحميل ورش العمل...</p>;
  }

  if (isError) {
    return <p className="text-center mt-20 text-red-500 font-bold">حدث خطأ أثناء جلب بيانات ورش العمل من السيرفر.</p>;
  }

  return (
    <div className="container  min-h-screen p-10 flex justify-center items-start">
      <div className="w-full max-w-[1400px]">
        
        {/* العناوين الخارجية */}
        <div className="flex flex-col items-start gap-2 mb-8" dir="rtl">
          <h1 className="text-second-color text-4xl font-bold mb-3">ورش العمل</h1>
          <h3 className="text-black text-2xl font-bold mt-5">ورشات المعسكر</h3>
        </div>

        {/* صندوق الجدول الرئيسي */}
        <div className="bg-white rounded-lg shadow-xl shadow-gray-200 border border-gray-100 p-10" dir='rtl'>
          
          <div className="overflow-x-auto">
            {workshops.length > 0 ? (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-[3px] border-second-color text-right">
                    <th className="font-bold text-black pb-5 pl-4 pr-1 text-xl">اسم الورشة</th>
                    <th className="font-bold text-black pb-5 px-4 text-xl">التاريخ</th>
                    <th className="font-bold text-black pb-5 px-4 text-xl">موقع المعسكر</th>
                    <th className="font-bold text-black pb-5 px-4 text-xl">المهام المطلوبة</th>
                    <th className="font-bold text-black pb-5 px-4 text-xl">الوقت</th>
                    <th className="font-bold text-black pb-5 pl-1 pr-4 text-xl text-center">الاجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {workshops.map((item) => (
                    <tr key={item.id} className="text-black text-lg">
                      <td className="py-7 pl-4 pr-1 font-medium">{item.title}</td>
                      <td className="py-7 px-4 whitespace-nowrap">{item.date}</td>
                      <td className="py-7 px-4 whitespace-nowrap">{item.location}</td>
                      <td className="py-7 px-4 max-w-xs truncate">{item.tasks || <span className="text-gray-400 italic">لا توجد مهام</span>}</td>
                      
                      {/* عرض الوقت بشكل منسق يدمج البداية والنهاية */}
                      <td className="py-7 px-4 whitespace-nowrap">
                        {item.start_time && item.end_time ? (
                          <span dir="ltr" className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-700">
                            {item.start_time.substring(0, 5)} - {item.end_time.substring(0, 5)}
                          </span>
                        ) : (
                          <span className="text-gray-400 italic">غير محدد</span>
                        )}
                      </td>

                      <td className="py-7 pl-1 pr-4 text-left">
                        <NavLinkUniversal 
                          label={
                            <Button 
                              label="عرض المشاريع" 
                              className="bg-main-color text-white px-6 py-2 rounded-md hover:bg-main-color/90 transition-colors"
                            />
                          }
                          to={`/CampProjectsPage/${item.id}`} 
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500 my-5 font-medium">لا توجد ورش عمل مضافة حالياً في المعسكر.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default CampWorkshopsPage;