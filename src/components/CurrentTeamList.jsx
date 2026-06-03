import TeamCard from "./TeamCard"

const CurrentTeamList = ({ members }) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {members.map(m => (
        <TeamCard
          key={m.id}
          name={m.name}
          email={m.email}
          buttonLabel="مراسلة"
          onButtonClick={() => console.log("مراسلة", m.name)}
        />
      ))}
    </div>
  )
}

export default CurrentTeamList
