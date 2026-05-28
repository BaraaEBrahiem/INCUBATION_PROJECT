import React, {
  useState,
} from "react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import AdminNavbar from "../../components/AdminNavbar";
import PageTabs from "../../components/Admin_Dashboard/PageTabs";
import ExhibitionSchedule from "../../components/Admin_Dashboard/Exhibition-management/ExhibitionSchedule";
import FormBuilder from "../../components/Admin_Dashboard/IncubationSeasons/Create-Season/FormBuilder";
import CardRequests from "../../components/Admin_Dashboard/Exhibition-management/CardRequests";
import ExhibitionRecord from "../../components/Admin_Dashboard/Exhibition-management/ExhibitionRecord";

import {
  useCreateExhibitionFormMutation,
  usePublishSeasonMutation,
} from "../../api/endpoints/formConfigApi";

import {
  showError,
  showSuccess,
} from "../../Utils/toast";

const ExhibitionManagementPage =
  () => {
    const navigate =
      useNavigate();

    const location =
      useLocation();

    // هون التعديل المهم
    const [
      activeTab,
      setActiveTab,
    ] = useState(
      location.state
        ?.activeTab ||
        "schedule"
    );

    const [
      createExhibitionForm,
    ] =
      useCreateExhibitionFormMutation();

    const [
      publishSeason,
    ] =
      usePublishSeasonMutation();

    const tabs = [
      {
        id: "schedule",
        label:
          "إدارة حدث المعرض",
      },
      {
        id: "create-card",
        label:
          "إنشاء إطار بطاقة",
      },
      {
        id: "requests",
        label:
          "طلبات البطاقات",
      },
      {
        id: "records",
        label:
          "سجل المعارض",
      },
    ];

    const createSeason =
      () => {
        navigate(
          "/admin/create-season"
        );
      };

    return (
      <div>
        <AdminNavbar
          BtnLabel={
            "إضافة موسم"
          }
          onBtnClick={
            createSeason
          }
        />

        <div className="container p-6 mt-20">
          <PageTabs
            tabs={tabs}
            activeTab={
              activeTab
            }
            onChange={
              setActiveTab
            }
          />

          <div className="mt-6">
            {activeTab ===
              "schedule" && (
              <ExhibitionSchedule />
            )}

            {activeTab ===
              "create-card" && (
              <FormBuilder
                initialFields={
                  location
                    .state
                    ?.fields ||
                  []
                }
                seasonData={
                  location
                    .state
                    ?.seasonData
                }
                onSubmit={async (
                  formConfig
                ) => {
                  try {
                    console.log(
                      "FORM CONFIG",
                      formConfig
                    );

                    // تحويل البيانات لتناسب الباك
                    const questions =
                      formConfig.fields.map(
                        (
                          field
                        ) => ({
                          type:
                            field.type ===
                            "shortText"
                              ? "short_text"
                              : field.type ===
                                "longText"
                              ? "long_text"
                              : field.type ===
                                "radio"
                              ? "single_choice"
                              : field.type ===
                                "checkbox"
                              ? "multiple_choice"
                              : field.type ===
                                "select"
                              ? "single_choice"
                              : field.type ===
                                "yesNo"
                              ? "yes_no"
                              : field.type,

                          label:
                            field.label,

                          required:
                            field.required ||
                            false,

                          options:
                            field.options?.map(
                              (
                                opt
                              ) => ({
                                label:
                                  typeof opt ===
                                  "string"
                                    ? opt
                                    : opt.label,
                              })
                            ) ||
                            [],
                        })
                      );

                    console.log(
                      "QUESTIONS PAYLOAD",
                      questions
                    );

                    // إنشاء الفورم
                    const response =
                      await createExhibitionForm(
                        {
                          questions,
                        }
                      ).unwrap();

                    console.log(
                      "CREATE RESPONSE",
                      response
                    );

                    const formId =
                      response?.form_id;

                    if (
                      !formId
                    ) {
                      throw new Error(
                        "لم يتم استلام form_id"
                      );
                    }

                    // نشر الفورم
                    await publishSeason(
                      formId
                    ).unwrap();

                    showSuccess(
                      "تم إنشاء ونشر الفورم بنجاح"
                    );
                  } catch (
                    err
                  ) {
                    console.error(
                      "FORM ERROR",
                      err
                    );

                    showError(
                      err?.data
                        ?.detail ||
                        err?.data
                          ?.message ||
                        "حدث خطأ أثناء إنشاء الفورم"
                    );
                  }
                }}
              />
            )}

            {activeTab ===
              "requests" && (
              <CardRequests />
            )}

            {activeTab ===
              "records" && (
              <ExhibitionRecord />
            )}
          </div>
        </div>
      </div>
    );
  };

export default ExhibitionManagementPage;