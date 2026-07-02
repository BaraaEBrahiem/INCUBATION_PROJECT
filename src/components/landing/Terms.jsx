import React from 'react'
import { TbHandRingFinger } from "react-icons/tb";
import { FaRegHandPeace } from "react-icons/fa6";
import { TbHandTwoFingers } from "react-icons/tb";
import { TbHandThreeFingers } from "react-icons/tb";
import { TbHandStop } from "react-icons/tb";
import SignupLink from '../SignupLink';
const Terms = ({id}) => {
    const Conditions = [
        {
            icon:<TbHandRingFinger className='inline w-15 h-15' />,
            description:"استخدام المنصّة: يلتزم المستخدم باستخدام المنصّة لأغراض التقديم والمتابعة فقط، ويُحظر أي استخدام يهدف إلى الإساءة أو جمع المعلومات أو استغلال الخدمات بطرق غير مشروعة."
        },
        {
            icon:<FaRegHandPeace className='inline w-15 h-15' />,
            description:"دقّة المحتوى المرفوع: يتحمّل المستخدم المسؤولية الكاملة عن صحة الملفات والوثائق المرفوعة ويمنع رفع أي محتوى غير موثوق أو منسوخ أو مخالف للقوانين."
        },
        {
            icon:<TbHandTwoFingers className='inline w-15 h-15' />,
            description:"الموقع الجغرافي: نظراً لتمركز الحاضنة في محافظة حمص واقتصار خدماتها على نطاقها الجغرافي، يشترط أن يكون المتقدّم من المقيمين داخل محافظة حمص."
        },
        {
            icon:<TbHandThreeFingers className='inline w-15 h-15' />,
            description:"المتابعة والالتزام: يوافق المستخدم على الالتزام بالمواعيد، والمتطلبات المرحلية، وأي جلسات أو تقييمات تطلبها الحاضنة لضمان استمرارية الاحتضان."
        },
        {
            icon:<TbHandStop className='inline w-15 h-15' />,
            description:"صلاحية التسجيل: يقرّ المستخدم بأنّ المعلومات التي يقدّمها تعبّر عنه شخصيًا أو عن فريقه، وأنه مخوّل رسميًا لتمثيل الفكرة داخل المنصّة."
        },
    ]
  return (
    <div className='container mt-20'>
    <div className='bg-white-color' id={id}>
        <div className='text-main-color mb-5'>
            <h2 className='md:text-[40px] text-[30px] text-center font-bold'>الشروط والأحكام</h2>
        </div>
        <div className='flex flex-col gap-8 my-5'>
        {
            Conditions.map((condition,index) => (
                <div key={index} className='flex gap-4 px-4'>
                    <div className='md:text-[28px] text-[15px] text-second-color'>{condition.icon}</div>
                    <div className='md:text-[28px] text-[18px] font-semibold'>{condition.description}</div>

                </div>
            ))
        }
    </div>
    </div>
      <SignupLink label="أنشئ حسابك و ابدأ رحلتك معنا الآن" className="my-10"/>
    </div>

  )
}

export default Terms