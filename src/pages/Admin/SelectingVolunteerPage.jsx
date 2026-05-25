// SelectingVolunteerPage.jsx
import { useState } from "react";
import CategoryFilterBar from "../../components/CategoryFilterBar";
import ConsultantsList from "../../components/ConsultantsList";

const SelectingVolunteerPage = () => {
  const categories = [
    { id: "all", label: "الكل" },
    { id: "uiux", label: "UI UX" },
    { id: "frontend", label: "FrontEnd" },
    { id: "backend", label: "BackEnd" }
  ];

  const [selected, setSelected] = useState("all");

  // استخدمنا الـ IDs (1 و 2) لأن حالتهم بالماب الأصلي عندك هي VOLUNTEER
  // والـ type حطيناه "all" أو نوع عادي لحتى يروح على الـ Route الافتراضي الشغال
  const allData = [
    {
      id: 1, // رانيا الأحمد (حالتها VOLUNTEER بالصفحة التانية يعني رح يظهر زر طلب التقييم)
      name: "أحمد علي",
      specialty: "UI UX",
      activeTime: "2:00pm إلى 4:00pm",
      image: "/src/assets/images/avatar.jpg",
      type: "all", 
    },
    {
      id: 2, // محمد علي (حالته VOLUNTEER بالصفحة التانية)
      name: "خالد يوسف",
      specialty: "FrontEnd",
      activeTime: "2:00pm إلى 4:00pm",
      image: "/src/assets/images/avatar.jpg",
      type: "all",
    },
    {
      id: 1, 
      name: "سارة أحمد",
      specialty: "FrontEnd",
      activeTime: "2:00pm إلى 4:00pm",
      image: "/src/assets/images/avatar.jpg",
      type: "all",
    },
    {
      id: 2, 
      name: "ايه العبود",
      specialty: "BackEnd",
      activeTime: "2:00pm إلى 4:00pm",
      image: "/src/assets/images/avatar.jpg",
      type: "all", 
    },
  ];

  const uiuxData = [
    {
      id: 1,
      name: "أحمد علي",
      specialty: "UI UX",
      activeTime: "2:00pm إلى 4:00pm",
      image: "/src/assets/images/avatar.jpg",
      type: "all",
    },
  ];

  const frontData = [
    {
      id: 2,
      name: "خالد يوسف",
      specialty: "FrontEnd",
      activeTime: "2:00pm إلى 4:00pm",
      image: "/src/assets/images/avatar.jpg",
      type: "all",
    },
    {
      id: 1,
      name: "سارة أحمد",
      specialty: "FrontEnd",
      activeTime: "2:00pm إلى 4:00pm",
      image: "/src/assets/images/avatar.jpg",
      type: "all",
    },
  ];
  
  const backData = [
    {
      id: 2,
      name: "ايه العبود",
      specialty: "BackEnd",
      activeTime: "2:00pm إلى 4:00pm",
      image: "/src/assets/images/avatar.jpg",
      type: "all", 
    },
  ];

  let currentData = [];

  switch (selected) {
    case "all":
      currentData = allData;
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

  return (
    <div className="container p-6">
      <h2 className="text-3xl font-bold mb-6">تحديد المتطوعين</h2>
      <CategoryFilterBar
        categories={categories}
        selected={selected}
        onSelect={setSelected}
        className="bg-white-color"
      />

      {currentData.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          لا توجد {selected === "volunteers" ? "الكل" : selected === "uiux" ? "UI UX": selected === "frontend"? "FrontEnd" : "backend"} حالياً
        </div>
      ) : (
        <ConsultantsList consultants={currentData} role="admin" />
      )}
    </div>
  );
};

export default SelectingVolunteerPage;