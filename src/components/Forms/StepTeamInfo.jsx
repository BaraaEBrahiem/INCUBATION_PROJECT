import Input from "../Input"
import RadioGroup from "../RadioGroup"

const StepTeamInfo = ({ form, errors, handleChange }) => {
  return (
    <>
      <h3 className="font-bold text-lg">معلومات الفريق</h3>

      <RadioGroup
        label="هل لديك فريق؟"
        name="hasTeam"
        value={form.hasTeam}
        onChange={(val) => handleChange("hasTeam", val)}
        options={[
          { value: "yes", label: "نعم" },
          { value: "no", label: "لا" }
        ]}
      />

      {form.hasTeam === "yes" && (
        <>
          <Input
            label="اعضاء الفريق"
            placeholder="اكتب أسماء الأعضاء مفصولة بفواصل"
            name="teamMembers"
            value={form.teamMembers}
            onChange={handleChange}
            error={errors.teamMembers}
            className="w-1/2"
          />

          <Input
            label="بريدهم الالكتروني"
            placeholder="اكتب بريد الأعضاء الالكتروني مفصولة بفواصل"
            type="email"
            name="teamEmails"
            value={form.teamEmails}
            onChange={handleChange}
            error={errors.teamEmails}
            className="w-1/2"
          />
        </>
      )}

      <Input
        label="المدة المتوقعة لانجاز المشروع"
        placeholder="المدة المتوقعة لانجاز المشروع بالأشهر"
        type="number"
        name="projectDuration"
        value={form.projectDuration > 0 ? form.projectDuration : ""}
        onChange={handleChange}
        error={errors.projectDuration}
        className="w-1/2"
      />
    </>
  )
}

export default StepTeamInfo
