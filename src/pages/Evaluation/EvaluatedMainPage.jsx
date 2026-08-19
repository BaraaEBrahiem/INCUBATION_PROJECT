import React from 'react'
import NearestWorkshopCard from '../../components/Workshop/NearestWorkshopCard';
import LastWorkshops from '../../components/LastWorkshops';
import LastExhibition from '../../components/LastExhibition';
import Button from '../../components/Button';
import NavLinkUniversal from '../../components/NavLinkUniversal';
import NextUpcomingSessionCard
from "../Evaluation/NextUpcomingSessionCard";


const EvaluatedMainPage = () => {
  return (
    <div className='bg-white-color min-h-screen p-4'>
        <div className="container mt-10">
             <div className="max-w-[50%] mb-8">
            <h1 className="text-3xl font-bold">✨ انقل فكرتك من <span className="text-second-color"> الحلم</span> إلى <span className="text-second-color">الحقيقة</span>...</h1>
            <p className='mt-4 text-xl'>تبدأ فترة الاحتضان من 15 الشهر الجاري وحتى نهايته قدم فكرتك الآن واجعلنا نحتضن نجاحك</p>
            <NavLinkUniversal to="/ideaform" label={<Button className="mt-4 text-xl bg-main-color hover:scale-105 transition" label="قدم فكرتك الآن"/>} />
         </div> 
         <NearestWorkshopCard />
         <div className='bg-white p-6 shadow-lg rounded-lg mb-8'>
                <NextUpcomingSessionCard />
            </div>
         <LastWorkshops />
         <LastExhibition />
        </div>
        
    </div>
  )
}

export default EvaluatedMainPage