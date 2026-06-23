import React from 'react'
import AllActivities from '../AllActivities';
import SignupLink from '../SignupLink';
import activity1 from '../../assets/images/activity-1.jpg';
import activity2 from '../../assets/images/activity-2.jpg';
import activity3 from '../../assets/images/activity-3.png';

const activities = [
  {
    image: activity1,
    title: "هل ترغب بأن تكون جزءاً من المستقبل التكنولوجي",
    description: "دورة تدريب مدربين روبوت سبارك",
    status: "منتهية",
    trainer_name: "محمد احمد",
    count: 25,
  },
  {
    image: activity2,
    title: "هل ترغب بأن تكون جزءاً من المستقبل التكنولوجي؟",
    description: "دورة تدريب مدربين روبوت سبارك",
    status: "لم تبدأ بعد",
    trainer_name: "محمد احمد",
    count: 25,
  },
  {
    image: activity3,
    title: "هل ترغب بأن تكون جزءاً من المستقبل التكنولوجي؟",
    description: "دورة تدريب مدربين روبوت سبارك",
    status: "بدأت حديثاً",
    trainer_name: "محمد احمد",
    count: 25,
  },
  {
    image: activity1,
    title: "هل ترغب بأن تكون جزءاً من المستقبل التكنولوجي؟",
    description: "دورة تدريب مدربين روبوت سبارك",
    status: "منتهية",
    trainer_name: "محمد احمد",
    count: 25,
  },
  
]
const Activities = ({id}) => {
  return (
    <div className='bg-white-color p-4 mb-40' id={id}>
         <div className="container">
        <h1 className='text-second-color font-semibold text-[40px] mb-10'>النشاطات</h1>
        <AllActivities activities={activities}/>
          
    </div>
    </div>
  )
}

export default Activities