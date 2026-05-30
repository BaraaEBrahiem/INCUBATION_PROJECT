import React from 'react'
import ActivityCard from '../components/ActivityCard';
import NavLinkUniversal from './NavLinkUniversal';

const AllActivities = ({ activities }) => {
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>

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
                to={`/workshops/${activity.id}`}
              />
            </ActivityCard>

          </div>
        ))}

      </div>
    </div>
  )
}

export default AllActivities