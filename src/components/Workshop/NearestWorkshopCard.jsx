import React from 'react';
import NavLinkUniversal from '../NavLinkUniversal';
import Button from '../Button';

const NearestWorkshopCard = ({ workshop }) => {
  
  if (!workshop) {
    return (
      <div className='bg-white p-6 rounded-lg flex justify-between items-center shadow-lg mb-8 dir-rtl text-right'>
        <div>
          <h3 className='font-bold text-2xl mb-2 text-gray-800'>أقرب ورشة عمل إليك</h3>
          <p className='text-gray-500 font-medium mt-4'>لا توجد ورشات عمل مجدولة قريباً حالياً.</p>
        </div>
        <NavLinkUniversal 
          label={<Button label={"إضافة ورشة"} className='bg-main-color hover:bg-second-color transition-all'/>}
          to={"/AddworkshopPage"} 
        />
      </div>
    );
  }

  return (
    <div className='bg-white p-6 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center shadow-lg mb-8 dir-rtl text-right gap-4'>
      <div className='space-y-2'>
        <h3 className='font-bold text-2xl mb-3 text-second-color'>أقرب ورشة عمل إليك</h3>
        
        <p className='font-medium text-gray-700'>
          <span className='font-bold text-lg pl-2 text-black'>اسم الورشة:</span>
          {workshop.title || workshop.name || "بدون عنوان"}
        </p>
        
        <p className='font-medium text-gray-700'>
          <span className='font-bold text-lg pl-2 text-black'>تبدأ بتاريخ:</span>
          {workshop.date || "غير محدد"}
        </p>
        
        <p className='font-medium text-gray-700'>
          <span className='font-bold text-lg pl-2 text-black'>الوقت:</span>
          {workshop.time || "غير محدد"}
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