import React from 'react';
import Button from '../../components/Button';
import NavLinkUniversal from '../../components/NavLinkUniversal';

const CampWorkshopsPage = () => {
 
  const data = [
    { id: 1, title: "روبوت سبايك", date: "10/12/2025", location: "موقع المعسكر", tasks: "المهام المطلوبة", time: "2-5" },
    { id: 2, title: "روبوت سبايك", date: "10/12/2025", location: "موقع المعسكر", tasks: "المهام المطلوبة", time: "2-5" },
    { id: 3, title: "روبوت سبايك", date: "10/12/2025", location: "موقع المعسكر", tasks: "المهام المطلوبة", time: "2-5" },
    { id: 4, title: "روبوت سبايك", date: "10/12/2025", location: "موقع المعسكر", tasks: "المهام المطلوبة", time: "2-5" },
  ];

  const workshops = data;

  return (
    <div className="bg-gray-50 min-h-screen p-10 flex justify-center items-start">
      <div className="w-full max-w-[1400px]">
        
<div className="flex flex-col items-start gap-2 mb-8" dir="rtl">
  <h1 className="text-second-color text-4xl font-bold mb-3">ورش العمل</h1>
  <h3 className="text-black text-2xl font-bold mt-5">ورشات المعسكر</h3>
</div>
        <div className="bg-white rounded-lg shadow-xl shadow-gray-200 border border-gray-100 p-10" dir='rtl'>
          
          <div className="overflow-x-auto">
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
                    <td className="py-7 pl-4 pr-1">{item.title}</td>
                    <td className="py-7 px-4 whitespace-nowrap">{item.date}</td>
                    <td className="py-7 px-4 whitespace-nowrap">{item.location}</td>
                    <td className="py-7 px-4">{item.tasks}</td>
                    <td className="py-7 px-4 whitespace-nowrap">{item.time}</td>
                    <td className="py-7 pl-1 pr-4 text-left">
                        <NavLinkUniversal 
              label={<Button label="عرض المشاريع" className="bg-main-color text-white px-6 py-2 rounded-md"
                />
            }
            to = "/CampProjectsPage" />
           </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CampWorkshopsPage;