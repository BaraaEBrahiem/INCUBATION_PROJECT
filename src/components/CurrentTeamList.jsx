import TeamCard from "./TeamCard"

const CurrentTeamList = ({ members }) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {members.map(m => (
        <TeamCard
          key={m.id}
          name={m.name}
          email={m.email}
          // التعديل 1: أعضاء الفريق الحالي ليس لديهم role في الـ API القادم، لذلك نلغيها أو نتركها
          buttonLabel="مراسلة"
          onButtonClick={() => console.log("مراسلة", m.name)}
          // التعديل 2: تمرير حالة إمكانية المراسلة القادمة من الباك إند (Snake Case)
          canMessage={m.can_message}
        />
      ))}
    </div>
  )
}

export default CurrentTeamList