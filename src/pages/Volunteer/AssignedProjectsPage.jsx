import React, { useState } from 'react'
import { BsFillPersonLinesFill } from "react-icons/bs";
import { MdOutlinePersonSearch } from "react-icons/md";
import { RiFilePaper2Line } from "react-icons/ri";
import CategoryFilterBar from "../../components/CategoryFilterBar"
import ConsultationRequestCard from "../../components/ConsultationRequestCard";
import AssignedProjectsCard from '../../components/AssignedProjectsCard';
import NavLinkUniversal from '../../components/NavLinkUniversal';
import {showError, showSuccess} from '../../Utils/toast';

import { 
  useGetVolunteerAssignedDataQuery 
} from '../../api/endpoints/assignedProjectsApi';

const AssignedProjectsPage = () => {

  const categories = [ 
    { id: "tracking", label: "متابعة مستمرة", icon: <BsFillPersonLinesFill /> },
    { id: "consultations", label: "طلبات الاستشارة", icon: <MdOutlinePersonSearch /> },
    { id: "assigned", label: "مشاريع تم الانضمام لها", icon: <RiFilePaper2Line /> },
  ]

  const [selected, setSelected] = useState("tracking")

  // تحويل نوع المساعدة للعربي
  const formatHelpType = (helpType) => {
    switch (helpType) {
      case "ONE_TIME":
        return "استشارة لمرة واحدة";

      case "ONGOING":
        return "متابعة دورية";

      default:
        return helpType;
    }
  };

  // API
  const { data, isLoading, error } =
    useGetVolunteerAssignedDataQuery();

  if (isLoading) {
    return (
      <div className="text-center py-20 text-gray-500">
        جاري تحميل البيانات...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        حدث خطأ أثناء تحميل البيانات
      </div>
    );
  }

  const trackingRequests = data?.ongoing || [];
  const consultationRequests = data?.consultations || [];
  const projects = data?.joined_projects || [];

  return (
    <div className='bg-white-color min-h-screen p-4 md:p-8'>
      <div className="container mx-auto">

        <div className="w-full overflow-x-auto no-scrollbar">
          <CategoryFilterBar 
            categories={categories}
            selected={selected}
            onSelect={setSelected}
            className="bg-white-color"
          />
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:flex-wrap md:justify-between items-center md:items-start gap-6">
          
          {/* المتابعة المستمرة */}
          {selected === "tracking" && (
            trackingRequests.length > 0 ? (
              trackingRequests.map(req => (
                <ConsultationRequestCard 
                  key={req.idea_id} 
                  request={{
                    ...req,
                    help_type: formatHelpType(req.help_type),
                  }}
                  mode="followup"
                />
              ))
            ) : (
              <div className='mx-auto my-10 text-center text-gray-500'>
                لا توجد طلبات متابعة مستمرة.
              </div>
            )
          )}

          {/* الاستشارات المقبولة */}
          {selected === "consultations" && (
            consultationRequests.length > 0 ? (
              consultationRequests.map(req => (
                <ConsultationRequestCard 
                  key={req.idea_id} 
                  request={{
                    ...req,
                    help_type: formatHelpType(req.help_type),
                  }}
                  mode="followup"
                />
              ))
            ) : (
              <div className='mx-auto my-10 text-center text-gray-500'>
                لا توجد طلبات استشارة.
              </div>
            )
          )}

          {/* المشاريع المنضم لها */}
          {selected === "assigned" && (
            projects.length > 0 ? (
              <div className="w-full flex flex-col gap-6">

                <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                  {projects.map(project => (
                    <AssignedProjectsCard 
                      key={project.idea_id} 
                      project={project} 
                    />
                  ))}
                </div>

                <div className="flex justify-center md:justify-start">
                  <NavLinkUniversal 
                    label="انتقل لمراحل الاحتضان" 
                    to="/incubationinfo" 
                    className='bg-main-color w-fit text-white rounded-xl px-6 py-3 font-bold mt-6 block'
                  />
                </div>

              </div>
            ) : (
              <div className='mx-auto my-30 text-center'>
                <p className='text-2xl font-bold text-gray-700'>
                  لا يوجد مشاريع تم الانضمام لها.
                </p>
              </div>
            )
          )}

        </div>
      </div>
    </div>
  )
}

export default AssignedProjectsPage;