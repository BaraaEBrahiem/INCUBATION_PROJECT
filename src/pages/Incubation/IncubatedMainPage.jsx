import React from 'react'
import NearestWorkshopCard from '../../components/Workshop/NearestWorkshopCard';
import LastWorkshops from '../../components/LastWorkshops';
import ConsultationRequestBtn from '../../components/ConsultationRequestBtn';
import NavLinkUniversal from '../../components/NavLinkUniversal';
import Button from '../../components/Button';
import { useRole } from "../../hooks/useRole";

const IncubatedMainPage = () => {
  const { role } = useRole();
  const isVolunteer = role === 'Volunteer';
  return (
    <div className='bg-white-color min-h-screen py-8'>
     <div className="container mt-10">
      {!isVolunteer && (
         <div className="bg-white flex justify-between items-center p-4 mb-8 rounded">
            <p className='font-bold text-2xl'>
              كن جزءا من فريق الخبراء والمقيمين لدعم<br /> الابتكار في حاضنتنا
            </p>

            <NavLinkUniversal
              label={<Button label="تطوع الآن" className="bg-main-color" />}
              to="/volunteerform"
            />
          </div>
      )}
     
            <NearestWorkshopCard />
         
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
    </div>
</div>
  )
}

export default IncubatedMainPage