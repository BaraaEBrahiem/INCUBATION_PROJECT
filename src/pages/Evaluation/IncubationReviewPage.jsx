import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Textarea from "../../components/Textarea";
import Button from "../../components/Button";
import {
  showInfo,
  showSuccess,
  showError,
} from "../../Utils/toast";
import {
  useGetIncubationReviewsQuery,
  useCreateIncubationReviewMutation,
} from "../../api/endpoints/evaluationApi";

const IncubationReviewPage = () => {
  const { idea_id } = useParams();

  const [notes, setNotes] = useState("");
  const [progressScore, setProgressScore] = useState("");

  const {
    data: reviews = [],
    isLoading,
    error,
    refetch,
  } = useGetIncubationReviewsQuery(idea_id);

  const [createReview, { isLoading: isSending }] =
    useCreateIncubationReviewMutation();

  const handleSubmit = async () => {
    if (!notes.trim()) {
      showInfo("الرجاء إدخال الملاحظات");
      return;
    }

    if (
      progressScore === "" ||
      Number(progressScore) < 0 ||
      Number(progressScore) > 100
    ) {
      showInfo("نسبة الإنجاز يجب أن تكون بين 0 و 100");
      return;
    }

    try {
      await createReview({
        idea_id,
        progress_score: Number(progressScore),
        notes,
      }).unwrap();

      showSuccess("تم إرسال المراجعة بنجاح");

      setNotes("");
      setProgressScore("");
    } catch (err) {
      console.error(err);
      showError(err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white-color p-4 md:p-15">
        <p className="text-center">جاري تحميل المراجعات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white-color p-4 md:p-15">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            حدث خطأ أثناء تحميل البيانات
          </p>

          <button
            onClick={refetch}
            className="bg-main-color text-white px-4 py-2 rounded"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white-color p-4 md:p-15 flex flex-col">
      <div className="container mx-auto">

        <h2 className="text-second-color text-2xl font-bold  text-right">
          مراجعة الاحتضان
        </h2>

        <div className="mb-12">

          <label className="block text-black font-semibold mb-3 text-lg text-right">
            الملاحظات
          </label>

          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="mb-6 w-full md:w-200"
            placeholder="اكتب ملاحظاتك هنا..."
          />

          <label className="block text-black font-semibold mb-3 text-lg text-right">
            نسبة الإنجاز (%)
          </label>

          <input
            type="number"
            min="0"
            max="100"
            value={progressScore}
            onChange={(e) => setProgressScore(e.target.value)}
            placeholder="مثال: 65"
            className="border border-second-color rounded-md p-2 w-32 text-center"
          />

          <div className="mt-6 flex justify-start">
            <Button
              label={isSending ? "جاري الإرسال..." : "إرسال"}
              onClick={handleSubmit}
              disabled={isSending}
              className="bg-main-color"
            />
          </div>

        </div>

        <div className="w-full md:w-200 bg-white shadow-md rounded-lg overflow-hidden">

          <h3 className="text-black text-lg font-bold p-5 text-right border-b border-second-color">
            المراجعات السابقة
          </h3>

          <div className="space-y-4 p-4">

            {reviews.length === 0 ? (
              <p className="text-center text-gray-500 py-6">
                لا توجد مراجعات سابقة
              </p>
            ) : (
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-gray-50 rounded-lg p-4 shadow-sm"
                >
                  <p className="text-right leading-relaxed">
                    {review.notes}
                  </p>
                </div>
              ))
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default IncubationReviewPage;