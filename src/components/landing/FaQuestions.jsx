import React from 'react'
import { FaQuestion } from "react-icons/fa";
import FaqItem from "../FaqItem";
import SignupLink from '../SignupLink';

const FaQuestions = ({id}) => {
    const FAQS = [
        {
          question: "كيف يتم التقديم للحاضنة؟",
          answer:" نعم، تُقدّم الحاضنة استشارات فردية بحسب احتياجات المشروع، ويتم ربط الفرق مع خبراء مختصين"  
        },
        {
          question: "ما الشروط المطلوبة للتقديم؟",
          answer:" لا يشترط امتلاك مهارات برمجية. يكفي وجود فكرة ريادية واضحة، ويمكن للحاضنة توفير دعم تقني من خلال متطوعين عند الحاجة"
        },
        {
          question: "ما هو دور المعسكر التدريبي؟",
          answer:"  يهدف المعسكر إلى إعداد المتقدمين للعرض أمام اللجنة، من خلال تدريبهم على تطوير الفكرة وتحديد التقنيات المناسبة، وكيفية تقديم المشروع بالشكل المهني"
        },
        {
          question: "كيف يتم تقييم الأفكار؟",
          answer:" تُعرض المشاريع على لجنة متخصصة ويتم التقييم وفق معايير تشمل: فرصة السوق، القيمة المقدّمة، نموذج العمل، التسويق، النموذج الأولي، جاهزية الفريق و..."
        },
        {
            question:"ماذا يحصل بعد قبول المشروع؟",
            answer:" ينضم الفريق إلى برنامج احتضان يشمل مساحة عمل وخدمات لوجستية واستشارات تقنية وقانونية وتسويقية، إضافة إلى متابعة وتقييم كل ثلاثة أشهر"
        },
        {
            question:"هل تمتلك الحاضنة أي حقوق على الأكواد؟",
            answer: " لا. تبقى ملكية المشروع وكامل مكوّناته لصاحب الفكرة، وتحتفظ الحاضنة فقط بالبيانات الأساسية لأغراض التوثيق."
        },
        {
            question:"هل يمكن للحاضنة توفير مستشارين؟",
            answer:" نعم، تُقدّم الحاضنة استشارات فردية بحسب احتياجات المشروع، ويتم ربط الفرق مع خبراء مختصين"
        },
        {
            question:"ما دور الحاضنة في حال اهتمام مستثمر بأحد المشاريع؟",
            answer:" تقدّم الحاضنة الدعم القانوني والنصيحة لضمان حماية صاحب الفكرة، دون أن تكون طرفًا مباشرًا في الاستثمار"
        }
        
    ]
 return (
    <div className=' w-full max-w-full overflow-x-hidden py-10' id={id}>
          <div className='px-4 md:container md:mx-auto'>
            
     <h2 className=' text-main-color text-center text-[28px] font-semibold mb-10'>الأسئلة الشائعة<FaQuestion className='inline mr-4 ' /></h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {
        FAQS.map((faq, index) => (
              <div key={index} className='w-full  text-[5px] md:text-[10px]'>
                <FaqItem question={faq.question} answer={faq.answer}/>
              </div>
        )
        )
        }
      </div>
      <div className="flex justify-center items-center px-10">
        <SignupLink label="ابدأ بقفزة" className="mt-10"/>
      </div>
    </div>
    </div>
  )}

export default FaQuestions