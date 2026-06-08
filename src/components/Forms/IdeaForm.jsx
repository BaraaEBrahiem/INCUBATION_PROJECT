import React, { useReducer, useState, useEffect } from "react";

import Button from "../Button";
import Stepper from "../Stepper";
import DynamicStep from "../DynamicStep";

import {
  initialForm,
  ideaReducer,
} from "../../hooks/useIdeaReducer";

import {
  useGetIdeaFormDesignQuery,
  useSaveFormStepMutation,
  useSubmitFinalIdeaMutation,
} from "../../api/endpoints/ideaSubmissionApi";
import { showInfo } from "../../Utils/toast";

const IdeaForm = ({ seasonId, onSubmit }) => {
  const {
    data: formData,
    isLoading,
    isError,
  } = useGetIdeaFormDesignQuery(seasonId);

  const [saveFormStep] =
    useSaveFormStepMutation();

  const [submitFinalIdea] =
    useSubmitFinalIdeaMutation();

  const [form, dispatch] =
    useReducer(
      ideaReducer,
      initialForm
    );

  const [errors, setErrors] =
    useState({});

  const [currentStep, setCurrentStep] =
    useState(0);

  const steps = formData?.steps || [];

  useEffect(() => {
    if (!formData) return;

    dispatch({
      type: "SET_DRAFT",
      payload: formData.draft_data || {},
    });
   //eslint-disable-next-line react-hooks/exhaustive-deps
    setCurrentStep(
      (formData.current_step || 1) - 1
    );
  }, [formData]);

  const handleChange = (
    field,
    value
  ) => {
    dispatch({
      type: "UPDATE_FIELD",
      field,
      value,
    });

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateStep = () => {
    const currentFields =
      steps[currentStep]?.questions || [];

    const newErrors = {};

    currentFields.forEach((field) => {
      const value =
        form[field.key];

      if (
        field.required &&
        (
          value === undefined ||
          value === null ||
          value === "" ||
          (
            Array.isArray(value) &&
            value.length === 0
          )
        )
      ) {
        newErrors[field.key] =
          `${field.label} مطلوب`;
      }
    });

    if (
      form.team === true
    ) {
      const teamMembers =
        form.team_members;

      if (
        !Array.isArray(teamMembers) ||
        teamMembers.length === 0
      ) {
        newErrors.team_members =
          "يجب إدخال إيميلات أعضاء الفريق";
      }
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    const currentFields =
      steps[currentStep]?.questions || [];

    const payload = {};

    currentFields.forEach((field) => {
      payload[field.key] =
        form[field.key];
    });

    try {
      await saveFormStep({
        seasonId,
        step: currentStep + 1,
        data: payload,
      }).unwrap();
      console.log("FORM DATA:", payload);

      setCurrentStep(
        (prev) => prev + 1
      );
    } catch (error) {
  console.log("FULL ERROR", error);
  console.log("ERROR DATA", error?.data);

  showInfo(
    JSON.stringify(
      error?.data,
      null,
      2
    )
  );
}
  };

  const handlePrevious = () => {
    setCurrentStep(
      (prev) => prev - 1
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep()) return;

    try {
      const result =
        await submitFinalIdea(
          seasonId
        ).unwrap();

      if (onSubmit) {
        onSubmit(result);
      }
    } catch (error) {
      if (error?.data) {
        setErrors(error.data);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container py-10">
        <p className="text-center">
          جاري تحميل الفورم...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container py-10">
        <p className="text-center text-red-500">
          فشل تحميل الفورم
        </p>
      </div>
    );
  }

  const currentFields =
    steps[currentStep]?.questions || [];

  const currentStepTitle =
    steps[currentStep]?.title || "";

  const completedSteps =
    formData?.completed_steps || [];

  const totalSteps =
    formData?.total_steps ||
    steps.length;

  const canSubmit =
    currentStep === steps.length - 1 &&
    completedSteps.length === totalSteps;

  return (
    <form
      onSubmit={handleSubmit}
      className="container space-y-6"
    >
      <Stepper
        steps={steps.map(
          (step) => step.title
        )}
        current={currentStep}
      />

      <DynamicStep
        stepName={
          currentStepTitle
        }
        fields={currentFields}
        form={form}
        errors={errors}
        handleChange={
          handleChange
        }
      />

      <div className="flex gap-4 mt-6">

        {currentStep > 0 && (
          <Button
            label="رجوع"
            type="button"
            onClick={
              handlePrevious
            }
            className="w-50 bg-gray-300 px-4 py-2 rounded"
          />
        )}

        {!canSubmit ? (
          <Button
            label="التالي"
            type="button"
            onClick={
              handleNext
            }
            className="w-50 bg-main-color text-white px-4 py-2 rounded"
          />
        ) : (
          <Button
            label="إرسال النهائي"
            type="submit"
            className="w-50 bg-main-color text-white px-4 py-2 rounded"
          />
        )}

      </div>
    </form>
  );
};

export default IdeaForm;