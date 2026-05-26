import React from 'react';
import { useNavigate, /*useParams*/ } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import girl from "../../assets/images/girl.jpg";
//import { showSuccess, showError } from "../../Utils/toast";
// import { useGetEvaluationNotesQuery, useSubmitGraduationDecisionMutation } from '../../api/endpoints/graduationApi';

const LatestReviewPage = () => {
  const navigate = useNavigate();
//   const { idea_id } = useParams();

  // const { data: apiData, isLoading: isNotesLoading } = useGetEvaluationNotesQuery(ideaId);
  // const [submitGraduation, { isLoading: isSubmitting }] = useSubmitGraduationDecisionMutation();

  const fallback = {
    meeting_date: "12/4/2026",
    //  null (لم يتخذ قرار بعد) | "positive" (مخرج إيجابي) | "negative" (مخرج سلبي)
    graduation_status: null, 
    reviewers: [
      { mentor_id: 1, mentor_name: "رانيا الأحمد", specialization: "uiux", avatar: girl, notes: "تكتب هنا ملاحظات المقيم أحمد\nتكتب هنا ملاحظات المقيم أحمد\nتكتب هنا ملاحظات المقيم أحمد" },
      { mentor_id: 2, mentor_name: "رانيا الأحمد", specialization: "uiux", avatar: girl, notes: "تكتب هنا ملاحظات المقيم أحمد\nتكتب هنا ملاحظات المقيم أحمد\nتكتب هنا ملاحظات المقيم أحمد" },
      { mentor_id: 3, mentor_name: "رانيا الأحمد", specialization: "uiux", avatar: girl, notes: "تكتب هنا ملاحظات المقيم أحمد\nتكتب هنا ملاحظات المقيم أحمد\nتكتب هنا ملاحظات المقيم أحمد" },
    ],
  };

  const dataSource = /* apiData || */ fallback;
  
  const meetingDate = dataSource?.meeting_date || "";
  const reviewersList = dataSource?.reviewers || [];
  
  const currentStatus = dataSource?.graduation_status; 

  const isActionLoading = /* isSubmitting || */ false;

  const handleGraduation = async (action) => {
    if (isActionLoading) return;

    /*
    try {
      await submitGraduation({ evaluationId: ideaId, status: action }).unwrap();
      showSuccess(action === "positive" ? "تم تخريج المشروع بشكل إيجابي" : "تم تخريج المشروع بشكل سلبي");
      navigate("/projects", { state: { graduationStatus: action } });
    } catch (err) {
      showError(err?.data?.message || "حدث خطأ أثناء حفظ القرار، يرجى المحاولة لاحقاً");
    }
    */

    //  محاكاة مؤقتة قبل الربط
    console.log(`تم إرسال الحالة للباك إند بنجاح: ${action}`);
    navigate("/admin/graduated-projects");
  };

  // if (isNotesLoading) return <p className="text-center mt-10">جاري تحميل الملاحظات...</p>;

  return (
    <div className="bg-[#f9f9f9] min-h-screen p-6 md:p-10 dir-rtl text-right">
      <div className="container mx-auto">
        
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">تاريخ التقييم {meetingDate}</h1>
            {currentStatus && (
              <p className={`text-sm font-bold mt-1 ${currentStatus === 'positive' ? 'text-green-600' : 'text-red-500'}`}>
                حالة المشروع: تم التخريج بشكل {currentStatus === 'positive' ? 'إيجابي' : 'سلبي'} مسبقاً.
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

        {/* شبكة عرض الملاحظات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviewersList.map((reviewer) => (
            <div key={reviewer.mentor_id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-end">
              
              <div className="flex items-center justify-start w-full gap-4 mb-4"> 
                <img 
                  src={reviewer.avatar} 
                  alt={reviewer.mentor_name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
                />
                <div className="text-right">
                  <h3 className="font-bold text-gray-900 text-lg">{reviewer.mentor_name}</h3>
                  <p className="text-sm text-gray-500 font-medium">اختصاص : <span className="uppercase text-main-color font-bold">{reviewer.specialization}</span></p>
                </div>
              </div>

              {/* قسم الملاحظات */}
              <div className="w-full text-right bg-gray-50/50 p-3 rounded-lg">
                <h4 className="text-sm font-bold text-gray-700 mb-2">الملاحظات :</h4>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {reviewer.notes}
                </p>
              </div>

            </div>
          ))}
        </div>
        {!currentStatus ? (
          <div className="flex justify-center items-center gap-6 mt-6 max-w-2xl mx-auto">
            
            {/* زر تخريج إيجابي */}
            <button
              onClick={() => handleGraduation("positive")}
              disabled={isActionLoading}
              className={`flex-1 text-white font-bold py-3 px-6 rounded-xl transition-all shadow text-center ${
                isActionLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#3b597c] hover:bg-[#2d4460]"
              }`}
            >
              {isActionLoading ? "جاري الحفظ..." : "تخريج ايجابي"}
            </button>

            {/* زر تخريج سلبي */}
            <button
              onClick={() => handleGraduation("negative")}
              disabled={isActionLoading}
              className={`flex-1 text-white font-bold py-3 px-6 rounded-xl transition-all shadow text-center ${
                isActionLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#de0f0f] hover:bg-[#b80c0c]"
              }`}
            >
              {isActionLoading ? "جاري الحفظ..." : "تخريج سلبي"}
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