import React from 'react'
import Landing1 from '../../assets/images/landing-1.png';
import Landing2 from '../../assets/images/landing-2.jpg';
import logo from '../../assets/images/logo.png'
import SignupLink from '../SignupLink';

const Home = ({id}) => {
    const IctOutputs = [
        { label: "مبادرات نوعية", value: "5" },
        { label: "محتضن", value: "50" },
        { label: "محافظة", value: "3" },
        { label: "ساعة تطوعية", value: "1000" },
        { label: "شركات", value: "3" },
        { label: "يوم عمل", value: "150" },
        { label: "مشارك", value: "250" },
        { label: "ساعة تعلم", value: "163" },
    ];
  return (
    <div id={id}>
    <div className='w-full mt-20 p-0'>   
    <img src={Landing1} alt="Members" className='w-full' />
    </div>
    <div className="container mt-10">
        <h2 className=' text-main-color text-center text-[40px] font-semibold mb-5'>انقل فكرتك <span className='text-second-color'>من الحلم الى الحقيقة</span></h2>
        <div className='relative h-150 mb-20'>
         <div className='absolute md:left-15 md1:top-[20%] md:text-[50px] text-main-color text-lg leading-normal'><br/>شارك<span className='text-second-color p-4'> <br/>بخبرتك</span>  <br/>واصنع <br/> الفرق!</div>   
        <img src={Landing2} alt="Dream to real" className='w-full h-full' />
        </div>
       <SignupLink label="انطلق بمشروعك الآن" className="my-10"/>
    </div>

    {/* الحاضنة عن قرب */}
    <div className="container p-10 bg-main-color text-white rounded-lg">
        <div className="flex justify-between mt-5">
            <div className='px-4'>
            <h2 className='mt-7 pb-0 md:text-[40px] text-[25px] font-bold border-b-10 rounded-sm border-second-color'>الحاضنة عن قرب</h2>
            </div>
            <img src={logo} alt="" className="w-45 h-45 object-contain"/>
        </div>
        <p className='text-[20px] md:text-[30px] mb-15 px-4'>تأسست الحاضنة في عام 2006 بتعاون بين جامعة دمشق والجمعية العلمية السورية
           للمعلوماتية , وذلك بهدف دعم ريادة الاعمال في مجال تقانة المعلومات والاتصالات , 
تلتها بعد ذلك حاضنة في حمص تم افتتاحها في شباط 2010 وقبل نهاية 2010
          تم افتتاح حاضنة تقانة المعلومات والاتصالات في اللاذقية 
          </p>
          <p className='text-[20px] md:text-[30px] mb-15 px-4'>حاضنة تقانة المعلومات والاتصالات مؤسسة غير ربحية تابعة للجمعية العلمية السورية 
             للمعلوماتية وتهدف الى تشجيع رواد الأعمال والشباب المبدعين وتقديم الدعم اللازم 
             لهم في تأسيس مشاريعهم المبتكرة في مجال تقانة المعلومات والاتصالات حيث تصبح 
             الافكار التقنية نجاحات تجارية وفق عدة مراحل رئيسية :  </p>
             <div className='flex justify-center items-center text-[18px] md:text-[28px] mb-10 gap-6'>
                <div className='flex justify-center items-center w-[237px] h-[260px] text-center leading-normal rounded-xl border-2 border-dashed border-second-color'>طلب احتضان <br/>و<br/> معسكر تدريبي</div>
                <div className='flex justify-center items-center w-[237px] h-[260px] text-center leading-normal rounded-xl border-2 border-dashed border-second-color'>لجنة التقييم <br/> قبول <br/>او رفض</div>
                <div className='flex justify-center items-center w-[237px] h-[260px] text-center leading-normal rounded-xl border-2 border-dashed border-second-color'>معرض مع <br/>حضور <br/>مستثمرين</div>
             </div>
             <div className='flex justify-center items-center text-[32px] mb-10'>
             <span className='text-second-color text-center font-semibold'>ويتم ذلك من خلال</span>
             </div>
             <p className='md:text-[30px] text-[22px] mb-15 px-4'>توفير ادوات المعرفة اللازمة ونماذجها العملية وتقديم التدريب والتأهيل للشباب 
                       وإيجاد محفزات وخلق بيئات تدعم الشباب ليكون مبادرا مجتمعيا ومشاريع تنموية مستدامة  </p>
            <div className='bg-second-color text-white md:text-[30px] text-[22px] p-7 mb-15 rounded-xl'>
                بهدف دعم انشاء مؤسسات صغيرة ومتوسطة في مجال تقانة المعلومات والاتصالات 
                وتوفير البيئة  العلمية والفنية من خبراء ومستشارين وبنية تحتية لرواد الاعمال
                المعلوماتيين لانشاء مشاريعهم الاستثمارية ومنحها فرص نجاح عالية 
            </div>
    </div>

    {/* مخرجات الحاضنة */}
    <div className="container bg-white-color rounded-xl  p-10 mt-20 mb-20">
        <h2 className=' text-main-color text-center md:text-[40px] text-[30px] font-semibold mb-10'>مخرجات الحاضنة ومؤشرات الأداء </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {IctOutputs.map((output, index) => (
            <div key={index} className='w-[250px] flex flex-col items-center bg-white border-2 border-second-color py-4 px-8 rounded-xl mb-5 mx-auto'>
                <span className='text-[28px] font-bold'>{output.value}</span>
                <span className='text-[28px] font-bold'>{output.label}</span>
            </div>
        ))}
        </div>
        </div>
    </div>
  )
}

export default Home