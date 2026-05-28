import Input from "../Input"
import Textarea from "../Textarea"

const StepPreferences = ({ form, errors, handleChange }) => {
  return (
    <>
      <Input
        label="نوع التطوع"
        name="volunteer_type"
        value={form.volunteer_type}
        onChange={handleChange}
        error={errors.volunteer_type}
      />

      <Input
        label="السكن"
        name="residence"
        value={form.residence}
        onChange={handleChange}
        error={errors.residence}
      />

      <Input
        label="الاختصاص"
        name="specialization"
        value={form.specialization}
        onChange={handleChange}
        error={errors.specialization}
      />

      <Textarea
        label="الهدف من التطوع"
        name="motivation"
        value={form.motivation}
        onChange={handleChange}
        error={errors.motivation}
      />
    </>
  )
}

export default StepPreferences
