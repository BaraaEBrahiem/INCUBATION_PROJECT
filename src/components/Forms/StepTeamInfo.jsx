import React from "react";
import Input from "../Input";
import RadioGroup from "../RadioGroup";

const StepTeamInfo = ({ form, errors, handleChange }) => {
  
  const getRadioValue = () => {
    if (form.team === true) return "yes";
    if (form.team === false) return "no";
    return "";
  };

  const handleRadioChange = (val) => {
    if (val === "yes") {
      handleChange("team", true);
    } else {
      handleChange("team", false);
      handleChange("ايميلات اعضاء الفريق", []);
      handleChange("team_members_names_local", "");
    }
  };

  const handleEmailsChange = (e) => {
    const value = e.target.value;
    const emailArray = value.split(",").map(email => email.trim()).filter(email => email !== "");
    handleChange("ايميلات اعضاء الفريق", emailArray);
  };

  return (
    <>
      <h3 className="font-bold text-lg">معلومات الفريق</h3>

      <RadioGroup
        label="هل لديك فريق؟"
        name="team"
        value={getRadioValue()}
        onChange={handleRadioChange}
        options={[
          { value: "yes", label: "نعم" },
          { value: "no", label: "لا" }
        ]}
      />
      {errors.team && <p className="text-red-500 text-sm mt-1">{errors.team}</p>}

      {form.team === true && (
        <div className="mt-4 space-y-4">
          
          {/* إرجاع حقل الأسماء محلياً هنا أيضاً كرمال التناسق الكامل */}
          <Input
            label="أسماء أعضاء الفريق"
            placeholder="مثال: أحمد, محمد"
            type="text"
            name="team_members_names_local"
            value={form["team_members_names_local"] || ""}
            onChange={(e) => handleChange("team_members_names_local", e.target.value)}
            error={errors.team_members_names_local}
            className="w-1/2"
          />

          <Input
            label="بريدهم الالكتروني (افصلي بين كل بريد والآخر بفاصلة , )"
            placeholder="member1@gmail.com, member2@gmail.com"
            type="text"
            name="ايميلات اعضاء الفريق"
            value={Array.isArray(form["ايميلات اعضاء الفريق"]) ? form["ايميلات اعضاء الفريق"].join(", ") : ""}
            onChange={handleEmailsChange}
            error={errors["ايميلات اعضاء الفريق"]}
            className="w-1/2"
          />
        </div>
      )}
    </>
  );
};

export default StepTeamInfo;