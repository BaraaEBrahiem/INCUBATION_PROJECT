import React from 'react'
import { GoGoal } from "react-icons/go";
const Goals = ({id}) => {
  return (
    <div className='container bg-white-color rounded-xl p-10 mt-20 mb-20' id={id}>
        <div className='text-main-color mb-5'>
            <h2 className='md:text-[40px] text-[30px] text-center font-bold'>أهداف حاضنة  ICT INCUBATOR<GoGoal className='inline mr-3' /> </h2>
            
        </div>
        <div className="goal relative flex flex-col justify-between items-center gap-15 font-[500] md:text-[28px] text-[23px]">
            <p className='relative bg-white rounded-xl px-8 mx-15'>تمكين المشاريع الناشئة في مجال تكنولوجيا المعلومات من الانطلاق بثقة عبر دعم عملي وتقني موجّه.</p>
            <p className='relative bg-white rounded-xl px-8 mx-15'>تعزيز روح الريادة والابتكار لدى الشباب من خلال برامج تدريبية ترفع مهاراتهم وتجهّزهم لسوق العمل</p>
            <p className='relative bg-white rounded-xl px-8 mx-15'>توفير بيئة احترافية متكاملة تضم خبراء ومستشارين لمرافقة رواد الأعمال في كل مرحلة من رحلة مشروعهم</p>
            <p className='relative bg-white rounded-xl px-8 mx-15'>صناعة حلول تقنية مستدامة عبر تحويل الأفكار المبتكرة إلى مشاريع استثمارية قادرة على النمو والتأثير</p>
        </div>
    </div>
  )
}

export default Goals