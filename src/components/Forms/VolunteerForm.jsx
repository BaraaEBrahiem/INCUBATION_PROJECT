import React, { useReducer, useState } from "react";
import Button from "../Button";
import LinearProgress from "../LinearProgress";
import StepExperience from "./StepExperience";
import StepPreferences from "./StepPreferences";
import StepAvailability from "./StepAvailability";
import {
  initialVolunteerForm,
  volunteerReducer
} from "../../hooks/useVolunteerReducer";

// -----------------------------
// خيارات الخبرات (ثابتة)
// -----------------------------
const EXPERTISE_OPTIONS = [

  { value: "UI/UX", label: "UI/UX" },
  { value: "Frontend", label: "Frontend" },
  { value: "Marketing", label: "Marketing" },
  { value: "Legal", label: "Legal" },
  {value: "Backend", label: "Backend"}

];

const VolunteerForm = ({
  onSubmit,
  onCancel
}) => {
  const [form, dispatch] =
    useReducer(
      volunteerReducer,
      initialVolunteerForm
    );

  const [errors, setErrors] =
    useState({});

  const [step, setStep] =
    useState(0);

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });

    // مسح الخطأ عند التعديل
    if (errors[e.target.name]) {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: "",
      }));
    }
  };

  const handleAvailabilityChange =
    (availability) => {
      dispatch({
        type: "UPDATE_AVAILABILITY",
        value: availability,
      });

      if (errors.availability) {
        setErrors((prev) => ({
          ...prev,
          availability: "",
        }));
      }
    };

  const validateStep = () => {
    const newErrors = {};

    if (step === 0) {

      // التحقق من خطوة الخبرات والمهارات
      if (!form.years_of_experience) newErrors.years_of_experience = "سنوات الخبرة مطلوبة";
      if (!form.current_company) newErrors.current_company = "جهة العمل مطلوبة";
      if (!form.primary_skills) newErrors.primary_skills = "الخبرة الاساسية";
    } 
    else if (step === 1) {
      // التحقق من خطوة التفضيلات
      if (!form.volunteer_type) newErrors.volunteer_type = "نوع التطوع مطلوب";
      if (!form.residence) newErrors.residence = "الموقع مطلوب";
      if (!form.specialization) newErrors.specialization = "التخصص مطلوب";
      if (!form.motivation) newErrors.motivation = "هدف التطوع مطلوب";
    }
    else if (step === 2) {
      // التحقق من خطوة أوقات التوفر
      const availabilityValues = Object.values(form.availability || {});
      const hasAvailability = availabilityValues.some(day =>
        day.from && day.to && day.active
      );
      if (!hasAvailability) newErrors.availability = "يرجى تحديد أوقات التوفر";

    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateStep()) {
      onSubmit(form);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl my-6 space-y-8"
      >
        <LinearProgress
          steps={3}
          current={step}
          className="py-6"
        />

        {step === 0 && (
          <StepExperience
            form={form}
            errors={errors}
            handleChange={
              handleChange
            }
            expertiseOptions={
              EXPERTISE_OPTIONS
            }
          />
        )}

        {step === 1 && (
          <StepPreferences
            form={form}
            errors={errors}
            handleChange={
              handleChange
            }
          />
        )}


       {step === 2 && (
  <StepAvailability
    availability={form.availability} 
    errors={errors}
    onAvailabilityChange={handleAvailabilityChange} 
  />
)}


        <div className="flex justify-between items-center">
          <Button
            label="إلغاء"
            type="button"
            onClick={onCancel}
            className="bg-main-color text-white px-6 py-2 rounded"
          />

          <div className="flex gap-4">
            {step > 0 && (
              <Button
                label="رجوع"
                type="button"
                onClick={
                  handlePrevious
                }
                className="bg-main-color text-white px-6 py-2 rounded"
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