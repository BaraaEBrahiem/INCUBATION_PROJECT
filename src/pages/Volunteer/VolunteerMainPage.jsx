import React from 'react';
import NavLinkUniversal from '../../components/NavLinkUniversal';
import Button from '../../components/Button';
import LastExhibition from '../../components/LastExhibition';
import LastWorkshops from '../../components/LastWorkshops';
import NearestWorkshopCard from '../../components/Workshop/NearestWorkshopCard';
import NextUpcomingSessionCard
from "../Evaluation/NextUpcomingSessionCard";

// import { useGetNearestWorkshopQuery } from '../../api/endpoints/workshopsApi';

const VolunteerMainPage = () => {
  

  // const { data: nearestWorkshop, isLoading: isWorkshopLoading } = useGetNearestWorkshopQuery();

  const mockWorkshopData = {
    title: "روبوت سبايك المطور",
    date: "15/4/2026",
    time: "2-5",
  };

  // دمج البيانات الحقيقية أو الاحتياطية
  const activeWorkshop = /* nearestWorkshop || */ mockWorkshopData;

  return (
    <div className='bg-white-color min-h-screen py-8 dir-rtl text-right'>
      <div className="container mt-0 mx-auto px-4">
        
        {/* قسم البانر التعريفي */}
        <div className="max-w-[100%] md:max-w-[50%] mb-8">
          <h1 className="text-3xl font-bold leading-relaxed">
           ✨ انقل فكرتك من <span className="text-second-color">الحلم</span> إلى <span className="text-second-color">الحقيقة</span>...
          </h1>
          <p className='mt-4 text-xl text-gray-600 leading-relaxed'>
            تبدأ فترة الاحتضان من 15 الشهر الجاري وحتى نهايته قدم فكرتك الآن واجعلنا نحتضن نجاحك
          </p>
          <NavLinkUniversal 
            to="/ideaform" 
            label={<Button className="mt-4 text-xl bg-main-color hover:scale-105 transition duration-300" label="قدم فكرتك الآن"/>} 
          />
        </div>  

        {/* {isWorkshopLoading ? (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8 text-center text-gray-500">جاري تحميل أقرب ورشة...</div>
        ) : ( */}
          <NearestWorkshopCard workshop={activeWorkshop} />
          <NextUpcomingSessionCard />
        {/* )} */}

        <LastWorkshops />
        <LastExhibition/>

      </div>
    </div>
  );
};

export default VolunteerMainPage;