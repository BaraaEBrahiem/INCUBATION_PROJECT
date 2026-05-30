const WorkshopCard = ({ workshop, status }) => {

  const statusStyles = {
    pending: "text-yellow-600",
    rejected: "text-red-color",
    accepted: "text-green-color"
  }

return (
     <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg text-right" dir="rtl">
    
    <div className="flex flex-col md:flex-row md:items-start md:gap-20 lg:gap-40 p-4 md:p-10 space-y-8 md:space-y-0">
      <div className="space-y-10">
      <p><span className="font-bold px-2">اسم الورشة:</span> {workshop.title}</p>
      <p><span className="font-bold px-2">تاريخ الانعقاد:</span> {workshop.start_date}</p>
      </div>
      <div className="space-y-10">
      <p><span className="font-bold px-2">تاريخ الانتهاء:</span> {workshop.end_date}</p>
      {/* الحالة */} 
     
      <p className={`font-bold px-2 ${statusStyles[status]}`}> 
      <span className="font-bold text-black pl-2">حالة الورشة:</span>
        {status === "PENDING" && "قيد المراجعة"}
        {status === "REJECTED" && "مرفوضة"}
        {status === "ACCEPTED" && "مقبولة"}
      </p>

      </div>
      <div className="space-y-10">
      <p><span className="font-bold">أيام الانعقاد:</span> {workshop.days}</p>
      <p><span className="font-bold">وقت الانعقاد:</span> {workshop.time_from}</p>
      </div>

      <div className="space-y-10">
      <p><span className="font-bold">وقت الانتهاء:</span> {workshop.time_to}</p>
      <p><span className="font-bold">عددالجلسات:</span> {workshop.sessions}</p>
      </div>
    
     </div>
      
      {/* الوصف */}
      <div className="mt-10">
        <h3 className="font-bold mb-2">الوصف التفصيلي:</h3>
        <p className="text-gray-700 leading-relaxed">{workshop.description}</p>
      </div>
      <div className="mt-10">
        <h3 className="font-bold mb-2">هدف الورشة:</h3>
        <p className="text-gray-700 leading-relaxed">{workshop.objectives}</p>
      </div>

      {status === "REJECTED" && (
        <div className="bg-main-color text-white p-4 mt-4 rounded-md">
          <h3 className="font-bold mb-2">سبب الرفض:</h3>
          {workshop.rejection_reason}
        </div>
      )}

      {(status === "ACCEPTED") && (
        <div className="bg-main-color text-white p-4 mt-6 rounded-md">
          <h3 className="font-bold mb-2">المسجلين في الورشة:</h3>
          {workshop.registrations.map((m, i) => (
            <p key={i}>{m.name}: {m.email}</p>
          ))}
        </div>
      )}

    </div>
  )
}
export default WorkshopCard