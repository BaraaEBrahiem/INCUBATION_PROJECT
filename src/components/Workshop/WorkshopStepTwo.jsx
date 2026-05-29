import React from "react"
import Input from "../Input"
import Button from "../Button"
import Textarea from "../Textarea"

const WorkshopStepTwo = ({
  formData,
  setFormData,
  onBack,
  error,
  onSubmit
}) => {

  // التأكد من أن الأهداف معرفة كمصفوفة لتجنب الأخطاء البرمجية
  const objectivesList = Array.isArray(formData.objectives) ? formData.objectives : [""];

  // دالة لتحديث نص هدف معين بناءً على ترتيبه (Index)
  const handleObjectiveChange = (index, value) => {
    const updatedObjectives = [...objectivesList];
    updatedObjectives[index] = value;
    setFormData(prev => ({ ...prev, objectives: updatedObjectives }));
  };

  // دالة لإضافة حقل هدف جديد
  const addObjectiveField = () => {
    setFormData(prev => ({ 
      ...prev, 
      objectives: [...objectivesList, ""] 
    }));
  };

  // دالة لحذف هدف معين
  const removeObjectiveField = (indexToRemove) => {
    // نمنع حذف الحقل الأخير لكي يتبقى حقل واحد على الأقل للمستخدم
    if (objectivesList.length === 1) return;
    
    const updatedObjectives = objectivesList.filter((_, index) => index !== indexToRemove);
    setFormData(prev => ({ ...prev, objectives: updatedObjectives }));
  };

  return (
    <div className="flex flex-col gap-6 w-full text-right" dir="rtl">
      {/* صورة الدورة */}
      <div>
        <Input
          label="صورة للورشة (اختياري)"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const imageURL = URL.createObjectURL(file);
              setFormData(prev => ({ ...prev, image: imageURL }));
            }
          }}
          className="w-full"
        />
      </div>

      {/* وقت الدورة */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input 
            label={"من"}
            type="time"
            error={error.time_from}
            value={formData.time_from || ""}
            onChange={(e) => setFormData({ ...formData, time_from: e.target.value })}
            className="w-full"
          />
        </div>

        <div className="flex-1">
          <Input 
            label={"إلى"}
            type="time"
            error={error.time_to}
            value={formData.time_to || ""}
            onChange={(e) => setFormData({ ...formData, time_to: e.target.value })}
            className="w-full"
          />
        </div>
      </div>

      {/* الوصف */}
      <div>
        <label className="font-bold block mb-1">الوصف الذي يظهر للطالب</label>
        <Textarea
          value={formData.description || ""}
          error={error.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full"
        />
      </div>

      {/* الفئة المستهدفة */}
      <div>
        <label className="font-bold block mb-1">حدد الأشخاص الذين تخصص لهم هذه الورشة</label>
        <Input
          type="text"
          error={error.target_audience}
          value={formData.target_audience || ""}
          onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
          className="w-full"
        />
      </div>

      <div>
        <label className="font-bold block mb-2 text-gray-800">أهداف الورشة (نقاط محددة)</label>
        
        <div className="flex flex-col gap-3">
          {objectivesList.map((objective, index) => (
            <div key={index} className="flex items-center gap-2">
              {/* رقم النقطة كعلامة بصرية احترافية */}
              <span className="bg-gray-200 text-gray-700 font-medium px-3 py-2 rounded-lg border border-gray-300">
                {index + 1}
              </span>
              
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder={`اكتبي الهدف رقم ${index + 1} هنا...`}
                  value={objective}
                  onChange={(e) => handleObjectiveChange(index, e.target.value)}
                  className="w-full"
                />
              </div>

              {/* زر حذف النقطة (يظهر فقط إذا كان هناك أكثر من حقل واحد) */}
              {objectivesList.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeObjectiveField(index)}
                  className="bg-red-100 text-red-600 hover:bg-red-200 p-2.5 rounded-lg border border-red-300 font-bold text-sm transition-colors"
                  title="حذف هذا الهدف"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        {/* زر إضافة نقطة هدف جديدة */}
        <button
          type="button"
          onClick={addObjectiveField}
          className="mt-3 flex items-center gap-1 text-sm font-semibold text-main-color hover:text-opacity-80 transition-all"
        >
          <span className="text-base">+</span> إضافة هدف مخصص آخر
        </button>

        {/* إظهار رسالة الخطأ الخاصة بالأهداف إن وجدت من الفرونت أو الباك إند */}
        {error.objectives && (
          <p className="text-red-500 text-xs mt-1">{error.objectives}</p>
        )}
      </div>

      {/* أزرار التحكم السفلى */}
      <div className="flex gap-6 mt-4">
        <Button
          label="عودة" 
          onClick={onBack}
          className="bg-main-color px-10 py-2"
        />

        <Button 
          label="التالي"
          onClick={onSubmit}
          className="bg-main-color px-10 py-2"
        />
      </div>

    </div>
  )
}

export default WorkshopStepTwo;