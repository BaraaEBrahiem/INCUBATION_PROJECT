import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConsultationRequestBtn from "./ConsultationRequestBtn";
import Button from "./Button";
import RequestDetailsModal from "./RequestDetailsModal"; 
import avatarDefault from "../assets/images/avatar.jpg"; 
const DAY_TRANSLATIONS = {
  MONDAY: "الاثنين",
  TUESDAY: "الثلاثاء",
  WEDNESDAY: "الأربعاء",
  THURSDAY: "الخميس",
  FRIDAY: "الجمعة",
  SATURDAY: "السبت",
  SUNDAY: "الأحد",
};
const ConsultantsList = ({ 
  consultants, 
  role = "user", 
  selectedVolunteers = [], 
  onToggleSelect 
}) => {
  const navigate = useNavigate();
  const [modalConfig, setModalConfig] = useState({ isOpen: false, data: null });

  const handleDetails = (e, c) => {
    e.stopPropagation();
    if (c.type === "user_request") {
      setModalConfig({ isOpen: true, data: c });
    } else {
      navigate(`/admin/details/${c.id}?type=${c.type}`);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 mt-6">
      {consultants.map((c) => {
        const isSelected = selectedVolunteers.includes(c.id);
        const isSelectable = typeof onToggleSelect === "function";

        return (
          <div 
            key={c.id} 
            onClick={() => isSelectable && onToggleSelect(c.id)}
            className={`flex items-center gap-4 p-1 md:p-4 border shadow rounded-xl transition-all ${
              isSelectable ? "cursor-pointer" : ""
            } ${
              isSelected 
                ? "border-emerald-500 bg-emerald-50/30 ring-1 ring-emerald-500" 
                : "border-second-color bg-white"
            }`}
          >
            {isSelectable && (
              <div className="ps-2">
                <input
                  type="checkbox"
                  checked={isSelected}
                  readOnly
                  className="w-4 h-4 accent-emerald-600 cursor-pointer"
                />
              </div>
            )}

            <img src={c.avatar || avatarDefault} className="w-20 h-20 rounded-full object-cover" alt={c.full_name || c.name} />

            <div className="flex-1">
              <p className="font-bold text-xl">{c.full_name || c.name}</p>
              {c.primary_skills && <p className="text-xl font-semibold text-gray-600">{c.primary_skills}</p>}
              
              {c.availability?.map((slot, index) => (
  <div key={index} className="text-lg text-gray-500">
    {DAY_TRANSLATIONS[slot.day] || slot.day}
    : من {slot.start_time || slot.from}
    {" "}إلى{" "}
    {slot.end_time || slot.to}
  </div>
))}
            </div>

            {role === "admin" || role === "secretary" ? (
              <Button
                label="عرض التفاصيل"
                className="bg-main-color text-xl"
                onClick={(e) => handleDetails(e, c)}
              />
            )
            : (
              <ConsultationRequestBtn consultant={c} />
            )}
          </div>
        );
      })}

      <RequestDetailsModal 
        isOpen={modalConfig.isOpen} 
        data={modalConfig.data} 
        onClose={() => setModalConfig({ isOpen: false, data: null })} 
      />
    </div>
  );
};

export default ConsultantsList;