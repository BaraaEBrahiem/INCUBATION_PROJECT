import TeamCard from "./TeamCard"

const SuggestedVolunteersList = ({ volunteers }) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {volunteers.map(v => (
        <TeamCard
          key={v.id}
          name={v.name}
          email={v.email}
          primary_skill={v.primary_skill}
          buttonLabel="إضافة للفريق"
          onButtonClick={() => console.log("إضافة", v.name)}
        />
      ))}
    </div>
  )
}

export default SuggestedVolunteersList
