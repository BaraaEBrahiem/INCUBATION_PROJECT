import React from 'react'
import ActivityCard from '../components/ActivityCard';
import NavLinkUniversal from './NavLinkUniversal';

const AllActivities = ({ activities }) => {
  return (
    <div>
      <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-10'>

        {activities.map((activity) => (
          <div key={activity.id}>

            <ActivityCard
              image={activity.image}
              title={activity.title}
              description={activity.description}
              status={activity.status}
              trainer_name={activity.trainer_name}
              capacity={activity.capacity}
            >
              <NavLinkUniversal
                label="عرض التفاصيل"
                to={`/public-workshops/${activity.id}`}
                className="mt-4 w-[200px] text-center py-2 bg-main-color text-white rounded hover:bg-second-color transition"
              />
            </ActivityCard>

          </div>
        ))}

      </div>
    </div>
  )
}

export default AllActivities