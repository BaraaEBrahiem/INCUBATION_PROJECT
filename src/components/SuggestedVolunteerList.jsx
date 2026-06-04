import TeamCard from "./TeamCard"
import { useNavigate } from "react-router-dom"

const SuggestedVolunteersList = ({ volunteers }) => {

  const navigate = useNavigate();



  return (
    <div className="grid grid-cols-2 gap-6">
      {volunteers.map(v => (
        <TeamCard
          key={v.id}
          name={v.name}
          email={v.email}
          primary_skill={v.primary_skill}
          buttonLabel="عرض الملف الشخصي"
          onButtonClick={() => navigate(`/profileinfo/${v.id}`)}
        />
      ))}
    </div>


  )
}

export default SuggestedVolunteersList
