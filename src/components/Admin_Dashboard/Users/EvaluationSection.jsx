import Button from "../../Button";
import NavLinkUniversal from "../../NavLinkUniversal";

const EvaluationSection = ({
  roleType,         // 'EVALUATOR' أو 'INCUBATOR' أو 'IDEA_OWNER'
  assignments = [], // خاص بالمقيم
  ideas = [],       // خاص بصاحب الفكرة والمحتضن
  onEvaluationClick,
  onViewProject,
}) => {

  // الحالة️⃣: إذا كان المستخدم مقيّم (EVALUATOR) -> نعرض المشاريع والمهمات المسندة إليه
  // =========================================================================
  if (roleType === "EVALUATOR") {
    return (
      <div className="bg-white shadow rounded-lg p-6 mb-6" dir="rtl">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">المشاريع والمهمات المسندة للتقييم</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse border border-second-color">
            <thead>
              <tr className="bg-gray-50 border-b border-second-color text-gray-700 font-bold">
                <th className="p-3">اسم المشروع / الفكرة</th>
                <th className="p-3">طبيعة المهمة</th>
                <th className="p-3 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {assignments.length > 0 ? (
                assignments.map((asm) => (
                  <tr key={asm.idea_id} className="hover:bg-gray-50 border-b border-second-color">
                    <td className="p-3 font-medium text-gray-900">{asm.title}</td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        {asm.roles?.map((r, i) => (
                          <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {r === "EVALUATION" ? "تقييم أولي" : "جلسات احتضان"}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <Button 
                        label="عرض تفاصيل المشروع" 
                        className="bg-main-color text-xs py-1 px-3"
                        onClick={() => onViewProject && onViewProject(asm.idea_id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-500">لا توجد مشاريع مسندة لهذا المقيم حالياً.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // الحالات 2: إذا كان (IDEA_OWNER) أو المحتضن ويملكون أفكاراً ومشاريع مرفقة
  // =========================================================================
  return (
    <div className="space-y-8" dir="rtl">
      {ideas.map((idea) => {
        const parsedNotes = idea.reviews?.map((r) => r.note) || [];

        return (
          <div key={idea.idea_id} className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
            <div className="border-b pb-3 mb-4 flex justify-between items-center">
              <h4 className="text-xl font-bold text-main-color">المشروع: {idea.title}</h4>
              <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                حالة المشروع: {idea.status || "قيد الدراسة"}
              </span>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              
              {/* القسم الأيمن: الملاحظات، الحضور، والأزرار */}
              <div className="w-full md:w-1/3 space-y-6">
                
                {/* الملاحظات الدورية (تظهر فقط إذا وجدت في كرت الفكرة) */}
                {idea.reviews && (
                  <div className="space-y-2">
                    <h5 className="text-lg font-bold text-gray-800">الملاحظات الدورية والتوصيات</h5>
                    {parsedNotes.length > 0 ? (
                      <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
                        {parsedNotes.map((note, index) => (
                          <div key={index} className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 border-r-4 border-second-color leading-relaxed">
                            {note}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">لا توجد ملاحظات دورية مسجلة مسبقاً.</p>
                    )}
                  </div>
                )}

                {idea.commitment_percentage !== undefined && idea.commitment_percentage !== null && (
                  <div className="p-3 bg-main-color/5 rounded-lg border border-main-color/10">
                    <h5 className="text-sm font-bold text-gray-600 mb-1">نسبة الالتزام وحضور المعسكر</h5>
                    <p className="text-main-color font-black text-3xl">{idea.commitment_percentage}%</p>
                  </div>
                )}

                {/* زر عرض تفاصيل المشروع المباشر */}
                <Button 
                  label="تفاصيل ومرفقات المشروع" 
                  className="bg-main-color w-full py-2.5 font-medium shadow-sm"
                  onClick={() => onViewProject && onViewProject(idea.idea_id)}
                />
              </div>

              {/* القسم الأيسر: جدول التقييمات الأولية الراجعة للفكرة */}
              <div className="w-full md:w-2/3 overflow-x-auto">
                <h5 className="text-lg font-bold text-gray-800 mb-3">نتائج التقييمات الحالية</h5>
                <table className="w-full text-right border-collapse border border-second-color">
                  <thead>
                    <tr className="bg-gray-50 border-b border-second-color text-gray-700 font-bold">
                      <th className="p-3 text-sm">اسم المقيم</th>
                      <th className="p-3 text-sm text-center">الدرجة الممنوحة</th>
                      <th className="p-3 text-sm">التوصية والملاحظة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {idea.evaluations && idea.evaluations.length > 0 ? (
                      idea.evaluations.map((e, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 cursor-pointer border-b border-second-color"
                          onClick={() => onEvaluationClick && onEvaluationClick(e)}
                        >
                          <td className="p-3  font-medium text-gray-800">{e.evaluator_name}</td>
                          <td className="p-3  text-center font-bold text-main-color">{e.score}</td>
                          <td className="p-3  text-gray-600 leading-relaxed max-w-xs truncate md:whitespace-normal">{e.note}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="p-4 text-center text-gray-400 text-sm">لم يقم أي مقيم برصد درجات لهذا المشروع بعد.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EvaluationSection;