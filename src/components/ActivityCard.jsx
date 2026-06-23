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
    <div className="bg-white rounded-lg shadow overflow-hidden mb-4 w-[300px]">
      <img src={image} alt={title} className="w-full h-45 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <p><RxCountdownTimer className="inline-block mx-1 text-second-color"/>{status}</p>
          <p><IoPersonOutline className="inline-block mx-1 text-second-color"/> {capacity}</p>
        </div>
        <h2 className="text-lg font-bold mb-1">{title}</h2>
        <p className="text-sm text-gray-700 mb-2">{description}</p>
        <hr className="text-second-color w-full" />
        <div className="flex justify-between text-gray-600">
          <p className="mt-4"> المدرب : {trainer_name}</p>
          {children}
        </div>
      </div>
    </div>
  )
}
export default ActivityCard