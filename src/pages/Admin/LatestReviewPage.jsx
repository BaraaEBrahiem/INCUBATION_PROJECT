
import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { showSuccess, showError } from "../../Utils/toast";
import { useGetIncubationNotesQuery, useSubmitGraduationDecisionMutation } from '../../api/endpoints/admin/graduationApi';

const LatestReviewPage = () => {
  const navigate = useNavigate();
  const { idea_id } = useParams();



  const { data, isLoading: isNotesLoading, error: isError } = useGetIncubationNotesQuery(idea_id);
  

  const [submitGraduation, { isLoading: isSubmitting }] = useSubmitGraduationDecisionMutation();


  const meetingDate = data?.meeting_date || "";
  const reviewersList = data?.reviews || [];
  
  const currentStatus = data?.status?.toString().trim().toLowerCase(); 
  console.log("STATUS =", currentStatus);


  const isActionLoading = isSubmitting;


  const hideActions =
    currentStatus ==
    "GRADUATED_NEGATIVE";

  const handleGraduation = async (
    action
  ) => {
    if (isSubmitting) return;

    try {

     
      await submitGraduation({ idea_id, status: action }).unwrap();
      
      showSuccess(action === "positive" ? "تم تخريج المشروع بشكل إيجابي" : "تم تخريج المشروع بشكل سلبي");
      
    
      navigate("/admin/graduated-projects");
    } catch (err) {
      showError(err?.data?.message || "حدث خطأ أثناء حفظ القرار، يرجى المحاولة لاحقاً");
    }
  };


  if (isNotesLoading) {
    return <p className="text-center mt-10 font-bold">جاري تحميل الملاحظات...</p>;
  }

  if (isError) {
    return <p className="text-center mt-10 text-red-500 font-bold">حدث خطأ أثناء جلب بيانات التقييم من السيرفر.</p>;
  }


  const shouldShowButtons = !currentStatus || currentStatus === "pending" || currentStatus === "null"|| currentStatus === "incubation";


  return (
    <div className="bg-[#f9f9f9] min-h-screen p-6 md:p-10 text-right" dir="rtl">
      <div className="container mx-auto">

        
        {/* الهيدر وعرض الحالة الحالية */}
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">تاريخ التقييم {meetingDate}</h1>
            {!shouldShowButtons && (
              <p className={`text-sm font-bold mt-1 ${currentStatus === 'graduated_positive' ? 'text-green-600' : 'text-red-500'}`}>
                حالة المشروع: تم التخريج بشكل {currentStatus === 'graduated_positive' ? 'إيجابي' : 'سلبي'} مسبقاً.

              </p>
            )}
          </div>

          <button
            onClick={() =>
              navigate(-1)
            }
            className="flex items-center gap-2 text-gray-600 hover:text-black transition"
          >
            <IoMdArrowBack className="text-xl" />
          </button>
        </div>


        {/* شبكة عرض ملاحظات المقيمين الديناميكية القادمة من السيرفر */}
        {reviewersList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {reviewersList.map((reviews) => (
              <div key={reviews.mentor_id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-end">
                
                <div className="flex items-center justify-start w-full gap-4 mb-4"> 
                  {reviews.avatar && (
                    <img 
                      src={reviews.avatar} 
                      alt={reviews.mentor_name} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
                    />
                  )}
                  <div className="text-right">
                    <h3 className="font-bold text-gray-900 text-lg">{reviews.mentor_name}</h3>
                    <p className="text-sm text-gray-500 font-medium">
                      اختصاص : <span className="uppercase text-main-color font-bold">{reviews.specialization}</span>
                    </p>
                  </div>
                </div>

                {/* قسم الملاحظات */}
                <div className="w-full text-right bg-gray-50/50 p-3 rounded-lg">
                  <h4 className="text-md font-bold text-gray-700 mb-2">الملاحظات :</h4>
                  <p className="text-md text-gray-600 leading-relaxed whitespace-pre-line">
                    {reviews.notes || <span className="text-gray-400 italic">لا توجد ملاحظات مكتوبة</span>}
                  </p>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 my-10 font-medium">لا توجد ملاحظات مقيمين مضافة بعد لهذا المشروع.</p>
        )}

        {/* التحكم بظهور الأزرار بناءً على حالة المشروع الحقيقية */}
        {shouldShowButtons ? (

          <div className="flex justify-center items-center gap-6 mt-6 max-w-2xl mx-auto">

            <button
              onClick={() =>
                handleGraduation(
                  "positive"
                )
              }
              disabled={
                isSubmitting
              }
              className={`flex-1 text-white font-bold py-3 px-6 rounded-xl transition-all shadow text-center ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#3b597c] hover:bg-[#2d4460]"
              }`}
            >
              {isSubmitting
                ? "جاري الحفظ..."
                : "تخريج ايجابي"}
            </button>

            <button
              onClick={() =>
                handleGraduation(
                  "negative"
                )
              }
              disabled={
                isSubmitting
              }
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

          <div className="text-center py-4 bg-gray-100 text-gray-600 rounded-xl max-w-2xl mx-auto font-bold border border-dashed border-gray-300">
            تم إغلاق طلب التقييم واعتماد قرار التخريج النهائي لهذا المشروع.

          </div>
        )}

      </div>
    </div>
  );
};

export default LatestReviewPage;