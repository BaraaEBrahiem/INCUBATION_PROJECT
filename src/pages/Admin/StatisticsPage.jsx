
import React, {
  useMemo,
  useState,
} from "react";

import AdminNavbar from "../../components/AdminNavbar";
import Modal from "../../components/Modal";
import Select from "../../components/Select";
import Button from "../../components/Button";
import Input from "../../components/Input";

import StatsCards from "../../components/Admin_Dashboard/StatsCards";
import SectorAnalysisChart from "../../components/Admin_Dashboard/Charts/SectorAnalysisChart";
import ProjectLifecycleChart from "../../components/Admin_Dashboard/Charts/ProjectLifecycleChart";
import ExpertiseFieldsChart from "../../components/Admin_Dashboard/Charts/ExpertiseFieldsChart";
import IncubationSeasonsChart from "../../components/Admin_Dashboard/Charts/IncubationSeasonsChart";

import {
  useGetStatisticsStatsQuery,
  useGetSectorAnalysisQuery,
  useGetProjectLifecycleQuery,
  useGetExpertiseFieldsQuery,
  useGetIncubationSeasonsQuery,
} from "../../api/endpoints/admin/statisticsApi";

const StatisticsPage = () => {

  const [open, setOpen] =
    useState(false);

  const [
    selectedYear,
    setSelectedYear,
  ] = useState("");

  // ==========================================
  // API
  // ==========================================

  const {
    data: currentSeasonData,
    isLoading:
      currentSeasonLoading,
  } =
    useGetStatisticsStatsQuery();

  const {
    data:
      sectorData = [],
    isLoading:
      sectorLoading,
  } =
    useGetSectorAnalysisQuery();

  const {
    data:
      lifecycleData = [],
    isLoading:
      lifecycleLoading,
  } =
    useGetProjectLifecycleQuery();

  const {
    data:
      expertiseData,
    isLoading:
      expertiseLoading,
  } =
    useGetExpertiseFieldsQuery();

  const {
    data:
      seasonsData = [],
    isLoading:
      seasonsLoading,
  } =
    useGetIncubationSeasonsQuery();

  console.log(
    "seasonsData",
    seasonsData
  );
  console.log(
    "sectorData",
    sectorData
  );
  console.log(
    "lifecycleData",
    lifecycleData
  );
  console.log(
    "expertiseData",
    expertiseData
  );
  console.log(
    "currentSeasonData",
    currentSeasonData
  );

  // ==========================================
  // السنوات
  // ==========================================

  const availableYears =
    useMemo(() => {
      if (
        !seasonsData ||
        !Array.isArray(
          seasonsData
        )
      ) {
        return [];
      }

      const years =
        seasonsData.map(
          (item) =>
            item.year
        );

      return [
        ...new Set(years),
      ].sort();
    }, [seasonsData]);

  const activeYear =
    selectedYear ||
    availableYears[
      availableYears.length -
        1
    ];

  const yearOptions =
    availableYears.map(
      (year) => ({
        value: year,
        label:
          year.toString(),
      })
    );

  // ==========================================
  // فلترة البيانات حسب السنة
  // ==========================================

  const sector =
    sectorData.find(
      (item) =>
        item.year ===
        Number(
          activeYear
        )
    ) || null;

  const lifecycle =
  lifecycleData.find(
    (item) =>
      item.year === Number(activeYear)
  ) ?? lifecycleData[0] ?? null;

  const seasons =
    seasonsData || [];

  const expertise =
    expertiseData ||
    null;

  // ============================
  // التعديل المطلوب فقط
  // ============================

  const selectedSeasonStats =
    currentSeasonData?.find(
      (item) =>
        item.year ===
        Number(
          activeYear
        )
    ) || {};

  // ==========================================
  // Stats Cards
  // ==========================================

  const stats = [
    {
      label:
        "عدد ساعات التطوع",
      value:
        selectedSeasonStats.volunteer_hours ??
        0,
    },

    {
      label:
        "إجمالي المشاريع",
      value:
        selectedSeasonStats.total_projects ??
        0,
    },

    {
      label:
        "مشاريع متخرجة",
      value:
        selectedSeasonStats.graduated_projects ??
        0,
    },

    {
      label:
        "مشاريع محتضنة",
      value:
        selectedSeasonStats.incubated_projects ??
        0,
    },
  ];

  const isLoading =
    currentSeasonLoading ||
    sectorLoading ||
    lifecycleLoading ||
    expertiseLoading ||
    seasonsLoading;

  return (
    <div>
      <AdminNavbar
        BtnLabel="إرسال إشعار"
        onBtnClick={() =>
          setOpen(true)
        }
      />

      {/* مودال الإشعارات */}
      <Modal
        isOpen={open}
        onClose={() =>
          setOpen(false)
        }
        title=""
        className="h-80 py-10"
        footer={
          <Button
            label="إرسال"
            className="bg-main-color ml-2"
          />
        }
      >
        <form className="flex flex-col gap-4">
          <Select
            label="اختيار المستلمين"
            options={[
              {
                value:
                  "ALL",
                label:
                  "الكل",
              },
              {
                value:
                  "VOLUNTEERS",
                label:
                  "المتطوعين",
              },
              {
                value:
                  "INCUBATORS",
                label:
                  "المحتضنين",
              },
              {
                value:
                  "EVALUATORS",
                label:
                  "لجنة التقييم",
              },
            ]}
          />

          <Input
            label="محتوى الإشعار"
            type="text"
            placeholder="محتوى الإشعار"
          />
        </form>
      </Modal>

      <div className="container mt-30">
        {/* الهيدر */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            واجهة الاحصائيات
            التفصيلية
          </h1>

          <div className="w-44">
            <Select
              value={
                activeYear ||
                ""
              }
              onChange={(
                e
              ) =>
                setSelectedYear(
                  e.target
                    .value
                )
              }
              options={
                yearOptions
              }
              placeholder="اختر السنة"
            />
          </div>
        </div>

        {/* تحميل */}
        {isLoading ? (
          <div className="text-center py-20 text-gray-500">
            جاري تحميل
            الإحصائيات...
          </div>
        ) : (
          <>
            {/* الكروت */}
            <StatsCards
              showIcons={
                false
              }
              stats={
                stats
              }
            />

            {/* الصف الأول */}
            <div className="flex justify-between items-start gap-6 my-6">
              <ProjectLifecycleChart
                data={
                  lifecycle
                }
              />

              <SectorAnalysisChart
                data={
                  sector
                }
              />
            </div>

            {/* الصف الثاني */}
            <div className="flex justify-between items-start gap-6 mb-6">
              <IncubationSeasonsChart
                data={
                  seasons
                }
              />

              <ExpertiseFieldsChart
                data={
                  expertise
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StatisticsPage;
