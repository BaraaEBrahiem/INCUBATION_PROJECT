import { RxCountdownTimer } from "react-icons/rx";
import { IoPersonOutline } from "react-icons/io5";

const ActivityCard = ({
    image,
    title,
    status,
    description,
    trainer_name,
    capacity,
    children
  })=> {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mb-4 w-full max-w-sm">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-2 text-sm">
          <p className="truncate ml-2">
            <RxCountdownTimer className="inline-block mx-1 text-second-color"/>
            {status}
          </p>
          <p className="flex-shrink-0">
            <IoPersonOutline className="inline-block mx-1 text-second-color"/> 
            {capacity}
          </p>
        </div>
        
        <h2 className="text-lg font-bold mb-1 truncate">{title}</h2>
        <p className="text-sm text-gray-700 mb-2 line-clamp-2">
          {description}
        </p>
        
        <hr className="border-second-color w-full my-2" />
        
        {/* المدرب في الأعلى وحده */}
        <div className="text-gray-600 text-sm mb-4">
          <p>المدرب : {trainer_name}</p>
        </div>

        {/* الزر في سطر مستقل يأخذ عرض البطاقة بالكامل */}
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
)}
export default ActivityCard