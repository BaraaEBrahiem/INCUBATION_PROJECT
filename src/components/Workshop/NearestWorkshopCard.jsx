import React from 'react';
import NavLinkUniversal from '../NavLinkUniversal';
import Button from '../Button';

import { 
  useGetNearestWorkshopQuery 
} from '../../api/endpoints/workshopInfo';

const NearestWorkshopCard = () => {

  const {
    data: workshop,
    isLoading,
    error,
  } = useGetNearestWorkshopQuery();

  // تحميل
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8 text-center">
        <p className="font-bold text-gray-500">
          جاري تحميل أقرب ورشة عمل...
        </p>
      </div>
    );
  }

  // خطأ
  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8 text-center">
        <p className="font-bold text-red-500">
          حدث خطأ أثناء جلب بيانات الورشة
        </p>
      </div>
    );
  }

  // لا يوجد ورشات
  if (!workshop || workshop.detail) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8 text-center">
        <p className="font-bold text-gray-500">
          لا يوجد ورشات قادمة حالياً
        </p>
      </div>
    );
  }

  const arabicDays = {
  Monday: "الاثنين",
  Tuesday: "الثلاثاء",
  Wednesday: "الأربعاء",
  Thursday: "الخميس",
  Friday: "الجمعة",
  Saturday: "السبت",
  Sunday: "الأحد",
};

  const formattedDate = workshop?.date
    ?.split(" ")
    ?.map((word) => arabicDays[word] || word)
    ?.join(" ");

  return (
    <div
      className='bg-white p-6 rounded-lg flex justify-between items-center shadow-lg mb-8'
      dir="rtl"
    >

      <div className="text-right">

        <h3 className='font-bold text-2xl mb-2 text-second-color'>
          أقرب ورشة عمل لديك
        </h3>

        <p className='font-medium text-lg mb-1'>
          <span className='font-bold text-xl pl-4 text-black'>
            اسم الورشة :
          </span>

          {workshop.title}
        </p>

        <p className='font-medium text-lg mb-1'>
          <span className='font-bold text-xl pl-4 text-black'>
            تبدأ بتاريخ :
          </span>

          {formattedDate}
        </p>

        <p className='font-medium text-lg'>
          <span className='font-bold text-xl pl-4 text-black'>
            الوقت :
          </span>

          {workshop.time}
        </p>

      </div>

      <NavLinkUniversal 
        label={
          <Button
            label={"إضافة ورشة"}
            className='bg-main-color hover:bg-main-color/90 transition-colors'
          />
        }
        to={"/AddworkshopPage"} 
      />

    </div>
  );
};

export default NearestWorkshopCard;