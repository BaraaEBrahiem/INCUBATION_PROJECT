import React, { useState, useEffect } from "react";
import FieldTypesPanel from "../../Exhibition-management/FieldTypesPanel";
import FormBuilderCanvas from "../../Exhibition-management/FormBuilderCanvas";
import Button from "../../../Button";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../../../../Utils/toast";
import {
  useCreateExhibitionFormMutation,
  usePublishSeasonMutation,
} from "../../../api/endpoints/formConfigApi";


const FormBuilder = ({
  
  initialFields = [],
  onFieldsChange,
  seasonData,
}) => {
  console.log("EXHIBITION FORM BUILDER");
  const navigate = useNavigate();

  const [fields, setFields] = useState(initialFields);
  const [isPublishing, setIsPublishing] = useState(false);

  const [createExhibitionForm] =
    useCreateExhibitionFormMutation();

  const [publishSeason] =
    usePublishSeasonMutation();

  const goToPreview = () => {
    navigate("/admin/preview-form", {
      state: {
        fields,
        seasonData,
      },
    });
  };

  useEffect(() => {
    if (onFieldsChange) {
      onFieldsChange(fields);
    }
  }, [fields, onFieldsChange]);

  // إضافة حقل جديد
  const addField = (type) => {
    const newField = {
      id: crypto.randomUUID(),
      type,
      label: "",
      required: false,
      options:
        type === "select" ||
        type === "radio" ||
        type === "checkbox"
          ? []
          : null,
    };

    setFields((prev) => [...prev, newField]);
  };

  // تعديل حقل
  const updateField = (id, updatedData) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id
          ? { ...field, ...updatedData }
          : field
      )
    );
  };

  // حذف حقل
  const deleteField = (id) => {
    setFields((prev) =>
      prev.filter((field) => field.id !== id)
    );
  };

  const publishForm = async () => {
    console.log("publish clicked");

    if (!fields.length) {
      showError(
        "يرجى إضافة حقل واحد على الأقل قبل النشر."
      );
      return;
    }

    const emptyLabel = fields.find(
      (f) => !f.label?.trim()
    );

    if (emptyLabel) {
      showError(
        "يرجى إدخال تسمية لجميع الحقول."
      );
      return;
    }

    setIsPublishing(true);

    try {
      // تجهيز البيانات لتناسب الباك
      const questions = fields.map(
        (field) => ({
          type:
            field.type === "shortText"
              ? "text"
              : field.type === "longText"
              ? "textarea"
              : field.type === "checkbox"
              ? "select_multiple"
              : field.type === "radio"
              ? "yes_no"
              : field.type,

          label: field.label,
          required:
            field.required || false,

          options:
            field.options?.map((opt) => ({
              label:
                typeof opt === "string"
                  ? opt
                  : opt.label,
            })) || [],
        })
      );

      console.log("REQUEST BODY", {
        questions,
      });

      // إنشاء الفورم
      const createResponse =
        await createExhibitionForm({
          questions,
        }).unwrap();

      console.log(
        "CREATE RESPONSE",
        createResponse
      );

      const formId =
        createResponse?.form_id;

      if (!formId) {
        throw new Error(
          "لم يتم استلام form_id من السيرفر"
        );
      }

      // نشر الفورم
      await publishSeason(
        formId
      ).unwrap();

      showSuccess(
        "تم إنشاء ونشر فورم المعرض بنجاح!"
      );
    } catch (err) {
      console.error(err);

      showError(
        err?.data?.message ||
          err?.data?.detail ||
          "حدث خطأ أثناء إنشاء أو نشر الفورم."
      );
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div>
      <div className="flex gap-6">
        <div className="flex-1">
          <FormBuilderCanvas
            fields={fields}
            updateField={updateField}
            deleteField={deleteField}
          />
        </div>

        <FieldTypesPanel
          addField={addField}
        />
      </div>

      <div className="flex justify-center items-center gap-8 mt-2">
        <Button
          label="معاينة النموذج"
          onClick={goToPreview}
          className="bg-main-color w-50"
          disabled={isPublishing}
        />

        <Button
          label={
            isPublishing
              ? "جاري النشر..."
              : "نشر"
          }
          onClick={publishForm}
          className="bg-main-color w-50"
          disabled={isPublishing}
        />
      </div>
    </div>
  );
};

export default FormBuilder;