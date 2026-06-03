import React, { useState } from "react";
import StatsCards from "../../components/Admin_Dashboard/StatsCards";
import ProjectsChart from "../../components/Admin_Dashboard/Charts/ProjectsChart";
import QuickAccess from "../../components/Admin_Dashboard/QuickAccess";
import AdminNavbar from "../../components/AdminNavbar";
import Modal from "../../components/Modal";
import Select from "../../components/Select";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { FaHandHoldingHeart } from "react-icons/fa";
import { BsFillFolderFill, BsFillPersonFill } from "react-icons/bs";

const AdminMainPage = () => {
  const [open, setOpen] = useState(false);

  // ---------------------------------------------------------
  // 1) لاحقاً: جلب إحصائيات لوحة التحكم من API
  // const { data: statsData, isLoading: statsLoading } = useGetDashboardStatsQuery();
  //
  // fallback قبل الربط:
  const fallbackStats = [
    { label: "المشاريع المنجزة", value: 32, icon: "🏆" },
    { label: "عدد المتطوعين", value: 32, icon: <FaHandHoldingHeart className="text-purple-400" /> },
    { label: "المتقدمين للموسم الحالي", value: 32, icon: <BsFillPersonFill className="text-orange-400" /> },
    { label: "المشاريع المنجزة", value: 32, icon: <BsFillFolderFill className="text-blue-400" /> },
  ];
  // const stats = statsData || fallbackStats;
  const stats = fallbackStats;
  // ---------------------------------------------------------

  // ---------------------------------------------------------
  //  2) لاحقاً: جلب بيانات الرسم البياني من API
  // const { data: chartData } = useGetDashboardProjectsChartQuery();
  //
  // fallback قبل الربط:
  const fallbackChart = null; // ProjectsChart لديه fallback داخلي
  const chart = fallbackChart;
  // ---------------------------------------------------------

  // ---------------------------------------------------------
  // 3) لاحقاً: جلب النشاط الأخير من API
  // const { data: activityData } = useGetDashboardRecentActivityQuery();
  //
  // ---------------------------------------------------------
  // 4) لاحقاً: إرسال إشعار عبر API
  // const [sendNotification] = useSendNotificationMutation();
  //
  // const handleSendNotification = async () => {
  //   await sendNotification({
  //     target: selectedGroup,
  //     message: notificationMessage,
  //   });
  // };
  // ---------------------------------------------------------

  return (
    <div className="bg-white-color h-screen">

      <AdminNavbar 
        BtnLabel="إرسال إشعار"
        onBtnClick={() => setOpen(true)}
      />

      {/* Modal إرسال إشعار */}
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title=""
        className="h-80 py-10"
        footer={<Button label="إرسال" className="bg-main-color ml-2" />}
      >
        <form className="flex flex-col gap-4">
          <Select
            label="اختيار المستلمين"
            options={[
              { value: "الكل", label: "الكل" },
              { value: "المتطوعين", label: "المتطوعين" },
              { value: "المحتضنين", label: "المحتضنين" },
              { value: "لجنة التقييم", label: "لجنة التقييم" },
            ]}
          />
          <Input label="محتوى الإشعار" type="text" placeholder="محتوى الإشعار" />
        </form>
      </Modal>

      <div className="container mt-30">

        {/* العنوان */}
        <h1 className="text-3xl font-bold mb-4">لوحة التحكم الرئيسية</h1>

        <StatsCards showIcons={true} stats={stats} />

        <div className="flex justify-center items-center gap-4 mt-4 w-full">

          <ProjectsChart data={chart} />

        </div>

        <QuickAccess />

      </div>
    </div>
  );
};

export default AdminMainPage;
