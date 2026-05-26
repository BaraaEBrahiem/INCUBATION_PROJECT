import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { showSuccess, showError } from "../../Utils/toast";

import {
  useGetEvaluationNotesQuery,
  useSubmitGraduationDecisionMutation,
} from "../../api/endpoints/admin/graduationApi";

const LatestReviewPage = () => {
  const navigate = useNavigate();
  const { idea_id } = useParams();

  const {
    data: apiData,
    isLoading: isNotesLoading,
  } = useGetEvaluationNotesQuery(idea_id, {
    skip: !idea_id,
  });

  const [
    submitGraduation,
    { isLoading: isSubmitting },
  ] = useSubmitGraduationDecisionMutation();

  const dataSource = apiData;

  const meetingDate = dataSource?.meeting_date || "";
  const reviewersList = dataSource?.reviews || [];

  const isActionLoading = isSubmitting;

  // ✅ أهم تعديل: نحمي الحالة من undefined ونوحدها
  const projectStatus =
    dataSource?.project_status ||
    dataSource?.status ||
    "";

  // ❌ نخفي الأزرار فقط إذا تخريج سلبي
  const hideActions =
    projectStatus === "GRADUATED_NEGATIVE";

  const handleGraduation = async (action) => {
    if (isActionLoading) return;

    try {
      await submitGraduation({
        evaluationId: idea_id,
        status: action,
      }).unwrap();

      showSuccess(
        action === "positive"
          ? "تم تخريج المشروع بشكل إيجابي"
          : "تم تخريج المشروع بشكل سلبي"
      );

      navigate("/projectspage", {
        state: {
          graduationStatus: action,
        },
      });
    } catch (err) {
      showError(
        err?.data?.message ||
          "حدث خطأ أثناء حفظ القرار"
      );
    }
  };

  if (isNotesLoading) {
    return (
      <p className="text-center mt-10">
        جاري تحميل الملاحظات...
      </p>
    );
  }

  return (
    <div className="bg-[#f9f9f9] min-h-screen p-6 md:p-10 dir-rtl text-right">
      <div className="container mx-auto">

        {/* العنوان */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold text-gray-900">
            تاريخ التقييم {meetingDate}
          </h1>
        </div>

        {/* المراجعات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviewersList.map((reviewer) => (
            <div
              key={reviewer.mentor_id}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex gap-4 mb-4">
                <img
                  src={
                    reviewer.avatar ||
                    "https://via.placeholder.com/150"
                  }
                  className="w-16 h-16 rounded-full"
                  alt=""
                />

                <div>
                  <h3 className="font-bold">
                    {reviewer.mentor_name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {reviewer.specialization}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm">
                  {reviewer.notes}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ الأزرار تختفي فقط إذا تخريج سلبي */}
        {!hideActions && (
          <div className="flex justify-center gap-6 max-w-2xl mx-auto">

            <button
              onClick={() =>
                handleGraduation("positive")
              }
              disabled={isActionLoading}
              className="flex-1 bg-[#3b597c] text-white py-3 rounded-xl"
            >
              تخريج إيجابي
            </button>

            <button
              onClick={() =>
                handleGraduation("negative")
              }
              disabled={isActionLoading}
              className="flex-1 bg-red-600 text-white py-3 rounded-xl"
            >
              تخريج سلبي
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

export default LatestReviewPage;