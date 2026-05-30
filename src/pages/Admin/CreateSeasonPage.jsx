import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NewSeasonSettings from "../../components/Admin_Dashboard/IncubationSeasons/Create-Season/NewSeasonSettings";
import FormBuilder from "../../components/Admin_Dashboard/IncubationSeasons/Create-Season/FormBuilder";
import NavLinkUniversal from "../../components/NavLinkUniversal";
import { useCreateIncubationSeasonMutation } from "../../api/endpoints/admin/seasonsApi";
import { useCreateSeasonFormMutation, useSaveSeasonFormDesignMutation } from "../../api/endpoints/formConfigApi";
import { usePublishSeasonMutation } from "../../api/endpoints/admin/seasonsApi";
import { showSuccess, showError } from "../../Utils/toast";

const CreateSeasonPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || "settings");
  const [formFields, setFormFields] = useState(location.state?.fields || []);
  const [seasonData, setSeasonData] = useState(location.state?.seasonData || null);
  //eslint-disable-next-line
  const [formConfig, setFormConfig] = useState(null);

  const [createSeason, { isLoading: isCreatingSeason }] = useCreateIncubationSeasonMutation();
  const [createSeasonForm, { isLoading: isCreatingForm }] = useCreateSeasonFormMutation();
  const [saveFormDesign, { isLoading: isSavingDesign }] = useSaveSeasonFormDesignMutation();
  const [publishSeason, { isLoading: isPublishing }] = usePublishSeasonMutation();

  const isSubmitting = isCreatingSeason || isCreatingForm || isSavingDesign || isPublishing;

  useEffect(() => {
    //eslint-disable-next-line
    if (location.state?.activeTab) setActiveTab(location.state.activeTab);
    if (location.state?.seasonData) setSeasonData(location.state.seasonData);
    if (location.state?.fields) setFormFields(location.state.fields);
    console.log(location.state);
  }, [location.state]);

  const handleSettingsSubmit = (data) => {
    console.log("Settings:", data);
    setSeasonData(data);
    setActiveTab("form");
  };

  const handleFormConfigSubmit = async (config) => {
    console.log("Form Config:", config);
    setFormConfig(config);

    if (!seasonData) {
      showError("لم يتم إدخال إعدادات الموسم بعد.");
      return;
    }

    try {
      const seasonPayload = {
        name: seasonData.name,
        description: seasonData.description,
        start_date: seasonData.start_date,
        end_date: seasonData.end_date,
      };

      // 1. إنشاء الموسم أولاً وأخذ الـ ID الخاص به
      const newSeason = await createSeason(seasonPayload).unwrap();
      const seasonId = newSeason.id;

      // إرسال الكائن الجديد بدلاً من الـ ID المجرد
    await createSeasonForm({ 
      season_id: seasonId, 
      title: `نموذج ${seasonData.name}` 
    }).unwrap();
          
      //إكمال بقية الطلبات بنجاح
      await saveFormDesign({ season_id: seasonId, formConfig: config }).unwrap();
      await publishSeason(seasonId).unwrap();

      showSuccess("تم إنشاء الموسم ونشر النموذج بنجاح");
      navigate(`/admin/incubation-seasons/${seasonData?.id}`);
    } catch (err) {
      console.error("Full error:", err);
      let errorMsg = "حدث خطأ في إنشاء الموسم";
      if (err?.data?.message) errorMsg = err.data.message;
      else if (err?.data?.detail) errorMsg = err.data.detail;
      else if (err?.data?.error) errorMsg = err.data.error;
      else if (err?.error) errorMsg = err.error;
      showError(`${errorMsg}`);
    }
  };

  const handleFormFieldsChange = (fields) => {
    setFormFields(fields);
  };

  return (
    <div className="bg-white-color min-h-screen w-full p-10">
      <div className="flex justify-end">
        <NavLinkUniversal to={`/admin/camp-management/${seasonData?.id}`} label="إدارة المعسكر" className="bg-main-color text-white rounded px-3 py-1" />
      </div>
      <div className="container">
        <div className="flex gap-4 mb-2 border-b pb-2">
          <button onClick={() => setActiveTab("settings")} disabled={isSubmitting} className={`px-4 py-2 font-semibold transition ${activeTab === "settings" ? "bg-main-color text-white rounded" : "border border-second-color rounded hover:bg-gray-50"}`}>الإعدادات</button>
          <button onClick={() => setActiveTab("form")} disabled={isSubmitting || !seasonData} className={`px-4 py-2 font-semibold transition ${activeTab === "form" ? "bg-main-color text-white rounded" : "border border-second-color rounded hover:bg-gray-50"} ${!seasonData ? "opacity-50 cursor-not-allowed" : ""}`}>تصميم النموذج</button>
        </div>

        {activeTab === "settings" && (
          <>
            <p className="text-2xl font-bold mb-4">املأ الإعدادات أولاً للانتقال لتصميم النموذج :</p>
            <NewSeasonSettings onSubmit={handleSettingsSubmit} />
          </>
        )}

        {activeTab === "form" && seasonData && (
          <FormBuilder onSubmit={handleFormConfigSubmit} isSubmitting={isSubmitting} initialFields={formFields} onFieldsChange={handleFormFieldsChange} seasonData={seasonData} />
        )}
      </div>
    </div>
  );
};

export default CreateSeasonPage;