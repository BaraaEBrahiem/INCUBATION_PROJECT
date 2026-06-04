import React, { useState, useEffect } from "react";
import DynamicStep from "../DynamicStep";
import Button from "../Button";
import AlertBox from "../AlertBox";
import { useSaveExhibitionDataMutation } from "../../api/endpoints/dashboardApi";

const ExhibitionStage = ({ data, onComplete }) => {
  const exhibitionDateRaw = data?.exhibition_date;

  const canEdit = data?.can_edit ?? false;
  const isOwner = data?.is_owner ?? false;

  const apiFormConfig =
    data?.form?.questions || [];

  const submittedData =
    data?.submitted_data?.data ||
    data?.submitted_data;

  const currentStepFields =
    apiFormConfig || [];

  const [saveExhibitionData, { isLoading: isSaving }] =
    useSaveExhibitionDataMutation();

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const formatDateTime = (isoString) => {
    if (!isoString) return "سيتم تحديده قريباً";

    const dateObj = new Date(isoString);

    return dateObj.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    const initialForm = {};

    currentStepFields.forEach((field) => {
      if (
        submittedData &&
        submittedData[field.key] !== undefined
      ) {
        initialForm[field.key] =
          submittedData[field.key];
      } else {
        initialForm[field.key] = "";
      }
    });
//eslint-disable-next-line react-hooks/exhaustive-deps
    setForm(initialForm);
  }, [submittedData, currentStepFields]);

  const handleChange = (key, value) => {
    if (!canEdit) return;

    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (errors[key]) {
      setErrors((prev) => ({
        ...prev,
        [key]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    currentStepFields.forEach((field) => {
      if (
        field.required &&
        !form[field.key]
      ) {
        newErrors[field.key] =
          `${field.label} مطلوب`;
      }
    });

    if (
      form.email &&
      !/\S+@\S+\.\S+/.test(form.email)
    ) {
      newErrors.email =
        "البريد الإلكتروني غير صحيح";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canEdit) return;

    setSubmitError("");
    setSubmitSuccess("");

    if (!validate()) return;

    try {
      const hasFiles =
        Object.values(form).some(
          (val) => val instanceof File
        );

      let payload;

      if (hasFiles) {
        const formData = new FormData();

        const textData = {};

        Object.keys(form).forEach((key) => {
          if (form[key] instanceof File) {
            formData.append(
              key,
              form[key]
            );
          } else {
            textData[key] =
              form[key];
          }
        });

        formData.append(
          "data",
          JSON.stringify(textData)
        );

        payload = formData;
      } else {
        payload = {
          data: form,
        };
      }

      await saveExhibitionData(
        payload
      ).unwrap();

      setSubmitSuccess(
        "تم حفظ وتسليم بيانات المعرض بنجاح! بالتوفيق في العرض النهائي."
      );

      if (onComplete) {
        setTimeout(() => {
          onComplete();
        }, 1500);
      }

    } catch (error) {
      console.error(
        "Error saving exhibition data:",
        error
      );

      setSubmitError(
        error?.data?.message ||
        error?.data?.detail ||
        "حدث خطأ أثناء تسليم البيانات"
      );
    }
  };

  return (
    <div className="p-4 md:p-6 rounded-xl space-y-6 min-h-[80vh] bg-white-color">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-second-color">
            مرحلة المعرض النهائي والتخرج
          </h2>

          <p className="text-gray-500 text-sm mt-0.5">
            يرجى استكمال بيانات بطاقة المشروع التي ستعرض أمام زوار المستثمرين.
          </p>
        </div>

        <div className="bg-main-color/5 border border-main-color/20 text-main-color font-bold px-4 py-2 rounded-xl text-center">
          <span className="text-xs block font-medium text-gray-500">
            موعد المعرض المعتمد:
          </span>

          {formatDateTime(
            exhibitionDateRaw
          )}
        </div>
      </div>

      {!isOwner && (
        <AlertBox message="عرض البيانات فقط: أنت مسجل كعضو فريق في هذا المشروع، مالك الفكرة (Owner) هو المخول الوحيد بتعبئة وتسليم البيانات." />
      )}

      {isOwner &&
        !canEdit &&
        submittedData && (
          <AlertBox message="لقد قمت بتسليم النموذج مسبقاً بنجاح، البيانات الآن قيد المراجعة والعرض ولا يمكن تعديلها." />
        )}

      {canEdit && (
        <AlertBox message="تنبيه للمالك: املأ الحقول بعناية، بمجرد النقر على زر الإرسال سيتم قفل النموذج وإرساله للمشرفين والمستثمرين." />
      )}

      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-center font-semibold text-sm">
          {submitError}
        </div>
      )}

      {submitSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg text-center font-semibold text-sm">
          {submitSuccess}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="space-y-5">
            {currentStepFields
              .filter(
                (_, idx) =>
                  idx % 2 === 0
              )
              .map((field) => (
                <div
                  key={field.id}
                  className={
                    !canEdit
                      ? "pointer-events-none opacity-85"
                      : ""
                  }
                >
                  <DynamicStep
                    stepName=""
                    fields={[field]}
                    form={form}
                    errors={errors}
                    handleChange={
                      handleChange
                    }
                  />
                </div>
              ))}
          </div>

          <div className="space-y-5">
            {currentStepFields
              .filter(
                (_, idx) =>
                  idx % 2 === 1
              )
              .map((field) => (
                <div
                  key={field.id}
                  className={
                    !canEdit
                      ? "pointer-events-none opacity-85"
                      : ""
                  }
                >
                  <DynamicStep
                    stepName=""
                    fields={[field]}
                    form={form}
                    errors={errors}
                    handleChange={
                      handleChange
                    }
                  />
                </div>
              ))}
          </div>

        </div>

        {canEdit && (
          <div className="flex items-center justify-center pt-4 border-t border-gray-100">
            <Button
              label={
                isSaving
                  ? "جاري إرسال البيانات..."
                  : "تأكيد وتسليم الاستمارة"
              }
              className="bg-main-color px-10 py-3 text-white font-bold rounded-xl shadow-md transition-all hover:scale-[1.01]"
              type="submit"
              disabled={isSaving}
            />
          </div>
        )}

      </form>
    </div>
  );
};

export default ExhibitionStage;