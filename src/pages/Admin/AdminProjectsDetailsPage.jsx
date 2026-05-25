import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InfoRow from '../../components/InfoRow';
import Button from '../../components/Button';
// import { useGetAdminProjectDetailsQuery } from '../../api/endpoints/admin/adminProjectsApi';

const AdminProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // const { data: apiProjectData, isLoading, error } = useGetAdminProjectDetailsQuery(id);

  const fallbackProjectData = {
    project_title: "عنوان الفكرة (منصة الشراكة الرقمية)",
    editor_name: "user",
    product_type: null, 
    owner_name: "user",
    phone: null,
    specialization: null,
    email: "user@test.com",
    idea_title: "عنوان الفكرة المتكاملة",
    target_audience: "students",
    description: "وصف الفكرة بالتفصيل وكيفية عملها",
    problem: null,
    team_members: [
      { name: "admin@test.com", email: "user1@test.com" }
    ]
  };

 
  const project = /* apiProjectData || */ fallbackProjectData;

  // if (isLoading) return <div className="text-center mt-10">جاري تحميل تفاصيل المشروع...</div>;
  // if (error) return <div className="text-center mt-10 text-red-500">حدث خطأ أثناء جلب البيانات</div>;

  return (
    <div className="min-h-screen bg-white-color p-4 dir-rtl text-right">
      <div className="container mx-auto">
        
        {/* الهيدر: يحتوي على العنوان وزر عرض الملاحظات والتخريج الخاص بالأدمن */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b pb-4">
          <div>
            <h1 className="text-second-color text-xl md:text-2xl font-bold mb-2">لوحة الأدمن - تفاصيل المشروع</h1>
            <p className="text-gray-500 text-sm">إدارة وتخريج المشاريع المحتضنة</p>
          </div>

          <Button 
            label="عرض الملاحظات والتخريج"
            onClick={() => navigate(`/admin/latest-review/${id || 1}`)} 
            className="bg-main-color hover:bg-second-color text-white px-6 py-2.5 font-bold rounded-xl shadow-md transition-all self-stretch md:self-auto text-center"
          />
        </div>

        {/* القسم الأول: معلومات عامة عن المنتج */}
        <div className="bg-white p-8 rounded-sm shadow-md border border-gray-100 mb-4">
          <InfoRow label="اسم المشروع :">{project.project_title || "غير محدد"}</InfoRow>
          <InfoRow label="مسؤول التعديل :">{project.editor_name || "غير محدد"}</InfoRow>
          <InfoRow label="نوع المنتج :">{project.product_type || "لا يوجد منتج محدد حالياً"}</InfoRow>
        </div>

        {/* القسم الثاني: معلومات شخصية وقيادية */}
        <div className="bg-white p-8 rounded-sm shadow-md border border-gray-100 mb-4">
          <h2 className="text-lg font-bold text-black mb-4 border-b border-second-color pb-2">1. معلومات شخصية وقيادية</h2>
          <InfoRow label="الاسم :">{project.owner_name || "غير محدد"}</InfoRow>
          <InfoRow label="رقم الهاتف :">{project.phone || "غير متوفر"}</InfoRow>
          <InfoRow label="الاختصاص :">{project.specialization || "غير محدد"}</InfoRow>
          <InfoRow label="البريد الإلكتروني :">
            <span className="break-all">{project.email}</span>
          </InfoRow>
        </div>

        {/* القسم الثالث: معلومات عن الفكرة والجمهور المستهدف */}
        <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 mb-4">
          <h2 className="text-lg font-bold text-black mb-4 border-b border-second-color pb-2">2. معلومات عن الفكرة</h2>
          <InfoRow label="عنوان الفكرة :">{project.idea_title || "غير محدد"}</InfoRow>
          <InfoRow label="القطاع المستهدف :">{project.target_audience || "غير محدد"}</InfoRow>
          <InfoRow label="وصف الفكرة :">{project.description || "لا يوجد وصف متوفر"}</InfoRow>
          <InfoRow label="المشكلة التي يحلها :">{project.problem || "لم يتم تحديد المشكلة بعد"}</InfoRow>
        </div>

        {/* القسم الرابع والأخير: أعضاء الفريق (جديد حسب الـ API المرفوع) */}
        <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-black mb-4 border-b border-second-color pb-2">3. أعضاء الفريق المساهمين</h2>
          <div className="mt-4 space-y-3">
            {project.team_members && project.team_members.length > 0 ? (
              project.team_members.map((member, index) => (
                <div key={index} className="flex flex-col md:flex-row justify-between bg-gray-50 p-3 rounded border border-gray-100 text-sm">
                  <p className="font-medium text-gray-800"><span className="text-gray-500">الاسم / المعرّف:</span> {member.name}</p>
                  <p className="text-main-color font-mono"><span className="text-gray-500">البريد:</span> {member.email}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">لا يوجد أعضاء فريق مسجلين في هذا المشروع.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminProjectDetailsPage;