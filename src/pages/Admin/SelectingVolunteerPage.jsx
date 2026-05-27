import { useState } from "react";
// import { useParams } from "react-router-dom"; 
import CategoryFilterBar from "../../components/CategoryFilterBar";
import ConsultantsList from "../../components/ConsultantsList";
// import { useGetSuggestedVolunteersQuery } from "../../api/endpoints/admin/volunteersOptionsApi.js";

const SelectingVolunteerPage = () => {

//   const { teamRequestId } = useParams();

  const categories = [
    { id: "all", label: "الكل" },
    { id: "uiux", label: "UI UX" },
    { id: "frontend", label: "FrontEnd" },
    { id: "backend", label: "BackEnd" }
  ];

  const [selected, setSelected] = useState("all");

  // const { data: suggestedVolunteers, isLoading, error } = useGetSuggestedVolunteersQuery(teamRequestId);

  const allData = [
    {
      id: 1, 
      full_name: "أحمد علي",
      primary_skills: "UI UX",
      avatar: "/src/assets/images/avatar.jpg",
      type: "all", 
      availability: [{ day: "كل الأيام", start_time: "2:00pm", end_time: "4:00pm" }]
    },
    {
      id: 2, 
      full_name: "خالد يوسف",
      primary_skills: "FrontEnd",
      avatar: "/src/assets/images/avatar.jpg",
      type: "all",
      availability: [{ day: "كل الأيام", start_time: "2:00pm", end_time: "4:00pm" }]
    },
    {
      id: 3, 
      full_name: "سارة أحمد",
      primary_skills: "FrontEnd",
      avatar: "/src/assets/images/avatar.jpg",
      type: "all",
      availability: [{ day: "كل الأيام", start_time: "2:00pm", end_time: "4:00pm" }]
    },
    {
      id: 4, 
      full_name: "ايه العبود",
      primary_skills: "BackEnd",
      avatar: "/src/assets/images/avatar.jpg",
      type: "all", 
      availability: [{ day: "كل الأيام", start_time: "2:00pm", end_time: "4:00pm" }]
    },
  ];

  const uiuxData = [
    {
      id: 1,
      full_name: "أحمد علي",
      primary_skills: "UI UX",
      avatar: "/src/assets/images/avatar.jpg",
      type: "all",
      availability: [{ day: "كل الأيام", start_time: "2:00pm", end_time: "4:00pm" }]
    },
  ];

  const frontData = [
    {
      id: 2,
      full_name: "خالد يوسف",
      primary_skills: "FrontEnd",
      avatar: "/src/assets/images/avatar.jpg",
      type: "all",
      availability: [{ day: "كل الأيام", start_time: "2:00pm", end_time: "4:00pm" }]
    },
    {
      id: 3,
      full_name: "سارة أحمد",
      primary_skills: "FrontEnd",
      avatar: "/src/assets/images/avatar.jpg",
      type: "all",
      availability: [{ day: "كل الأيام", start_time: "2:00pm", end_time: "4:00pm" }]
    },
  ];
  
  const backData = [
    {
      id: 4,
      full_name: "ايه العبود",
      primary_skills: "BackEnd",
      avatar: "/src/assets/images/avatar.jpg",
      type: "all", 
      availability: [{ day: "كل الأيام", start_time: "2:00pm", end_time: "4:00pm" }]
    },
  ];

  let currentData = [];

  switch (selected) {
    case "all":
      currentData = allData; // عند الربط ستكون: currentData = suggestedVolunteers || [];
      break;
    case "uiux":
      currentData = uiuxData; 
      break;
    case "frontend":
      currentData = frontData;
      break;
    case "backend":
      currentData = backData;
      break;
    default:
      currentData = [];
  }

  /*
  if (isLoading) return <div className="text-center mt-20 font-bold">جاري تحميل المتطوعين المقترحين لهذا الطلب...</div>;
  if (error) return <div className="text-center mt-20 text-red-500 font-bold">حدث خطأ أثناء جلب المتطوعين المقترحين.</div>;
  */

  return (
    <div className="container p-6" dir="rtl">
      <h2 className="text-3xl font-bold mb-6">تحديد المتطوعين</h2>
      
      <CategoryFilterBar
        categories={categories}
        selected={selected}
        onSelect={setSelected}
        className="bg-white-color"
      />

      {currentData.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          لا توجد بيانات لتبويب {categories.find(c => c.id === selected)?.label} حالياً.
        </div>
      ) : (
        <ConsultantsList consultants={currentData} role="admin" />
      )}
    </div>
  );
};

export default SelectingVolunteerPage;