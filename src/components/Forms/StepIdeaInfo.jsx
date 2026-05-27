import Input from "../Input"
import Select from "../Select"
import Textarea from "../Textarea"

const StepIdeaInfo = ({ form, errors, handleChange, sectors }) => {
  return (
    <>
      <h3 className="font-bold text-lg">معلومات عن الفكرة</h3>

      <Input
        label="عنوان الفكرة"
        placeholder="ما هو عنوان فكرتك؟"
        name="title"
        value={form.title}
        // داخل مكون StepIdeaInfo
onChange={(e) => handleChange("title", e.target.value)}
        error={errors.title}
        className="w-1/2"
      />

      <Select
        label="القطاع"
        placeholder="اختر القطاع"
        name="sector"
        value={form.sector}
        onChange={handleChange}
        options={sectors}
        error={errors.sector}
        className="w-1/2"
      />

      <Textarea
        label="الوصف"
        placeholder="صف فكرتك بمزيد من التفاصيل..."
        name="description"
        value={form.description}
        onChange={handleChange}
        error={errors.description}
        className="w-1/2"
      />
    </>
  )
}

export default StepIdeaInfo
