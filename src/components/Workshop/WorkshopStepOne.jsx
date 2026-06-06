import React from "react"
import Input from "../Input"
import Button from "../Button"

const WorkshopStepOne = ({
  formData,
  setFormData,
  onNext,
  error,
}) => {

  return (
    <div className="flex flex-col gap-6 w-full">
      <div>
        <label className="font-bold">عنوان الدورة</label>
        <Input
          type="text"
          value={formData.title}
          error={error.title} 
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full"
        />
      </div>

      <div>
        <label className="font-bold">المجال</label>
        <Input
          type="text"
          value={formData.category}
          error={error.category}  
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full"
        />
      </div>

      <div>
        <label className="font-bold">تاريخ بدء الدورة</label>
        <Input
          type="date"
          value={formData.start_date}
          error={error.start_date}
          onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
          className="w-full"
        />
      </div>

     <div>
        <label className="font-bold">أيام الدورة</label>
        <Input
          type="text"
          value={formData.days}
          error={error.days}  
          onChange={(e) => setFormData({ ...formData, days: e.target.value })}
          className="w-full"
        />
      </div>

      <div>
        <label className="font-bold">تاريخ انتهاء الدورة</label>
        <Input
          type="date"
          value={formData.end_date}
          error={error.endDate}
          onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
          className="w-full"
        />
      </div>
      <div>
        <label className="font-bold">عدد المقاعد</label>
        <Input
          type="number"
          value={formData.capacity}
          error={error.capacity}  
          onChange={(e) => setFormData({ ...formData, capacity: e.target.value >= 0 ? e.target.value : 0 })}
          className="w-full"
        />
      </div>
      <div>
        <label className="font-bold">عدد الجلسات</label>
        <Input
          type="number"
          value={formData.sessions}
          error={error.sessions}  
          onChange={(e) => setFormData({ ...formData, sessions: e.target.value >= 0 ? e.target.value : 0 })}
          className="w-full"
        />
      </div>

      {/* زر التالي */}
      <Button
        label="التالي" 
        onClick={onNext}
        className="bg-main-color"
      />

    </div>
  )
}

export default WorkshopStepOne