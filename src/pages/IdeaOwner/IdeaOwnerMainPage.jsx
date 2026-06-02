import React from 'react'
import NavLinkUniversal from '../../components/NavLinkUniversal';
import Button from '../../components/Button';
import LastWorkshops from '../../components/LastWorkshops';
import { useRole } from "../../hooks/useRole";

const IdeaOwnerMainPage = () => {
  const { roles } = useRole();

  

  const hideVolunteerOption =
    roles.includes("ideaOwner") && roles.includes("volunteer");

  return (
    <div className='bg-white-color min-h-screen py-8'>
      <div className="container mt-17">

        {/* صندوق تطوع */}
        {!hideVolunteerOption && (
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

        {/* الخطوات القادمة */}
        <div className='bg-white p-5 rounded mb-8'>
          <h2 className='font-bold text-2xl'>الخطوات القادمة:</h2>
          <p className='text-lg'>
            بعد إرسال طلبك، سيتم مراجعة فكرتك بشكل أولي.
            عند انتهاء فترة التقديم ستنتقل تلقائياً إلى المعسكر التدريبي الإلزامي.
            بعد انتهاء المعسكر ستُعرض فكرتك على لجنة التقييم لتحديد قبولها أو رفضها للاحتضان.
            في حال القبول، ستدخل مشروعك مرحلة الاحتضان الرسمية مع مراجعات دورية كل 3 أشهر،
            ويجب أن يظهر تقدّم واضح في كل مراجعة. عدم تحقيق أي تقدّم في المراجعة التالية قد يؤدي إلى إنهاء احتضان المشروع.
          </p>
        </div>

        <LastWorkshops />
      </div>
    </div>
  )
}

export default IdeaOwnerMainPage
