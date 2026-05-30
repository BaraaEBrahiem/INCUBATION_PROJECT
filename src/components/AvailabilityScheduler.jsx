import React from "react"
import Input from "./Input"
import CheckBox from "./CheckBox"

const daysOfWeek = ["الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"]

const AvailabilityScheduler = ({ value, onChange }) => {
  // قيمة افتراضية: فترة واحدة فارغة لكل يوم
  const availability = value && Object.keys(value).length
    ? value
    : Object.fromEntries(daysOfWeek.map(day => [day, { from: "", to: "", active: false }]))

  const handleChange = (day, field, val) => {
    const newAvailability = {
      ...availability,
      [day]: { ...availability[day], [field]: val }
    }
    onChange && onChange(newAvailability)
  }

  const handleToggle = (day) => {
    const newAvailability = {
      ...availability,
      [day]: { ...availability[day], active: !availability[day].active }
    }
    onChange && onChange(newAvailability)
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">حدد توفرَك الأسبوعي</h1>
      <p className="text-sm text-gray-600 mb-6">
        اختر وقت بداية ونهاية لكل يوم تكون فيه متاحًا
      </p>

      {daysOfWeek.map((day) => (
        <div key={day} className="mb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <h2 className="text-md font-semibold w-24">{day}</h2>

            <Input
              type="time"
              value={availability[day].from}
              onChange={(e) => handleChange(day, "from", e.target.value)}
              className="w-full sm:w-auto"
              disabled={!availability[day].active}
            />

            <span className="hidden sm:block">إلى</span>
            <span className="sm:hidden">إلى:</span>

            <Input
              type="time"
              value={availability[day].to}
              onChange={(e) => handleChange(day, "to", e.target.value)}
              className="w-full sm:w-auto"
              disabled={!availability[day].active}
            />

            <label className="flex items-center gap-2 text-sm mt-2 sm:mt-0">
        
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                      <input
                        type="checkbox"
                        id={`day-${day}`}
                        checked={availability[day]?.active || false}
                        onChange={() => handleToggle(day)}
                        className="w-5 h-5 accent-main-color cursor-pointer"
                      />
                      <label htmlFor={`day-${day}`} className="text-sm cursor-pointer select-none">
                        مفعّل
                      </label>
                    </div>
            </label>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AvailabilityScheduler