import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';
import PageTabs from '../../components/Admin_Dashboard/PageTabs';
import ExhibitionSchedule from "../../components/Admin_Dashboard/Exhibition-management/ExhibitionSchedule"
import FormBuilder from '../../components/Admin_Dashboard/Exhibition-management/FormBuilder';
import CardRequests from '../../components/Admin_Dashboard/Exhibition-management/CardRequests';
import ExhibitionRecord from '../../components/Admin_Dashboard/Exhibition-management/ExhibitionRecord';
const ExhibitionManagementPage = () => {
    const navigate = useNavigate();
    const[activeTab, setActiveTab]= useState("schedule");

    const tabs = [
    { id: "schedule", label: "إدارة حدث المعرض" },
    { id: "create-card", label: "إنشاء إطار بطاقة" },
    { id: "requests", label: "طلبات البطاقات" },
    { id: "records", label: "سجل المعارض" },
  ];

    const createSeason = () => {
    navigate("/admin/create-season");
  };
  return (
    <div>
    <AdminNavbar
    BtnLabel={"إضافة موسم"}
    onBtnClick={createSeason}
    />
    <div className="container p-6 mt-20">

        {/* التبويبات */}
        <PageTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <div className='mt-6'>
            {activeTab === "schedule" &&(
            <ExhibitionSchedule />
            )}

            {activeTab === "create-card" &&(
            <FormBuilder />
            )}

            {activeTab === "requests" &&(
                <CardRequests/>
            
            )}

            {activeTab === "records" &&(
                <ExhibitionRecord/>
            )

            }


        </div>

    </div>


    </div>
  )
}

export default ExhibitionManagementPage