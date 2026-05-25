 import React, { useState } from 'react';
import { BsFillPersonLinesFill } from "react-icons/bs";
import { MdOutlinePersonSearch } from "react-icons/md";
import { RiFilePaper2Line } from "react-icons/ri";
import CategoryFilterBar from "../../components/CategoryFilterBar";
import ConsultationRequestCard from "../../components/ConsultationRequestCard";
import AssignedProjectsCard from '../../components/AssignedProjectsCard';
import NavLinkUniversal from '../../components/NavLinkUniversal';

const AssignedProjectsPage = () => {

  const categories = [ 
    { id: "tracking", label: "متابعة مستمرة", icon: <BsFillPersonLinesFill /> },
    { id: "consultations", label: "طلبات الاستشارة", icon: <MdOutlinePersonSearch /> },
    { id: "assigned", label: "مشاريع تم الانضمام لها", icon: <RiFilePaper2Line /> },
  ];

  const [selected, setSelected] = useState("tracking");

  // التعديل 1: هيكلة البيانات الثابتة لتطابق الـ Response الحقيقي من الباك إند بالظبط
  const apiResponseMock = {
    consultations: [
      // يمكنك وضع بيانات تجريبية هنا لطلبات الاستشارة إذا رغبت
    ],
    ongoing: [
      {
        idea_id: 1,
        idea_title: "منصة لادارة المشاريع الريادية",
        description: "test",
        requester_name: "alaa ali",
        requester_email: "alaa@gmail.com",
        required_skill: "frontend",
        help_type: "ONGOING",
        conversation_id: 2
      }
    ],
    joined_projects: [
      {
        idea_id: 1,
        idea_title: "منصة لادارة المشاريع الريادية",
        owner_name: "alaa ali",
        owner_email: "alaa@gmail.com"
      }
    ]
  };

  // استخدام البيانات المطابقة للـ API
  const data = apiResponseMock;

  return (
    <div className='bg-white-color min-h-screen p-4 md:p-8' dir="rtl">
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
          
          {/* التعديل 2: قسم المتابعة المستمرة يقرأ مباشرة من مصفوفة ongoing بدون فلترة فرعية */}
          {selected === "tracking" && (
            data.ongoing && data.ongoing.length > 0 ? (
              data.ongoing.map(req => (
                <ConsultationRequestCard 
                  key={req.idea_id} // استخدام idea_id بدلاً من id
                  request={req}
                  mode="followup"
                />
              ))
            ) : (
              <div className='mx-auto my-10'>
                <p className='text-xl font-bold text-gray-500'>لا يوجد مشاريع متابعة مستمرة حالياً.</p>
              </div>
            )
          )}

          {/* التعديل 3: قسم طلبات الاستشارة يقرأ مباشرة من مصفوفة consultations */}
          {selected === "consultations" && (
            data.consultations && data.consultations.length > 0 ? (
              data.consultations.map(req => (
                <ConsultationRequestCard 
                  key={req.idea_id} // استخدام idea_id بدلاً من id
                  request={req}
                  mode="request"
                  onApprove={(id) => console.log("Approve", id)}
                  onReject={(id) => console.log("Reject", id)}
                />
              ))
            ) : (
              <div className='mx-auto my-10'>
                <p className='text-xl font-bold text-gray-500'>لا يوجد طلبات استشارة حالياً.</p>
              </div>
            )
          )}

          {/* التعديل 4: قسم المشاريع التي تم الانضمام لها يقرأ من joined_projects مع تعديل مسميات الكرت لتناسب الباك */}
          {selected === "assigned" && (
            data.joined_projects && data.joined_projects.length > 0 ? (
 <>
                {data.joined_projects.map(project => {
                  // تحويل المسميات داخلياً لتتوافق مع ما يتوقعه كرت AssignedProjectsCard القديم عندك دون تعديله
                  const adaptedProject = {
                    id: project.idea_id,
                    name: project.owner_name,
                    email: project.owner_email,
                    projectTitle: project.idea_title
                  };
                  return (
                    <AssignedProjectsCard key={project.idea_id} project={adaptedProject} />
                  );
                })}
                <NavLinkUniversal 
                  label="انتقل لمراحل الاحتضان" 
                  to="/incubationinfo" 
                  className='bg-main-color w-fit text-white rounded-xl px-6 py-3 font-bold mt-10 md:mt-0'
                />
              </>
            ) : (
              <div className='mx-auto my-30'>
                <p className='text-2xl font-bold'>لا يوجد مشاريع تم الانضمام لها.</p>
              </div>
            )
          )}
          
        </div>
      </div>
    </div>
  );
};

export default AssignedProjectsPage;