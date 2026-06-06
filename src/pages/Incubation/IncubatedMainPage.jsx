import React from 'react'
import NearestWorkshopCard from '../../components/Workshop/NearestWorkshopCard';
import LastWorkshops from '../../components/LastWorkshops';
import LastExhibition from '../../components/LastExhibition';
import ConsultationRequestBtn from '../../components/ConsultationRequestBtn';
import NavLinkUniversal from '../../components/NavLinkUniversal';
import Button from '../../components/Button';

const IncubatedMainPage = () => {
  const hasTeam = false;
  return (
    <div className='bg-white-color min-h-screen py-8'>
      
      

        <div className="container mt-10">
     
            <NearestWorkshopCard />
               {/* صندوق طلب فريق */}
        {!hasTeam && (
          <div className="bg-white flex justify-between items-center p-4 mb-8 rounded">
            <p className='font-bold text-2xl'>
              ليس لديك فريق هل ترغب بطلب متطوعين <br />لمساعدتك في تنفيذ مشروعك
            </p>

            <NavLinkUniversal
              label={<Button label="طلب فريق" className='bg-main-color' />}
              to="/TeamRequestPage"
            />
          </div>
        )}
            <div className='bg-white p-6 rounded-lg flex justify-between items-center shadow-lg mb-8'>
         <div>
            <h3 className='font-bold text-2xl mb-2'>الخطوات القادمة</h3>
            <div className="flex justify-between items-center gap-x-15">
              
            <p className='font-medium'>ستبدأ مواعيد المتابعة كل 3 أشهر.
                يمكنك طلب استشارة من المتطوعين في أي وقت.
                الالتزام بإنجاز المهام ضروري للاستمرار في الاحتضان.<br/>
                في حال عدم إحراز تقدّم في المراجعة القادمة، قد يتم إلغاء الاحتضان.</p>
             <ConsultationRequestBtn />  
              
        </div>
        </div>
        </div>
        <LastWorkshops />
        <LastExhibition/>
    </div>
</div>
  )
}

export default IncubatedMainPage