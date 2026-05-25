import TeamCard from "./TeamCard"

const SuggestedVolunteersList = ({ volunteers }) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {volunteers.map(v => (
        <TeamCard
          key={v.id}
          name={v.name}
          email={v.email}
          role={v.role} // يقرأ الـ role المحولة داخلياً في صفحتك الأساسية بنجاح
          buttonLabel="إضافة للفريق"
          onButtonClick={() => console.log("إضافة", v.name)}
        />
      ))}
    </div>
  )
}

export default SuggestedVolunteersList