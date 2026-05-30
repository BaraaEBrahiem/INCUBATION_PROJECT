import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/Admin_Dashboard/DataTable";
import Button from "../../components/Button";
import Select from "../../components/Select";
import AdminNavbar from "../../components/AdminNavbar";

import { useGetWorkshopsQuery } from "../../api/endpoints/workshopsApi";

const WorkshopsTablePage = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] =
    useState("");

  const {
    data: workshopsFromApi,
    isLoading,
    error,
    refetch,
  } = useGetWorkshopsQuery();

  const fallbackData = [
    {
      id: 1,
      title: "تدريب ذكاء اصطناعي",
      start_date: "12/4/2025",
      volunteer_name:
        "أحمد الحسن",
      status: "مقبول",
    },
    {
      id: 2,
      title:
        "تدريب تطوير برمجيات",
      start_date: "15/4/2025",
      volunteer_name:
        "سارة خالد",
      status: "مرفوض",
    },
    {
      id: 3,
      title:
        "تدريب قيادة فرق",
      start_date: "20/4/2025",
      volunteer_name:
        "محمد علي",
      status:
        "بانتظار الموافقة",
    },
    {
      id: 4,
      title:
        "تدريب تسويق رقمي",
      start_date: "25/4/2025",
      volunteer_name:
        "نورا حسن",
      status: "مقبول",
    },
  ];

  let workshopsList =
    Array.isArray(
      workshopsFromApi
    )
      ? workshopsFromApi
      : fallbackData;

  if (
    workshopsFromApi?.results &&
    Array.isArray(
      workshopsFromApi.results
    )
  ) {
    workshopsList =
      workshopsFromApi.results;
  }

  if (
    workshopsFromApi?.data &&
    Array.isArray(
      workshopsFromApi.data
    )
  ) {
    workshopsList =
      workshopsFromApi.data;
  }

  const filtered =
    workshopsList.filter(
      (w) =>
        statusFilter === ""
          ? true
          : w.status ===
            statusFilter
    );

  const columns = [
    {
      key: "actions",
      label: "الإجراءات",
      render: (row) => (
        <Button
          label="عرض التفاصيل"
          className="bg-main-color text-white px-3 py-1"
          onClick={() =>
            navigate(
              `/workshops/${row.id}`
            )
          }
        />
      ),
    },

    {
      key: "status",
      label:
        "الحالة الحالية",
      render: (row) => {
        const color =
          row.status ===
          "مقبول"
            ? "text-green-600"
            : row.status ===
              "مرفوض"
            ? "text-red-600"
            : "text-yellow-600";

        return (
          <span
            className={`font-semibold ${color}`}
          >
            {row.status}
          </span>
        );
      },
    },

    {
      key: "start_date",
      label:
        "تاريخ البدء",
    },

    {
      key:
        "volunteer_name",
      label:
        "اسم المتطوع",
    },

    {
      key: "title",
      label:
        "عنوان الدورة",
    },
  ];

  const createSeason =
    () => {
      navigate(
        "/admin/create-season"
      );
    };

  if (isLoading) {
    return (
      <>
        <AdminNavbar
          BtnLabel="إضافة موسم"
          onBtnClick={
            createSeason
          }
        />

        <div className="container mt-30 text-center py-10">
          جاري التحميل...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <AdminNavbar
          BtnLabel="إضافة موسم"
          onBtnClick={
            createSeason
          }
        />

        <div className="container mt-30 text-center py-10">
          <p className="text-red-500 mb-3">
            حدث خطأ في تحميل
            الورشات
          </p>

          <button
            onClick={refetch}
            className="bg-main-color text-white px-4 py-2 rounded"
          >
            إعادة المحاولة
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar
        BtnLabel="إضافة موسم"
        onBtnClick={
          createSeason
        }
      />

      <div className="container mt-30">
        <h2 className="text-xl font-bold mb-4">
          الورشات التدريبية
        </h2>

        <div className="w-60 mb-4">
          <Select
            label="حالة الورشة"
            value={
              statusFilter
            }
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            placeholder="الكل"
            options={[
              {
                value: "",
                label:
                  "الكل",
              },
              {
                value:
                  "مقبول",
                label:
                  "مقبول",
              },
              {
                value:
                  "مرفوض",
                label:
                  "مرفوض",
              },
              {
                value:
                  "بانتظار الموافقة",
                label:
                  "بانتظار الموافقة",
              },
            ]}
          />
        </div>

        {filtered.length ===
        0 ? (
          <div className="text-center py-10 text-gray-500">
            لا توجد ورشات
            تدريبية
          </div>
        ) : (
          <DataTable
            columns={
              columns
            }
            data={
              filtered
            }
          />
        )}
      </div>
    </>
  );
};

export default WorkshopsTablePage;