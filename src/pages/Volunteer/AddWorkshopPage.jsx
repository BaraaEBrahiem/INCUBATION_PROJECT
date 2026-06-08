import React, { useState } from "react";
import WorkshopImage from "../../components/Workshop/WorkshopImage";
import WorkshopStepOne from "../../components/Workshop/WorkshopStepOne";
import WorkshopStepTwo from "../../components/Workshop/WorkshopStepTwo";
import { useAddWorkshopMutation } from "../../api/endpoints/workshopsApi";

import {showError, showSuccess} from "../../Utils/toast"


const AddWorkshopPage = () => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState({});
  const [addWorkshop, { isLoading }] = useAddWorkshopMutation();

  const [formData, setFormData] = useState({
    time_from: "",
    time_to: "",
    description: "",
    title: "",
    objectives: [""],
    target_audience: "",
    sessions: "",
    capacity: "",
    category: "",
    start_date: "",
    end_date: "",
    days: "",
    image: null,
  });

  const handleSubmit = async () => {
    const newError = {};
    const requiredFields = [
      "time_from",
      "time_to",
      "description",
      "target_audience",
      "title",
      "category",
      "start_date",
      "end_date",
      "days",
      "sessions",
      "capacity",
      "objectives", 

    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) newError[field] = "هذا الحقل مطلوب";
    });

    const hasValidObjectives = formData.objectives.some(obj => obj && obj.trim() !== "");
    if (!hasValidObjectives) {
      newError["objectives"] = "يجب إضافة هدف واحد على الأقل للورشة";
    }

    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }


    setError({});

    const cleanedObjectives = formData.objectives
      .map(obj => obj.trim())
      .filter(Boolean);

    const form = new FormData();

// الحقول العادية
form.append("title", formData.title);
form.append("category", formData.category);
form.append("target_audience", formData.target_audience);
form.append("description", formData.description);
form.append("capacity", formData.capacity);
form.append("sessions", formData.sessions);
form.append("start_date", formData.start_date);
form.append("end_date", formData.end_date);
form.append("time_from", formData.time_from);
form.append("time_to", formData.time_to);

// arrays لازم تنرسل JSON string
form.append("days", JSON.stringify(formData.days));
form.append("objectives", JSON.stringify(cleanedObjectives));

// الصورة
if (formData.image instanceof File) {
  form.append("image", formData.image);
}

try {
  await addWorkshop(form).unwrap();
      showSuccess("تم اضافة الورشة بنجاح");
      setFormData({
        time_from: "",
        time_to: "",
        description: "",
        title: "",
        objectives: [""],
        target_audience: "",
        sessions: "",
        capacity: "",
        category: "",
        start_date: "",
        end_date: "",
        days: "",
        image: null,
      });

      setStep(1);
    } catch (err) {
      showError ('error', err)

    }
  };

  return (
    <div className="bg-white-color min-h-screen p-6 md:p-10" dir="ltr">
      <h1 className="text-2xl md:text-3xl font-bold text-second-color text-center md:text-right">
        اضافة ورشة تدريبية
      </h1>

      <div className="container mt-10 md:mt-40 flex flex-col-reverse md:flex-row justify-between items-center gap-10 md:gap-0" dir="rtl">
        <div className="w-full md:w-[500px]">
          {step === 1 && (
            <WorkshopStepOne
              formData={formData}
              setFormData={setFormData}
              onNext={() => setStep(2)}
              error={error}
            />
          )}
          {step === 2 && (
            <WorkshopStepTwo
              formData={formData}
              setFormData={setFormData}
              onBack={() => setStep(1)}
              onSubmit={handleSubmit}
              error={error}
              isLoading={isLoading}
            />
          )}
        </div>
        <WorkshopImage image={formData.image} />
      </div>
    </div>
  );
};

export default AddWorkshopPage;