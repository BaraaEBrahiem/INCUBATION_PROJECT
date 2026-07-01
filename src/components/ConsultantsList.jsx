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
            className={`flex flex-col sm:flex-row items-center gap-4 p-3 md:p-4 border shadow rounded-xl transition-all ${
              isSelectable ? "cursor-pointer" : ""
            } ${
              isSelected 
                ? "border-emerald-500 bg-emerald-50/30 ring-1 ring-emerald-500" 
                : "border-second-color bg-white"
            }`}
          >
            {isSelectable && (
              <div className="w-full sm:w-auto flex justify-start sm:block">
                <input
                  type="checkbox"
                  checked={isSelected}
                  readOnly
                  className="w-5 h-5 accent-emerald-600 cursor-pointer"
                />
              </div>
            )}

            <img 
              src={c.avatar || avatarDefault} 
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover" 
              alt={c.full_name || c.name} 
            />

            <div className="flex-1 text-center sm:text-right w-full">
              <p className="font-bold text-lg md:text-xl">{c.full_name || c.name}</p>
              {c.primary_skills && <p className="text-base md:text-xl font-semibold text-gray-600">{c.primary_skills}</p>}
              
              <div className="mt-2 text-sm md:text-lg text-gray-500">
                {c.availability?.map((slot, index) => (
                  <div key={index}>
                    {DAY_TRANSLATIONS[slot.day] || slot.day}
                    {" : "}
                    {slot.start_time || slot.from} - {slot.end_time || slot.to}
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full sm:w-auto mt-2 sm:mt-0">
              {role === "admin" ? (
                <Button
                  label="عرض التفاصيل"
                  className="bg-main-color text-base md:text-xl w-full sm:w-auto"
                  onClick={(e) => handleDetails(e, c)}
                />
              ) : (
                <div className="w-full sm:w-auto">
                  <ConsultationRequestBtn consultant={c} />
                </div>
              )}
            </div>
          </div>
        );
      })}

      <RequestDetailsModal 
        isOpen={modalConfig.isOpen} 
        data={modalConfig.data} 
        onClose={() => setModalConfig({ isOpen: false, data: null })} 
      />
    </div>
  );}
export default ConsultantsList;