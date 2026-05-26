 import React, { useState } from 'react';
import { BsFillPersonLinesFill } from "react-icons/bs";
import { MdOutlinePersonSearch } from "react-icons/md";
import { RiFilePaper2Line } from "react-icons/ri";
import CategoryFilterBar from "../../components/CategoryFilterBar";
import ConsultationRequestCard from "../../components/ConsultationRequestCard";
import AssignedProjectsCard from '../../components/AssignedProjectsCard';
import NavLinkUniversal from '../../components/NavLinkUniversal';
// import {showError, showSuccess} from '../../Utils/toast';
// import { useGetVolunteerAssignedDataQuery } from '../../api/endpoints/assignedProjectsApi';
//import { useHandleConsultationDecisionMutation } from '../../api/endpoints/approvalApi';
const AssignedProjectsPage = () => {

  const categories = [ 
    { id: "tracking", label: "متابعة مستمرة", icon: <BsFillPersonLinesFill /> },
    { id: "consultations", label: "طلبات الاستشارة", icon: <MdOutlinePersonSearch /> },
    { id: "assigned", label: "مشاريع تم الانضمام لها", icon: <RiFilePaper2Line /> },
  ];

  const [selected, setSelected] = useState("tracking");

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> df2da58e9d26fe04ba2613780d1d33bd4d047551
  const mockData = {
    ongoing: [
      {
        idea_id: 2,
        requester_name: "مايا المحمد",
        requester_email: "maya123@gmail.com",
        required_skill: "UI UX",
        idea_title: "Green Panda",
        help_type: "متابعة دورية",
        description: "شرح الطلب...",
      }
    ],
    consultations: [
      {
        idea_id: 1,
        requester_name: "مايا المحمد",
        requester_email: "maya123@gmail.com",
        required_skill: "UI UX",
        idea_title: "باسم المشروع",
        help_type: "استشارة لمرة واحدة",
        description: "شرح الطلب...",
<<<<<<< HEAD
>>>>>>> 3ae368bb075bfe26a446874e75110bf49b240936
=======
>>>>>>> df2da58e9d26fe04ba2613780d1d33bd4d047551
      }
    ],
    joined_projects: [
      {
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
        id: 1,
        name: "مايا المحمد",
        email: "maya123@gmail.com",
        projectTitle: "Green Panda"
      }
    ]
  }

  /*
  const { data: apiData, isLoading, error } = useGetVolunteerAssignedDataQuery();
  if (isLoading) return <div className="text-center py-20 text-gray-500">جاري تحميل البيانات...</div>;
  if (error) return <div className="text-center py-20 text-red-500">حدث خطأ أثناء تحميل البيانات</div>;
  */
// const [submitDecision] = useHandleConsultationDecisionMutation();

=======
        id: 1,
        name: "مايا المحمد",
        email: "maya123@gmail.com",
        projectTitle: "Green Panda"
      }
    ]
  }

  /*
  const { data: apiData, isLoading, error } = useGetVolunteerAssignedDataQuery();
  if (isLoading) return <div className="text-center py-20 text-gray-500">جاري تحميل البيانات...</div>;
  if (error) return <div className="text-center py-20 text-red-500">حدث خطأ أثناء تحميل البيانات</div>;
  */
// const [submitDecision] = useHandleConsultationDecisionMutation();

>>>>>>> df2da58e9d26fe04ba2613780d1d33bd4d047551
// const handleApprove = async (id) => {
//   try {
//     await submitDecision({ id, action: "approve" }).unwrap();
//     // showSuccess("تمت الموافقة بنجاح");
//   } catch (err) {
//     // showError(err?.data?.message || "حدث خطأ أثناء الموافقة");
//   }
// };

// const handleReject = async (id) => {
//   try {

//     await submitDecision({ id, action: "reject", reason: "عدم تفرغ" }).unwrap(); 
//   } catch (err) {
//     console.error(err);
//   }
// };

  const dataSource = mockData; // apiData عند الربط الحقيقي

  const trackingRequests = dataSource?.ongoing || [];
  const consultationRequests = dataSource?.consultations || [];
  const projects = dataSource?.joined_projects || [];

  return (
    <div className='bg-white-color min-h-screen p-4 md:p-8'>
<<<<<<< HEAD
>>>>>>> 3ae368bb075bfe26a446874e75110bf49b240936
=======
>>>>>>> df2da58e9d26fe04ba2613780d1d33bd4d047551
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
          
<<<<<<< HEAD
<<<<<<< HEAD
          {/* التعديل 2: قسم المتابعة المستمرة يقرأ مباشرة من مصفوفة ongoing بدون فلترة فرعية */}
          {selected === "tracking" && (
            data.ongoing && data.ongoing.length > 0 ? (
              data.ongoing.map(req => (
                <ConsultationRequestCard 
                  key={req.idea_id} // استخدام idea_id بدلاً من id
=======
=======
>>>>>>> df2da58e9d26fe04ba2613780d1d33bd4d047551
          {/* 1. قسم المتابعة المستمرة */}
          {selected === "tracking" && (
            trackingRequests.length > 0 ? (
              trackingRequests.map(req => (
                <ConsultationRequestCard 
                  key={req.idea_id || req.id} 
<<<<<<< HEAD
>>>>>>> 3ae368bb075bfe26a446874e75110bf49b240936
=======
>>>>>>> df2da58e9d26fe04ba2613780d1d33bd4d047551
                  request={req}
                  mode="followup"
                />
              ))
            ) : (
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> df2da58e9d26fe04ba2613780d1d33bd4d047551
              <div className='mx-auto my-10 text-center text-gray-500'>لا توجد طلبات متابعة مستمرة.</div>
            )
          )}

          {/* 2. قسم طلبات الاستشارة لمرة واحدة */}
          {selected === "consultations" && (
            consultationRequests.length > 0 ? (
              consultationRequests.map(req => (
                <ConsultationRequestCard 
                  key={req.idea_id || req.id} 
                  request={req}
                  mode="request"
                  onApprove={(id) => console.log("Approve", id) // handleApprove(id)
                  }
                  onReject={(id) => console.log("Reject", id) // handleReject(id)
                  }
                />
              ))
            ) : (
              <div className='mx-auto my-10 text-center text-gray-500'>لا توجد طلبات استشارة.</div>
            )
          )}

          {/* 3. قسم المشاريع التي تم الانضمام لها */}
          {selected === "assigned" && (
            projects.length > 0 ? (
              <div className="w-full flex flex-col gap-6">
                <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                  {projects.map(project => (
                    <AssignedProjectsCard key={project.id} project={project} />
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
                <p className='text-2xl font-bold text-gray-700'>لا يوجد مشاريع تم الانضمام لها.</p>
<<<<<<< HEAD
>>>>>>> 3ae368bb075bfe26a446874e75110bf49b240936
=======
>>>>>>> df2da58e9d26fe04ba2613780d1d33bd4d047551
              </div>
            )
          )}

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> df2da58e9d26fe04ba2613780d1d33bd4d047551
        </div>
      </div>
    </div>
  )
}
>>>>>>> 3ae368bb075bfe26a446874e75110bf49b240936

export default AssignedProjectsPage;