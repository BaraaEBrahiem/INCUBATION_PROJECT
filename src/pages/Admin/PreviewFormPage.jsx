import React from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import FormPreview from "../../components/Admin_Dashboard/Exhibition-management/FormPreview";

import Button from "../../components/Button";

const PreviewFormPage = () => {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const fields =
    location.state?.fields ||
    [];

  const seasonData =
    location.state
      ?.seasonData;

  const goBackToFormBuilder =
    () => {
      navigate(
        "/admin/exhibition",
        {
          state: {
            activeTab:
              "create-card",

            fields:
              fields,

            seasonData:
              seasonData,
          },
        }
      );
    };

  return (
    <div className="container">
      <h1 className="text-xl font-bold mb-6">
        معاينة النموذج
      </h1>

      <FormPreview
        fields={fields}
      />

      <div className="flex justify-center items-center">
        <Button
          label="العودة للتعديل"
          onClick={
            goBackToFormBuilder
          }
          className="bg-main-color w-50"
        />
      </div>
    </div>
  );
};

export default PreviewFormPage;