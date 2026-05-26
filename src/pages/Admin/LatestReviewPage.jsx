import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

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

  const [submitGraduation, { isLoading: isSubmitting }] =
    useSubmitGraduationDecisionMutation();

  // بيانات مؤقتة إذا ما في API
  const fallback = {
    meeting_date: "12/4/2026",
    graduation_status: null,
    reviewers: [
      {
        mentor_id: 1,
        mentor_name: "رانيا الأحمد",
        specialization: "uiux",
        avatar: "",
        notes:
          "تكتب هنا ملاحظات المقيم أحمد\nتكتب هنا ملاحظات المقيم أحمد",
      },
      {
        mentor_id: 2,
        mentor_name: "رانيا الأحمد",
        specialization: "uiux",
        avatar: "",
        notes:
          "تكتب هنا ملاحظات المقيم أحمد\nتكتب هنا ملاحظات المقيم أحمد",
      },
    ],
  };

  // API أو fallback
  const dataSource = apiData || fallback;

  const meetingDate = dataSource?.meeting_date || "";
  const reviewersList = dataSource?.reviewers || [];
  const currentStatus = dataSource?.graduation_status;

  // حالة المشروع
  const projectStatus =
    dataSource?.project_status ||
    dataSource?.status ||
    "";

  // إخفاء الأزرار إذا المشروع متخرج سلبي
  const hideActions =
    projectStatus === "GRADUATED_NEGATIVE";

  const handleGraduation = async (action) => {
    if (isSubmitting) return;

    try {
      await submitGraduation({
        evaluationId: idea_id,
        status: action,
      }).unwrap();

      showSuccess("تم حفظ قرار التخريج بنجاح");

      navigate("/admin/graduated-projects");
    } catch (error) {
      console.error(error);
      showError("فشل حفظ القرار");
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

        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              تاريخ التقييم {meetingDate}
            </h1>

            {currentStatus && (
              <p
                className={`text-sm font-bold mt-1 ${
                  currentStatus === "positive"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                حالة المشروع: تم التخريج بشكل{" "}
                {currentStatus === "positive"
                  ? "إيجابي"
                  : "سلبي"}{" "}
                مسبقاً.
              </p>
            )}
          </div>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition"
          >
            <IoMdArrowBack className="text-xl" />
          </button>
        </div>

        {/* الملاحظات */}
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

              {/* الملاحظات */}
              <div className="w-full text-right bg-gray-50/50 p-3 rounded-lg">
                <h4 className="text-sm font-bold text-gray-700 mb-2">
                  الملاحظات :
                </h4>

                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {reviewer.notes}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* أزرار التخريج */}
        {!currentStatus && !hideActions ? (
          <div className="flex justify-center items-center gap-6 mt-6 max-w-2xl mx-auto">

            {/* إيجابي */}
            <button
              onClick={() =>
                handleGraduation("positive")
              }
              disabled={isSubmitting}
              className={`flex-1 text-white font-bold py-3 px-6 rounded-xl transition-all shadow text-center ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#3b597c] hover:bg-[#2d4460]"
              }`}
            >
              {isSubmitting
                ? "جاري الحفظ..."
                : "تخريج إيجابي"}
            </button>

            {/* سلبي */}
            <button
              onClick={() =>
                handleGraduation("negative")
              }
              disabled={isSubmitting}
              className={`flex-1 text-white font-bold py-3 px-6 rounded-xl transition-all shadow text-center ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#de0f0f] hover:bg-[#b80c0c]"
              }`}
            >
              {isSubmitting
                ? "جاري الحفظ..."
                : "تخريج سلبي"}
            </button>

          </div>
        ) : (
          <div className="text-center py-4 bg-gray-100 text-gray-500 rounded-xl max-w-2xl mx-auto font-medium border border-dashed">
            تم إغلاق طلب التقييم واعتماد قرار التخريج النهائي لهذا المشروع.
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestReviewPage;