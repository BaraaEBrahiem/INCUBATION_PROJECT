 import React from 'react';
import Button from '../../components/Button';
import NavLinkUniversal from '../../components/NavLinkUniversal';
// import { useGetAllWorkshopsQuery } from '../../api/endpoints/workshopsApi';

const WorkshopsPage = () => {
  
  //  بعد الربط هذا السطر بدل البيانات الثابتة
  // const { data: workshopsFromApi = [], isLoading, error, refetch } = useGetAllWorkshopsQuery();
  
  // بيانات ثابتة حالياً
  const data = [
    { id: 1, title: "روبوت سبايك", start_date: "10/12/2025", end_date: "20/12/2025", sessions: "4 جلسات", days: "سبت وثلاثاء", time_from: "02:00:00",time_to:"05:00:00", category: "اداري", status: "مقبولة" },
    { id: 2, title: "روبوت سبايك", start_date: "10/12/2025", end_date: "20/12/2025", sessions: "4 جلسات", days: "سبت وثلاثاء", time_from: "02:00:00",time_to:"05:00:00", category: "اداري", status: "مرفوضة" },
    { id: 3, title: "روبوت سبايك", start_date: "10/12/2025", end_date: "20/12/2025", sessions: "4 جلسات", days: "سبت وثلاثاء", time_from: "02:00:00",time_to:"05:00:00", category: "اداري", status: "قيد المراجعة" },
    { id: 4, title: "روبوت سبايك", start_date: "10/12/2025", end_date: "20/12/2025", sessions: "4 جلسات", days: "سبت وثلاثاء", time_from: "02:00:00",time_to:"05:00:00", category: "اداري", status: "قيد المراجعة" },
  ];

  // const workshops = workshopsFromApi.length > 0 ? workshopsFromApi : data;
  const workshops = data;

  // if (isLoading) {
  //   return (
  //     <div className="bg-white-color min-h-screen bg-gray-50 p-8 flex justify-center items-start">
  //       <div className="w-full max-w-6xl text-center">
  //         <p>جاري تحميل الورشات...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="bg-white-color min-h-screen bg-gray-50 p-8 flex justify-center items-start">
  //       <div className="w-full max-w-6xl text-center">
  //         <p className="text-red-500">حدث خطأ في تحميل الورشات</p>
  //         <Button label="إعادة المحاولة" onClick={refetch} className="bg-main-color mt-4" />
  //       </div>
  //     </div>
  //   );
  // }

  // دالة لتحديد لون الحالة
  const getStatusColor = (status) => {
    switch (status) {
      case "مقبولة":
        return "text-green-600";
      case "مرفوضة":
        return "text-red-600";
      case "قيد المراجعة":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-white-color min-h-screen bg-gray-50 p-8 flex justify-center items-start">
      <div className="w-full max-w-6xl">
        <h2 className="text-second-color text-2xl font-bold m-6">ورش العمل</h2>

        <div className="bg-white rounded-lg shadow-lg shadow-gray-400 border border-gray-100 p-8" dir='rtl'>
          
          <h2 className="text-right text-xl font-bold mb-6 text-black">ورشاتي</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-second-color font-bold pb-4 px-2 whitespace-nowrap">
                  <th>اسم الورشة</th>
                  <th>البدء</th>
                  <th>الانتهاء</th>
                  <th>عدد الجلسات</th>
                  <th>الايام</th>
                  <th>الوقت</th>
                  <th>المجال</th>
                  <th>الحالة</th>
                  <th>الاجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {workshops.map((item) => (
                  <tr key={item.id} className="text-md">
                    <td className="py-6 px-2">{item.title}</td>
                    <td className="py-6 px-2">{item.start_date}</td>
                    <td className="py-6 px-2">{item.end_date}</td>
                    <td className="py-6 px-2">{item.sessions}</td>
                    <td className="py-6 px-2 leading-relaxed">{item.days}</td>
                    <td className="py-6 px-2">{item.time_from} - {item.time_to}</td>
                    <td className="py-6 px-2">{item.category}</td>
                    <td className="py-6 px-2">
                      <span className={getStatusColor(item.status)}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <NavLinkUniversal 
                        label={<Button label="عرض التفاصيل" className="bg-main-color"/>}
                        to={`/workshopinfo/${item.id}`} 
                      />
                    
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-start mt-6 gap-3">
            <NavLinkUniversal 
              label={<Button label="اضافة ورشة تدريب" className="bg-main-color text-white px-6 py-2 rounded-md" />}
               يمكنك تعديل المسار حسب مشروعك
           to = "/AddWorkShopPage"
           />
            <NavLinkUniversal 
            
          label={<Button label="ورشات المعسكر" className="bg-main-color text-white px-6 py-2 rounded-md" />}
          to= "/CampWorkShopsPage"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default WorkshopsPage;