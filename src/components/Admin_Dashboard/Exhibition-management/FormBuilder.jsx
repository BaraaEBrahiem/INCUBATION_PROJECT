import React, { useState, useEffect } from "react";
import FieldTypesPanel from "./FieldTypesPanel";
import FormBuilderCanvas from "./FormBuilderCanvas";
import Button from "../../Button";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../../../Utils/toast";
import { useCreateExhibitionFormMutation, usePublishSeasonMutation } from "../../../api/endpoints/formConfigApi"

const FormBuilder = ({ initialFields = [], onFieldsChange, seasonData }) => {
  const navigate = useNavigate();
  const [fields, setFields] = useState(initialFields);
  const [isPublishing, setIsPublishing] = useState(false);
  const [createExhibitionForm] = useCreateExhibitionFormMutation();
  const [publishSeason] = usePublishSeasonMutation();

  const goToPreview = () => {
    navigate("/admin/preview-form", { 
      state: { 
        fields, 
        seasonData: seasonData
      }
    });
  };

  useEffect(() => {
    if (onFieldsChange) onFieldsChange(fields);
  }, [fields, onFieldsChange]);

  // إضافة حقل جديد
  const addField = (type) => {
    const newField = {
      id: crypto.randomUUID(),
      type,
      label: "",
      required: false,
      options:
        type === "select" || type === "radio" || type === "checkbox"
          ? []
          : null,
    };
    setFields((prev) => [...prev, newField]);
  };

  // تعديل حقل
  const updateField = (id, updatedData) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, ...updatedData } : field
      )
    );
  };

  // حذف حقل
  const deleteField = (id) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  };

  const publishForm = async () => {
    if (!fields.length) {
      showError("يرجى إضافة حقل واحد على الأقل قبل النشر.");
      return;
    }

    const emptyLabel = fields.find((f) => !f.label.trim());
    if (emptyLabel) {
      showError("يرجى إدخال تسمية لجميع الحقول.");
      return;
    }

    setIsPublishing(true);
    try {
   
      const title = seasonData?.title || "نموذج المعرض الجديد"; 
      
      const createResponse = await createExhibitionForm(title).unwrap();
      

      const formId = createResponse?.id || createResponse?.form_id;

      if (!formId) {
        throw new Error("لم يتم استلام معرف النموذج من السيرفر.");
      }

      await publishSeason(formId).unwrap();

      showSuccess("تم إنشاء ونشر فورم المعرض بنجاح!");

    } catch (err) {
      console.error(err);
      showError(err?.data?.message || "حدث خطأ أثناء محاولة إنشاء ونشر النموذج.");
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
        <FieldTypesPanel addField={addField} />
      </div>
      <div className="flex justify-center items-center gap-8 mt-6">
        <Button
          label="معاينة النموذج"
          onClick={goToPreview}
          className="bg-main-color w-50"
          disabled={isPublishing}
        />
        <Button
          label={isPublishing ? "جاري النشر..." : "نشر"}
          onClick={publishForm}
          className="bg-main-color w-50"
          disabled={isPublishing}
        />
      </div>
    </div>
  );
};

export default FormBuilder;