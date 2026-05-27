 import React, { useReducer, useState } from "react";
import Button from "../Button";
import LinearProgress from "../LinearProgress";
import StepExperience from "./StepExperience";
import StepPreferences from "./StepPreferences";
import StepAvailability from "./StepAvailability";
import { initialVolunteerForm, volunteerReducer } from "../../hooks/useVolunteerReducer";

const EXPERTISE_OPTIONS = [
  { value: "ui ux", label: "تصميم واجهات وتجربة المستخدم" },
  { value: "development", label: "تطوير برمجيات" },
  { value: "marketing", label: "التسويق الرقمي" },
  { value: "training", label: "تقديم ورشات تدريبية" }
];

const VolunteerForm = ({ onSubmit, onCancel }) => {
  const [form, dispatch] = useReducer(volunteerReducer, initialVolunteerForm);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(0);

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleAvailabilityChange = (availability) => {
    dispatch({
      type: "UPDATE_AVAILABILITY",
      value: availability
    });
    if (errors.availability) {
      setErrors(prev => ({ ...prev, availability: "" }));
    }
  };

  const validateStep = () => {
    const newErrors = {};

    if (step === 0) {
      if (!form.experienceYears) newErrors.experienceYears = "سنوات الخبرة مطلوبة";
      if (!form.expertiseArea) newErrors.expertiseArea = "مجال الخبرة الرئيسي مطلوب";
      if (!form.employer) newErrors.employer = "جهة العمل مطلوبة";
    } 
    else if (step === 1) {
      if (!form.consultationPreferences) newErrors.consultationPreferences = "تفضيلات الاستشارة مطلوبة";
      if (!form.location) newErrors.location = "الموقع مطلوب";
      if (!form.expertition) newErrors.expertition = "الخبرات الإضافية مطلوبة";
      if (!form.volunteeringGoal) newErrors.volunteeringGoal = "هدف التطوع مطلوب";
    }
    else if (step === 2) {
      const availabilityValues = Object.values(form.availability || {});
      const hasAvailability = availabilityValues.some(day => day.from && day.to && day.active);
      if (!hasAvailability) newErrors.availability = "يرجى تحديد أوقات التوفر";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => validateStep() && setStep(step + 1);
  const handlePrevious = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) onSubmit(form);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-4xl my-6 space-y-8">
        <LinearProgress steps={3} current={step} className="py-6" />

        {step === 0 && (
          <StepExperience
            form={form}
            errors={errors}
            handleChange={handleChange}
            expertiseOptions={EXPERTISE_OPTIONS}
          />
        )}

        {step === 1 && (
          <StepPreferences
            form={form}
            errors={errors}
            handleChange={handleChange}
          />
        )}

        {step === 2 && (
          <StepAvailability
            availability={form.availability}
            errors={errors}
            onAvailabilityChange={handleAvailabilityChange} // تعديل: ربط دالة التغيير الممررة بشكل صحيح للـ Props المتوقعة داخل المكون الفرعي
          />
        )}

        <div className="flex justify-between items-center mt-6">
          <Button
            label="إلغاء"
            type="button"
            onClick={onCancel}
            className="bg-red-500 text-white px-6 py-2 rounded"
          />

          <div className="flex gap-4">
            {step > 0 && (
              <Button
                label="رجوع"
                type="button"
                onClick={handlePrevious}
                className="bg-gray-300 px-6 py-2 rounded"
              />
            )}
 {step < 2 ? (
              <Button
                label="التالي"
                type="button"
                onClick={handleNext}
                className="bg-main-color text-white px-6 py-2 rounded"
              />
            ) : (
              <Button
                label="إرسال"
                type="submit"
                className="bg-main-color text-white px-6 py-2 rounded"
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default VolunteerForm;