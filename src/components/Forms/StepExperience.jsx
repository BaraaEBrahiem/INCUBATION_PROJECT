import Input from "../Input"
import Select from "../Select"

const StepExperience = ({ form, errors, handleChange, expertiseOptions}) => {
  return (
    <div className="grid grid-cols-2 gap-15">
      <Input
        label="عدد سنوات الخبرة"
        name="years_of_experience"
        type="number"
        value={form.years_of_experience > 0 ? form.years_of_experience : ""}
        onChange={handleChange}
        error={errors.years_of_experience}
      />

      <Input
        label="جهة العمل الحالية"
        name="current_company"
        value={form.current_company}
        onChange={handleChange}
        error={errors.current_company}
      />

      <Select
        label="المهارة الاساسية"
        name="primary_skills"
        value={form.primary_skills}
        onChange={handleChange}
        options={expertiseOptions}
        error={errors.primary_skills}  
      />
    </div>
  )
}

export default StepExperience
