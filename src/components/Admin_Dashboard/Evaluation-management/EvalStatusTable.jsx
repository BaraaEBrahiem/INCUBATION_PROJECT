import React, { useState } from "react";
import DataTable from "../DataTable";
import Checkbox from "../../CheckBox";
import Select from "../../Select";
import Modal from "../../Modal";
import Input from "../../Input";
import EvaluatorsModal from "./EvaluatorsModal";
import { showSuccess, showError } from "../../../Utils/toast";

import {
  useGetProjectsWithMeetingsQuery,
  useGetEvaluatorsForMeetingQuery,
  useSetMeetingDateMutation,
} from "../../../api/endpoints/evaluationApi";

export default function EvalStatusTable() {
  const {
    data: projectsData,
    isLoading,
    error,
    refetch,
  } = useGetProjectsWithMeetingsQuery();

  const [setMeetingDate] = useSetMeetingDateMutation();

  const [sel, setSel] = useState([]);
  const [action, setAction] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const [modals, setModals] = useState({
    evals: false,
    schedule: false,
    data: [],
  });

  const [schedule, setSchedule] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // جلب المقيمين للمشروع المحدد
  const {
    data: assignedEvaluators = [],
  } = useGetEvaluatorsForMeetingQuery(selectedProjectId, {
    skip: !selectedProjectId,
  });

  // معالجة response
  let projectsList = Array.isArray(projectsData)
    ? projectsData
    : [];

  if (
    projectsData?.results &&
    Array.isArray(projectsData.results)
  ) {
    projectsList = projectsData.results;
  }

  if (
    projectsData?.data &&
    Array.isArray(projectsData.data)
  ) {
    projectsList = projectsData.data;
  }

  const toggle = (id) => {
    setSel((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const openEvaluators = (projectId) => {
    setSelectedProjectId(projectId);

    setModals((prev) => ({
      ...prev,
      evals: true,
      data: assignedEvaluators || [],
    }));
  };

  const handleAction = (e) => {
    const actionValue = e.target.value;

    if (actionValue === "all") {
      setSel(projectsList.map((p) => p.id));
    }

    if (actionValue === "none") {
      setSel([]);
    }
  };

  const openScheduleModal = (project) => {
    setSelectedProject(project);
    setSchedule(project.meeting_date || "");

    setModals((prev) => ({
      ...prev,
      schedule: true,
    }));
  };

  const handleSetMeeting = async () => {
    if (!schedule) {
      showError("الرجاء تحديد تاريخ ووقت اللجنة");
      return;
    }

    setIsSubmitting(true);

    try {
      await setMeetingDate({
        idea_id: selectedProject.id,
        meetingDate: schedule,
      }).unwrap();

      showSuccess(
        `تم تعيين موعد التقييم للمشروع "${selectedProject.title}" بنجاح`
      );

      setModals((prev) => ({
        ...prev,
        schedule: false,
      }));

      setSelectedProject(null);
      setSchedule(null);
    } catch (error) {
        console.log("FULL ERROR:", error);
        console.log("ERROR DATA:", error?.data);
        console.log(
          "MEETING DATE SENT:",
        schedule
        );

      showError(
        JSON.stringify(error?.data) ||
          "حدث خطأ في تعيين الموعد"
        );
      
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = [
    {
      key: "actions",
      label: "الإجراءات",
      render: (row) => (
        <Checkbox
          checked={sel.includes(row.id)}
          onChange={() => toggle(row.id)}
        />
      ),
    },
    {
      key: "meeting_action",
      label: "تعيين موعد",
      render: (row) => (
        <button
          onClick={() =>
            openScheduleModal(row)
          }
          className="bg-main-color text-white px-3 py-1 rounded-md text-sm hover:bg-[#1e3356] transition"
        >
          {row.meeting_date &&
          row.meeting_date !== " " 
            ? "تعديل الموعد"
            : "تعيين موعد"}
        </button>
      ),
    },
    {
      key: "meeting_date",
      label: "موعد التقييم",
      render: (row) => {
      const meetingDate = row.meeting_date;

    // إذا ما في موعد أو القيمة فارغة
      if (
        !meetingDate ||
        meetingDate === "null" ||
        meetingDate === ""
      ) {
        return (
          <span className="text-sm text-gray-500">
          لم يتم التحديد
          </span>
        );
      }

      const date = new Date(meetingDate);

    // إذا التاريخ غير صالح
      if (isNaN(date.getTime())) {
        return (
          <span className="text-sm text-gray-500">
          لم يتم التحديد
          </span>
        );
      }

      return (
        <span className="text-sm">
          {date.toLocaleString("ar-SA")}
        </span>
      );
    },
  },
    {
      key: "sector",
      label: "القطاع",
    },
    {
      key: "target_audience",
      label: "الفئة",
    },
    {
      key: "evaluators",
      label: "المقيمون",
      render: (row) => (
        <span
          className="text-blue-600 underline cursor-pointer hover:text-blue-800"
          onClick={() =>
            openEvaluators(row.id)
          }
        >
          عرض
        </span>
      ),
    },
    {
      key: "title",
      label: "اسم المشروع",
      render: (row) => (
        <span className="font-bold text-right block">
          {row.title}
        </span>
      ),
    },
  ];

  // Loading
  if (isLoading) {
    return (
      <div className="p-4 text-center">
        جاري تحميل المشاريع...
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500 mb-3">
          حدث خطأ في تحميل البيانات
        </p>

        <button
          onClick={refetch}
          className="bg-main-color text-white px-4 py-2 rounded"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="w-60 mb-4">
        <Select
          label="إجراء"
          placeholder="اختر إجراء"
          value={action}
          onChange={(e) => {
            setAction(e.target.value);
            handleAction(e);
          }}
          options={[
            {
              value: "all",
              label: "تحديد الكل",
            },
            {
              value: "none",
              label: "إلغاء التحديد",
            },
          ]}
        />
      </div>

      <div className="mt-4">
        {projectsList.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            لا توجد مشاريع متاحة للتقييم
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={projectsList}
          />
        )}
      </div>

      <EvaluatorsModal
        isOpen={modals.evals}
        onClose={() =>
          setModals((prev) => ({
            ...prev,
            evals: false,
          }))
        }
        evaluators={modals.data}
      />

      <Modal
        isOpen={modals.schedule}
        onClose={() => {
          setModals((prev) => ({
            ...prev,
            schedule: false,
          }));

          setSelectedProject(null);
          setSchedule(null);
        }}
        title={`تعيين موعد التقييم - ${
          selectedProject?.title || ""
        }`}
        footer={
          <button
            onClick={handleSetMeeting}
            disabled={isSubmitting}
            className="bg-main-color text-white px-6 py-2 rounded-md hover:bg-[#1e3356] disabled:opacity-50"
          >
            {isSubmitting
              ? "جاري التعيين..."
              : "تأكيد"}
          </button>
        }
      >
        <Input
          label="تاريخ ووقت اللجنة"
          type="datetime-local"
          onChange={(e) =>
            setSchedule(e.target.value)
          }
          value={schedule || ""}
        />

        <p className="text-sm text-gray-500 text-right mt-2">
          سيتم إرسال إشعار للمستخدم بتعيين الموعد
        </p>
      </Modal>
    </div>
  );
}