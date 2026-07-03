import React, {
  useState,
} from "react";

import {
  FaHandHoldingHeart,
} from "react-icons/fa";

import {
  BsFillFolderFill,
  BsFillPersonFill,
} from "react-icons/bs";

import StatsCards from "../../components/Admin_Dashboard/StatsCards";
import ProjectsChart from "../../components/Admin_Dashboard/Charts/ProjectsChart";
import QuickAccess from "../../components/Admin_Dashboard/QuickAccess";
import AdminNavbar from "../../components/AdminNavbar";
import Modal from "../../components/Modal";
import Select from "../../components/Select";
import Button from "../../components/Button";
import Input from "../../components/Input";

import {
  useGetDashboardStatsQuery,
  useGetDashboardProjectsChartQuery,
  useSendBroadcastNotificationMutation,
} from "../../api/endpoints/admin/adminDashboardApi";
import { useSelector } from "react-redux";
const AdminMainPage =
  () => {
    const [open, setOpen] =
      useState(false);

    // =====================================
    // API
    // =====================================
    const [target, setTarget] = useState("ALL");
    const [message, setMessage] = useState("");

    const [sendNotification, { isLoading }] =
  useSendBroadcastNotificationMutation();
    const {
      data:
        statsData,
     
    } =
      useGetDashboardStatsQuery();

    const {
      data:
        chartData =
          [],
     
    } =
      useGetDashboardProjectsChartQuery();

    // =====================================
    // Stats Cards
    // =====================================

    const stats = [
      {
        label:
          "المشاريع المتخرجة",

        value:
          statsData?.graduated_projects ||
          0,

        icon: (
          <BsFillFolderFill className="text-blue-400" />
        ),
      },

      {
        label:
          "عدد المتطوعين",

        value:
          statsData?.volunteers_count ||
          0,

        icon: (
          <FaHandHoldingHeart className="text-purple-400" />
        ),
      },

      {
        label:
          "المتقدمين للموسم الحالي",

        value:
          statsData?.submitted_projects ||
          0,

        icon: (
          <BsFillPersonFill className="text-orange-400" />
        ),
      },

      {
        label:
          "المشاريع المحتضنة",

        value:
          statsData?.incubated_projects ||
          0,

        icon: (
          <BsFillFolderFill className="text-green-500" />
        ),
      },
    ];
    const userRoles = useSelector((state) => state.auth?.roles || []);

  const isSecretary = userRoles.some(
    (role) => String(role).toLowerCase().trim() === "secretary"
  );

    // =====================================
    // Chart Data
    // =====================================

    const chart =
      chartData?.map(
        (
          item,
          index
        ) => ({
          year:
            item.year?.toString(),

          value:
            item.graduated_projects ||
            0,

          color:
            index ===
            chartData.length -
              1
              ? "#19E45E"
              : "#9FF3C0",
        })
      ) || [];
    const handleSendNotification = async () => {
  if (!message.trim()) {
    alert("الرجاء إدخال محتوى الإشعار");
    return;
  }

  try {
    const res = await sendNotification({
  target,
  message,
}).unwrap();

    alert(res.message);

    setOpen(false);
    setTarget("ALL");
    setMessage("");
  } catch (err) {
    console.error(err);
    alert("فشل إرسال الإشعار");
  }
};
    return (
      <div className="bg-white-color min-h-screen">
        <AdminNavbar
          BtnLabel="إرسال إشعار"
          onBtnClick={() =>
            setOpen(true)
          }
        />

        {/* Modal */}
        <Modal
          isOpen={open}
          onClose={() =>
            setOpen(false)
          }
          title=""
          className="h-80 py-10"
          footer={
  <Button
    label={isLoading ? "جاري الإرسال..." : "إرسال"}
    className="bg-main-color ml-2"
    onClick={handleSendNotification}
    disabled={isLoading}
  />
}
        >
          <form className="flex flex-col gap-4">
            <Select
  label="اختيار المستلمين"
  value={target}
  onChange={(e) => setTarget(e.target.value)}
  options={[
    {
      value: "ALL",
      label: "الكل",
    },
    {
      value: "VOLUNTEERS",
      label: "المتطوعين",
    },
    {
      value: "INCUBATORS",
      label: "المحتضنين",
    },
    {
      value: "EVALUATORS",
      label: "لجنة التقييم",
    },
  ]}
/>

            <Input
  label="محتوى الإشعار"
  type="text"
  placeholder="محتوى الإشعار"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
/>
          </form>
        </Modal>

        <div className="container mt-30">
          {/* العنوان */}
          <h1 className="text-3xl font-bold mb-4">
            لوحة التحكم الرئيسية
          </h1>

          {/* Stats */}
          <StatsCards
            showIcons={
              true
            }
            stats={
              stats
            }
          />

          {/* Chart فقط */}
          <div className="mt-6 flex justify-center">
            <ProjectsChart
              data={
                chart
              }
            />
          </div>

          {/* Quick Access */}
          {!isSecretary && (
            <div className="mt-6">
              <QuickAccess />
            </div>
          )}
        </div>
      </div>
    );
  };

export default AdminMainPage;