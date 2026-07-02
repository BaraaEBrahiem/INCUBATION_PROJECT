import React from 'react';
import Button from '../../components/Button';
import NavLinkUniversal from '../../components/NavLinkUniversal';
import { useGetAllWorkshopsQuery } from '../../api/endpoints/workshopsApi';

const WorkshopsPage = () => {
  const { data: workshopsFromApi = [], isLoading, error, refetch } = useGetAllWorkshopsQuery();
  const workshops = workshopsFromApi;

  if (isLoading) {
    return (
      <div className="bg-white-color min-h-screen bg-gray-50 p-8 flex justify-center items-start">
        <div className="w-full text-center">
          <p>جاري تحميل الورشات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white-color min-h-screen bg-gray-50 p-8 flex justify-center items-start">
        <div className="w-full max-w-6xl text-center">
          <NavLinkUniversal 
            label={
              <Button
                label={"إضافة ورشة"}
                className='bg-main-color hover:bg-main-color/90 transition-colors'
              />
            }
            to={"/AddworkshopPage"} 
          />
          <div className="w-full text-center mt-4">
            <p className="text-red-500">حدث خطأ في تحميل الورشات</p>
            <Button label="إعادة المحاولة" onClick={refetch} className="bg-main-color mt-4" />
          </div>
        </div>
      </div>
    );
  }

  const getStatusText = (status) => {
    switch (status) {
      case "ACCEPTED": return "مقبولة";
      case "REJECTED": return "مرفوضة";
      case "PENDING": return "قيد المراجعة";
      default: return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ACCEPTED": return "text-green-600";
      case "REJECTED": return "text-red-600";
      case "PENDING": return "text-yellow-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="bg-white-color min-h-screen bg-gray-50 p-4 md:p-6 w-full flex justify-center items-start">
      <div className="w-full max-w-7xl px-0 md:px-4"> 
        <h2 className="text-second-color text-2xl font-bold my-6">ورش العمل</h2>

        <div className="bg-white rounded-lg shadow-lg shadow-gray-400 border border-gray-100 p-4 md:p-6" dir='rtl'>
          <h2 className="text-right text-xl font-bold mb-6 text-black">ورشاتي</h2>

          {/* 🚀 إضافة overflow-x-auto هنا ليعمل الجدول بشكل صحيح على الموبايل دون كسر التصميم */}
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse table-auto min-w-[800px] md:min-w-0">
              <thead>
                <tr className="border-b-2 border-second-color font-bold pb-4 text-right bg-gray-50/70">
                  <th className="py-4 px-4 text-right text-sm">اسم الورشة</th>
                  <th className="py-4 px-4 text-right text-sm">البدء</th>
                  <th className="py-4 px-4 text-right text-sm">الانتهاء</th>
                  <th className="py-4 px-4 text-center text-sm">عدد الجلسات</th>
                  <th className="py-4 px-4 text-right text-sm">الأيام</th>
                  <th className="py-4 px-4 text-right text-sm">الوقت</th>
                  <th className="py-4 px-4 text-right text-sm">المجال</th>
                  <th className="py-4 px-4 text-right text-sm">الحالة</th>
                  <th className="py-4 px-4 text-center text-sm">الإجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {workshops.map((item) => (
                  <tr key={item.id} className="text-sm md:text-md hover:bg-gray-50/50 transition-colors whitespace-nowrap">
                    <td className="py-5 px-4 text-right font-medium text-black">{item.title}</td>
                    <td className="py-5 px-4 text-right text-gray-600">{item.start_date}</td>
                    <td className="py-5 px-4 text-right text-gray-600">{item.end_date}</td>
                    <td className="py-5 px-4 text-center text-gray-600">{item.sessions}</td>
                    <td className="py-5 px-4 text-right text-gray-600">{item.days}</td>
                    <td className="py-5 px-4 text-right text-gray-600">{item.time_from} - {item.time_to}</td>
                    <td className="py-5 px-4 text-right text-gray-500">{item.category}</td>
                    <td className="py-5 px-4 text-right">
                      <span className={`${getStatusColor(item.status)} font-semibold`}>
                        {getStatusText(item.status)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <NavLinkUniversal 
                        label={<Button label="عرض التفاصيل" className="bg-main-color px-3 py-1 text-xs md:text-sm rounded"/>}
                        to={`/workshopinfo/${item.id}`} 
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center mt-8 gap-3">
            <NavLinkUniversal 
              label={<Button label="إضافة ورشة تدريب" className="bg-main-color text-white w-full sm:w-auto px-6 py-2 rounded-md text-sm md:text-base" />}
              to="/AddWorkShopPage"
            />
            <NavLinkUniversal 
              label={<Button label="ورشات المعسكر" className="bg-main-color text-white w-full sm:w-auto px-6 py-2 rounded-md text-sm md:text-base" />}
              to="/CampWorkShopsPage"
            />
          </div>

        </div>
      </div>
    </div>
  );}
export default WorkshopsPage;