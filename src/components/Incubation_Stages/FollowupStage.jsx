import React from "react";
import ConsultationRequestBtn from "../ConsultationRequestBtn";
import AlertBox from "../AlertBox";
import NavLinkUniversal from "../NavLinkUniversal";
import Button from "../Button";

const FollowupStage = ({ data }) => {

  const nextMeetingDateRaw = data?.next_meeting_date;
  const notes = data?.notes || [];
  const can_request_team = data?.can_request_team || false;

  const formatDateTime = (isoString) => {
    if (!isoString) return "لم يتم تحديد موعد المراجعة القادمة بعد";
    const dateObj = new Date(isoString);
    
    const date = dateObj.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const time = dateObj.toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${date} الساعة ${time}`;
  };

  return (
    <div className="p-4 md:p-6 rounded-xl space-y-8 min-h-[70vh] bg-white-color">
      {/* عنوان المرحلة */}
      <h2 className="text-2xl font-bold text-second-color">
        الاحتضان والمتابعة المستمرة
      </h2>

      {/* تاريخ اللجنة والمراجعة القادمة */}
      <div className="bg-white p-4 rounded-xl shadow-md border border-r-4 border-r-main-color w-fit min-w-[300px]">
        <p className="font-semibold text-gray-750">
          تاريخ جلسة المراجعة والتقييم القادمة:
        </p>
        <p className="text-main-color font-bold text-lg mt-1">
          {formatDateTime(nextMeetingDateRaw)}
        </p>
      </div>

      <div className="w-full">
        <AlertBox message="تنبيه: عدم معالجة الملاحظات المطلوبة والمسجلة من قبل المشرفين قد يؤثر على استمرار وتأهيل المشروع في الحاضنة خلال جلسات التقييم الدورية القادمة." />
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-second-color mb-1">
            سجل التقييمات والملاحظات الحالية
          </h3>
          <p className="text-gray-500 text-sm">
            ستجد هنا كافة الملاحظات الفنية والتنفيذية التي سجلتها لجنة التقييم والمشرفين لمتابعة تقدم مشروعك.
          </p>
        </div>

        {notes.length === 0 ? (
          <div className="bg-green-50 border border-green-200 p-5 rounded-xl text-center max-w-2xl">
            <p className="font-bold text-green-700 text-lg">
              🎉 ممتع! لا توجد أي ملاحظات أو تعديلات مطلوبة من فريقكم حالياً.
            </p>
            <p className="text-green-600 text-xs mt-1">
              واصلوا العمل بنفس الكفاءة للتحضير لمعرض المشاريع النهائي.
            </p>
          </div>
        ) : (
          <div className="max-w-3xl bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 px-4 py-2.5 border-b font-semibold text-sm text-gray-600">
              الملاحظات النشطة التي يجب معالجتها
            </div>
            <ul className="divide-y divide-gray-100">
              {notes.map((note, index) => {
                // التعامل المرن مع البيانات سواء كانت كائن (Object) يحتوي على حقول أو نص مباشر من الـ Serializer
                const noteText = typeof note === "object" ? note?.text : note;
                const isResolved = typeof note === "object" ? (note?.is_resolved || note?.resolved) : false;

                return (
                  <li 
                    key={note?.id || index} 
                    className="p-4 hover:bg-gray-50 flex items-start justify-between gap-4 transition-colors"
                  >
                    <div className="flex gap-3">
                      <span className="text-gray-400 font-mono text-sm mt-0.5">{index + 1}.</span>
                      <p className="text-gray-700 leading-relaxed font-medium text-sm">
                        {noteText || "ملاحظة غير مفسرة"}
                      </p>
                    </div>
                    
                    {/* عرض حالة الملاحظة (نشطة أو تم حلها وموافقة المشرف عليها) */}
                    <div>
                      {isResolved ? (
                        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                          ✓ تم الحل
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                          ● قيد المعالجة
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* قسم طلب الاستشارة أو الدعم من الحاضنة لمساعدتهم في حل الملاحظات */}
      <div className="pt-4 border-t border-gray-100 max-w-3xl flex flex-col sm:flex-row justify-center items-start sm:items-center gap-4">
        <NavLinkUniversal
          label={<Button label="طلب استشارة" className='bg-main-color' />}
          to="/consultants"
        />
         {/* صندوق طلب فريق */}
        {can_request_team && (
            <NavLinkUniversal
              label={<Button label="طلب فريق" className='bg-main-color' />}
              to="/TeamRequestPage"
            />
        )}
      </div>
    </div>
  );
};

export default FollowupStage;