import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { BiMinus, BiPlus } from 'react-icons/bi';
import Button from '../../components/Button';
import NavLinkUniversal from '../../components/NavLinkUniversal';
import { showSuccess, showError } from '../../Utils/toast';
import {
  useGetEvaluationFormQuery,
  useSaveEvaluationMutation,
  useSubmitEvaluationFinalMutation,
} from "../../api/endpoints/evaluationApi";

const EvaluationFormPage = () => {
  const { idea_id } = useParams();

  const {
    data: formData,
    isLoading,
    error,
  } = useGetEvaluationFormQuery(idea_id);

  const [saveEvaluation] =
    useSaveEvaluationMutation();

  const [submitEvaluationFinal] =
    useSubmitEvaluationFinalMutation();


  useEffect(() => {
    if (!formData?.criteria) return;

    const mergedScores =
      formData.criteria.map((criterion) => {

        const existingScore =
          formData.scores.find(
            (s) =>
              s.criterion === criterion.id
          );

        return {
          id: criterion.id,
          title: criterion.title,
          max_score: criterion.max_score,
          value:
            existingScore?.score ?? 0,
        };
      });

    setScores(mergedScores);

  }, [formData]);

 


 


  // تحويل المعايير الثابتة إلى الشكل المطلوب للتقييم


  const [scores, setScores] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // بعد الربط، سيتم تحديدها بناءً على وجود criteriaFromApi
  const isFormPublished =
  formData?.is_published ?? false; 

  const updateScore = (id, delta) => {
    setScores((prevScores) =>
      prevScores.map((item) => {
        if (item.id === id) {
          const newValue = item.value + delta;
          if (newValue >= 0 && newValue <= item.max_score) {
            return { ...item, value: newValue };
          }
        }
        return item;
      })
    );
  };

  const totalScore = scores.reduce((sum, item) => sum + item.value, 0);

  const handleSubmit = async () => {

    try {

      await saveEvaluation({
        idea_id,
        scores: scores.map((item) => ({
          criterion: item.id,
          score: item.value,
        })),
      }).unwrap();

      await submitEvaluationFinal(
        idea_id
      ).unwrap();

      showSuccess(
        "تم إرسال التقييم بنجاح"
      );

    } catch (err) {

      console.error(err);

      showError(
        err?.data?.detail ||
        "حدث خطأ أثناء إرسال التقييم"
      );
    }
  };

   if (isLoading) {
     return (
       <div className="bg-white-color p-4 flex flex-col items-center justify-center">
         <div className="container text-center py-20">
           <p className="text-gray-500">جاري تحميل نموذج التقييم...</p>
         </div>
       </div>
     );
   }

   if (error) {
     return (
       <div className="bg-white-color p-4 flex flex-col items-center justify-center">
         <div className="container text-center py-20">
           <p className="text-red-500 mb-3">حدث خطأ في تحميل معايير التقييم</p>
           <button
             onClick={() => window.location.reload()}
             className="bg-main-color text-white px-4 py-2 rounded"
           >
             إعادة المحاولة
           </button>
         </div>
       </div>
     );
   }

  if (!isFormPublished) {
    return (
      <div className="bg-white-color p-4 flex flex-col items-center justify-center">
        <div className="container text-center py-20">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-yellow-700 text-lg font-semibold mb-2">
              ⏳ لم يتم نشر نموذج التقييم بعد
            </p>
            <p className="text-gray-600">
              الرجاء انتظار قيام الإدارة بنشر معايير التقييم الخاصة بهذا المشروع.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white-color p-4 flex flex-col items-center justify-center">
      <div className="container">
        <h1 className="text-2xl font-bold text-second-color mb-10 text-right">
          نموذج التقييم
        </h1>

        <div className="p-6 md:p-8 bg-white font-bold text-2xl">
          <div className="flex justify-between mb-8 text-black" dir="ltr">
            <span className="text-center">الدرجة الحد الأقصى 5</span>
            <span className="text-center">بند التقييم</span>
          </div>

          <div className="space-y-4">
            {scores.map((item) => (
              <div key={item.id} className="flex items-center justify-between group" dir="ltr">
                <div className="flex items-center justify-between bg-gray-100 rounded-md px-3 py-1.5 w-50">
                  <button
                    onClick={() => updateScore(item.id, -1)}
                    className="text-black border-2 border-black rounded-full transition-colors hover:bg-gray-200 p-1"
                    aria-label="إنقاص الدرجة"
                  >
                    <BiMinus size={18} />
                  </button>
                  <span className="text-main-color font-bold text-lg">{item.value}</span>
                  <button
                    onClick={() => updateScore(item.id, 1)}
                    className="text-black border-2 border-black rounded-full transition-colors hover:bg-gray-200 p-1"
                    aria-label="زيادة الدرجة"
                  >
                    <BiPlus size={18} />
                  </button>
                </div>
                <div className="text-right text-xs md:text-xl text-black" dir="rtl">
                  {item.id}. {item.title}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 justify-between pt-2">
            <div className="w-40 text-black rounded-md font-bold text-center text-xl">
              المجموع
            </div>
            <div className="flex items-between justify-center mt-4 bg-main-color w-50 text-white py-1 rounded-sm font-bold text-center text-xl shadow-sm">
              {totalScore}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 mt-6 text-xl">
          <Button
            label={isSubmitting ? 'جاري الإرسال...' : 'إرسال للإدارة'}
            className="bg-main-color mt-1"
            onClick={handleSubmit}
            disabled={isSubmitting}
          />
          <NavLinkUniversal
            label={<Button label="كتابة ملاحظات" className="bg-main-color text-xl" />}
            to={`/notes/${idea_id}`}
          />
        </div>
      </div>
    </div>
  );
};

export default EvaluationFormPage;