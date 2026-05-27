import React from 'react';
import NavLinkUniversal from '../NavLinkUniversal';
import Button from '../Button';
// import { useGetNearestWorkshopQuery } from '../../api/endpoints/workshopInfo.js';

const NearestWorkshopCard = () => {

  // const { data: liveWorkshop, isLoading, error } = useGetNearestWorkshopQuery();
  
  const mockWorkshop = {
    title: "روبوت سبايك",
    date: "15/4/2026",
    time: "2-5",
  };

  // const workshop = liveWorkshop || mockWorkshop;
  const workshop = mockWorkshop;

  // if (isLoading) return <div className="p-6 text-center font-bold text-gray-500">جاري تحميل أقرب ورشة عمل...</div>;
  // if (error) return <div className="p-6 text-center text-red-500 font-bold">حدث خطأ أثناء جلب تفاصيل الورشة.</div>;

  return (
    <div className='bg-white p-6 rounded-lg flex justify-between items-center shadow-lg mb-8' dir="rtl">
      <div className="text-right">
        <h3 className='font-bold text-2xl mb-2 text-second-color'>أقرب ورشة عمل إليك</h3>
        <p className='font-medium text-lg mb-1'>
          <span className='font-bold text-xl pl-4 text-black'>اسم الورشة :</span>
          {workshop?.title}
        </p>
        <p className='font-medium text-lg mb-1'>
          <span className='font-bold text-xl pl-4 text-black'>تبدأ بتاريخ :</span>
          {workshop?.date}
        </p>
        <p className='font-medium text-lg'>
          <span className='font-bold text-xl pl-4 text-black'>الوقت :</span>
          {workshop?.time}
        </p>
      </div>

      <NavLinkUniversal 
        label={<Button label={"إضافة ورشة"} className='bg-main-color hover:bg-main-color/90 transition-colors'/>}
        to={"/AddworkshopPage"} 
      />
    </div>
  );
};

export default NearestWorkshopCard;