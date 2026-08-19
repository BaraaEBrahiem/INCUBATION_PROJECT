import { useState } from "react";
import { useParams } from "react-router-dom"; 
import { showError, showSuccess, showInfo } from "../../Utils/toast";
import CategoryFilterBar from "../../components/CategoryFilterBar";
import ConsultantsList from "../../components/ConsultantsList";
import { 
  useGetAvailableVolunteersQuery,
  useAssignSuggestedVolunteersMutation, 
} from "../../api/endpoints/admin/volunteersOptionsApi.js";

const SelectingVolunteerPage = () => {
  const { teamRequestId } = useParams();
  const [selected, setSelected] = useState("all");
  const [selectedVolunteers, setSelectedVolunteers] = useState([]);

  const { data: suggestedVolunteers, isLoading, error } = useGetAvailableVolunteersQuery();
  const [assignSuggestedVolunteers, { isLoading: isAssigning }] = useAssignSuggestedVolunteersMutation();

  const categories = [
    { id: "all", label: "الكل" },
    { id: "uiux", label: "UI UX" },
    { id: "frontend", label: "FrontEnd" },
    { id: "backend", label: "BackEnd" },
    { id: "legal", label: "Legal" },
    { id: "marketing", label: "Marketing" },
    { id: "business", label: "Business" },
  ];

  const volunteersList = suggestedVolunteers || [];

  const filteredData = volunteersList.filter((volunteer) => {
    if (selected === "all") return true;
    
    const skill = volunteer.primary_skills?.toLowerCase() || "";
    if (selected === "uiux") return skill.includes("ui") || skill.includes("ux");
    if (selected === "frontend") return skill.includes("front");
    if (selected === "backend") return skill.includes("back");
    if (selected === "legal") return skill.includes("legal");
    if (selected === "marketing") return skill.includes("marketing");
    if (selected === "business") return skill.includes("business");
    return true;
  });

  const handleToggleSelect = (volunteerId) => {
    setSelectedVolunteers((prev) =>
      prev.includes(volunteerId)
        ? prev.filter((id) => id !== volunteerId)
        : [...prev, volunteerId]
    );
  };

  const handleSendProposal = async () => {
    if (selectedVolunteers.length === 0) {
      showInfo("يرجى تحديد متطوع واحد على الأقل قبل تقديم الاقتراح");
      return;
    }

    try {
      await assignSuggestedVolunteers({
        team_request_id: teamRequestId,
        volunteer_ids: selectedVolunteers
      }).unwrap();

      showSuccess("تم إرسال اقتراح المتطوعين بنجاح");
      setSelectedVolunteers([]);
    } catch (err) {
  console.error("Suggest volunteers error:", err);

  const errorMessage =
    err?.data?.error ||
    err?.data?.detail ||
    err?.data?.message ||
    "حدث خطأ أثناء إرسال الاقتراح";

  showError(errorMessage);

}
  };

  if (isLoading) {
    return (
      <div className="text-center mt-20 font-bold">
        جاري تحميل المتطوعين المتاحين...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500 font-bold">
        حدث خطأ أثناء جلب المتطوعين.
      </div>
    );
  }

  return (
    <div className="container p-6 relative" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">تحديد المتطوعين</h2>
        
        <button
          onClick={handleSendProposal}
          disabled={isAssigning || selectedVolunteers.length === 0}
          className={`px-6 py-2 rounded-lg text-white font-semibold transition-all ${
            selectedVolunteers.length === 0 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-main-color hover:bg-opacity-90 shadow-md"
          }`}
        >
          {isAssigning ? "جاري الإرسال..." : "اقتراح"}
        </button>
      </div>
      
      <CategoryFilterBar
        categories={categories}
        selected={selected}
        onSelect={setSelected}
        className="bg-white-color"
      />

      {filteredData.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          لا توجد بيانات لتبويب {categories.find(c => c.id === selected)?.label} حالياً.
        </div>
      ) : (
        <ConsultantsList 
          consultants={filteredData} 
          role="admin" 
          selectedVolunteers={selectedVolunteers}
          onToggleSelect={handleToggleSelect}
        />
      )}
    </div>
  );
};

export default SelectingVolunteerPage;