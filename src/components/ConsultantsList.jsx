import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConsultationRequestBtn from "./ConsultationRequestBtn";
import Button from "./Button";
import RequestDetailsModal from "./RequestDetailsModal"; 
import avatarDefault from "../assets/images/avatar.jpg"; 

const ConsultantsList = ({ consultants, role = "user" }) => {
  const navigate = useNavigate();
  const [modalConfig, setModalConfig] = useState({ isOpen: false, data: null });

  const handleDetails = (c) => {
    if (c.type === "user_request") {
      setModalConfig({ isOpen: true, data: c });
    } else {
      navigate(`/admin/details/${c.id}?type=${c.type}`);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 mt-6">
      {consultants.map((c) => (
        <div key={c.id} className="flex items-center gap-4 p-1 md:p-4 border border-second-color shadow rounded-xl">
         
          <img src={c.avatar || avatarDefault} className="w-20 h-20 rounded-full" alt={c.full_name} />

          <div className="flex-1">

            <p className="font-bold">{c.full_name || c.name}</p>
            {c.primary_skills && <p className="font-bold">{c.primary_skills}</p>}
            
            {/* عرض مصفوفة المواعيد كما هي قادمة من الباكيند */}
            {c.availability && c.availability.map((slot, index) => (
              <div key={index} className="text-sm">
                {slot.day}: من {slot.start_time} إلى {slot.end_time}
              </div>
            ))}
          </div>

          {role === "admin" ? (
            <Button
              label="عرض التفاصيل"
              className="bg-main-color"
              onClick={() => handleDetails(c)}
            />
          ) : (
            <ConsultationRequestBtn consultant={c} />
          )}
        </div>
      ))}

      {/* استدعاء المودال المنفصل */}
      <RequestDetailsModal 
        isOpen={modalConfig.isOpen} 
        data={modalConfig.data} 
        onClose={() => setModalConfig({ isOpen: false, data: null })} 
      />
    </div>
  );
};

export default ConsultantsList;