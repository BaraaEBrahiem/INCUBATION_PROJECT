import React, { useState, useEffect } from 'react';
import { LuCirclePlus } from "react-icons/lu";
import Input from "../../components/Input";
import Button from '../../components/Button';
 import { 
   useGetScheduleQuery, 
   useAddAppointmentMutation, 
   useDeleteAppointmentMutation,
   useAddHolidayMutation,
   useDeleteHolidayMutation ,
   useGetVacationsQuery,
 } from '../../api/endpoints/scheduleApi';


const dayMap = {
  "الأحد": "SUNDAY",
  "الاثنين": "MONDAY",
  "الثلاثاء": "TUESDAY",
  "الأربعاء": "WEDNESDAY",
  "الخميس": "THURSDAY",
  "الجمعة": "FRIDAY",
  "السبت": "SATURDAY",
};

const reverseDayMap = {
  "SUNDAY": "الأحد",
  "MONDAY": "الاثنين",
  "TUESDAY": "الثلاثاء",
  "WEDNESDAY": "الأربعاء",
  "THURSDAY": "الخميس",
  "FRIDAY": "الجمعة",
  "SATURDAY": "السبت",
};

const ScheduleManagementPage = () => {
  // -----------------------------
  // State للواجهة
  // -----------------------------
  const [selectedDays, setSelectedDays] = useState([]);
  const allDays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const daysOfWeek = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  
  const [holidayFrom, setHolidayFrom] = useState(null);
  const [holidayTo, setHolidayTo] = useState(null);
  //eslint-disable-next-line
  const [currentHolidayId, setCurrentHolidayId] = useState(null);

  const [startTime, setStartTime] = useState({ hours: 7, minutes: 0, period: 'PM' });
  const [endTime, setEndTime] = useState({ hours: 7, minutes: 0, period: 'PM' });
  const [appointments, setAppointments] = useState([]);
  const [holiday, setHoliday] = useState(null);

  // -----------------------------
   const { data: scheduleData, isLoading, error, refetch } = useGetScheduleQuery();
   const [addAppointment, { isLoading: isAddingAppointment }] = useAddAppointmentMutation();
   const [deleteAppointment] = useDeleteAppointmentMutation();
   const [addHoliday, { isLoading: isAddingHoliday }] = useAddHolidayMutation();
   const [deleteHoliday] = useDeleteHolidayMutation();
   const { data: vacationsData } = useGetVacationsQuery();

  // -----------------------------
  // تحميل البيانات من API (عند الربط) توفر فقك
  // -----------------------------
useEffect(() => {
  if (scheduleData) {

    const formattedAppointments = scheduleData.map((apt) => ({
      id: apt.id,
      text: `${reverseDayMap[apt.day]} : من ${formatBackendTime(apt.from)} إلى ${formatBackendTime(apt.to)}`,
      day: apt.day,
      from: apt.from,
      to: apt.to,
    }));

    setAppointments(formattedAppointments);
  }


}, [scheduleData]);

  // -----------------------------
  // بيانات ثابتة حالياً (للتجربة)
  // -----------------------------
  // useEffect(() => {
    // بيانات تجريبية
  //   setAppointments([
  //     { id: crypto.randomUUID(), text: "الاثنين: من الساعة 7:00 PM إلى 9:00 PM" },
  //   ]);
  // }, []);


  // عرض الاجازات 

  useEffect(() => {
  if (vacationsData && vacationsData.length > 0) {

    const latestVacation = vacationsData[vacationsData.length - 1];

    setHoliday({
      id: latestVacation.id,
      from: reverseDayMap[latestVacation.start_day],
      to: reverseDayMap[latestVacation.end_day],
    });

    setHolidayFrom(reverseDayMap[latestVacation.start_day]);

    setHolidayTo(reverseDayMap[latestVacation.end_day]);
  }
}, [vacationsData]);

  // -----------------------------
  // دوال مساعدة
  // -----------------------------
  const formatTime = (time) => {
    const h = time.hours.toString().padStart(2, '0');
    const m = time.minutes.toString().padStart(2, '0');
    return `${h}:${m} ${time.period}`;
  };

  const toBackendTime = (time) => {
  let hour = time.hours;

  if (time.period === 'PM' && hour !== 12) {
    hour += 12;
  }

  if (time.period === 'AM' && hour === 12) {
    hour = 0;
  }

  return `${String(hour).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:00`;
  };


  const formatBackendTime = (time) => {
  if (!time) return "";

  let [hours, minutes] = time.split(":");

  hours = parseInt(hours);

  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;

  if (hours === 0) hours = 12;

  return `${hours}:${minutes} ${period}`;
};


  const incrementTime = (setTime) => {
    setTime((prev) => {
      let newHours = prev.hours + 1;
      let newPeriod = prev.period;
      if (newHours > 12) newHours = 1;
      if (newHours === 12) newPeriod = prev.period === 'AM' ? 'PM' : 'AM';
      return { ...prev, hours: newHours, period: newPeriod };
    });
  };

  const incrementDay = (currentDay, setDay) => {
    const currentIndex = allDays.indexOf(currentDay);
    const nextIndex = (currentIndex + 1) % allDays.length;
    setDay(allDays[nextIndex]);
  };

  // -----------------------------
  // إضافة موعد جديد
  // -----------------------------
const handleAddAppointment = async () => {
  if (selectedDays.length === 0) {
    alert("يرجى اختيار يوم واحد على الأقل");
    return;
  }

  try {
    const requests = selectedDays.map((day) =>
      addAppointment({
        day: dayMap[day],   //  مهم
        start_time: toBackendTime(startTime),
        end_time: toBackendTime(endTime),
      }).unwrap()
    );

    await Promise.all(requests);

    // إعادة جلب البيانات من السيرفر
    refetch();

    setSelectedDays([]);

  } catch (error) {
    console.error(error);
    alert("خطأ في إضافة الموعد");
  }
};

  // -----------------------------
  // حذف موعد
  // -----------------------------

const handleDeleteAppointment = async (id) => {
  try {
    await deleteAppointment(id).unwrap();
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  } catch (error) {
    console.error(error);
    alert("حدث خطأ في حذف الموعد");
  }
};

  // -----------------------------
  // إضافة أجازة
  // -----------------------------
const handleAddHoliday = async () => {
  if (!holidayFrom || !holidayTo) {
    alert("يرجى اختيار فترة الأجازة");
    return;
  }

  try {
    const res = await addHoliday({
      start_day: dayMap[holidayFrom],
      end_day: dayMap[holidayTo],
    }).unwrap();

    setHoliday({
      id: res.id,
      from: holidayFrom,
      to: holidayTo,
    });

  } catch (error) {
    console.error(error);
    alert("خطأ في إضافة الإجازة");
  }
};

  // -----------------------------
  // حذف أجازة
  // -----------------------------
const handleDeleteHoliday = async () => {
  try {
    if (!holiday?.id) return;

    await deleteHoliday(holiday.id).unwrap();

    setHoliday(null);
    setHolidayFrom(null);
    setHolidayTo(null);

  } catch (error) {
    console.error(error);
  }
};

  // -----------------------------
  // حالة التحميل (بعد الربط)
  // -----------------------------
  // if (isLoading) {
  //   return (
  //     <div className="bg-white-color min-h-screen flex justify-center items-center">
  //       <p className="text-xl">جاري تحميل الجدول...</p>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="bg-white-color min-h-screen flex justify-center items-center">
  //       <p className="text-xl text-red-500">حدث خطأ في تحميل البيانات</p>
  //     </div>
  //   );
  // }

  return (
    <div className="bg-white-color min-h-screen flex flex-col font-sans">
      <div className="container"> 
        <h1 className="text-4xl font-bold text-second-color my-6">إدارة الجدولة</h1>
        
        {/* قسم التوفر الاسبوعي */}
        <div>
          <div className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-gray-200">
            <h3 className="font-bold text-third-color mb-2 text-[20px]">حدد توفرك الاسبوعي</h3>
            <p className="text-m text-black mb-5">اختر الايام والاوقات التي تكون متاحا فيها عادة كل أسبوع</p>
          </div>
          
          {/* أيام الأسبوع */}
          <div className="flex flex-row-reverse gap-2 justify-between mb-8" dir='ltr'>
            {daysOfWeek.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDays(prev => 
                  prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
                )}
                className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${
                  selectedDays.includes(day)
                    ? 'bg-main-color text-white'
                    : 'bg-white text-third-color border-second-color'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* وقت البداية والنهاية */}
          <div className="flex flex-wrap md:flex-nowrap items-center justify-start gap-x-10 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-third-color font-medium ">من</span>
              <div className="relative flex-1 group ">
                <LuCirclePlus
                  onClick={() => incrementTime(setStartTime)}
                  className="absolute right-78 top-1/2 -translate-y-1/2 w-6 h-6 text-second-color cursor-pointer hover:scale-110" 
                />
                <Input 
                  type="text" 
                  readOnly
                  value={formatTime(startTime)} 
                  className="w-[300px] p-2.5 px-10"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 md:mr-2">
              <span className="text-third-color font-medium">إلى</span>
              <div className="relative flex-1 group">
                <LuCirclePlus
                  onClick={() => incrementTime(setEndTime)}
                  className="absolute right-78 top-1/2 -translate-y-1/2 w-6 h-6 text-second-color cursor-pointer hover:scale-110" 
                />
                <Input
                  type="text" 
                  readOnly
                  value={formatTime(endTime)} 
                  className="w-[300px] p-2.5 px-10"
                />
              </div>
            </div>
          </div>

          <Button
            label="اضافة" 
            onClick={handleAddAppointment}
            className="w-[300px] bg-main-color hover:bg-[#1e3450] transition shadow-md"
          />
        </div>

        <hr className="my-8 border-second-color" />

        {/* قائمة المواعيد المحددة */}
        <div className="mb-10">
          <h2 className="text-second-color font-bold mb-4">المواعيد المحددة:</h2>
          <div className="space-y-3">
            {appointments.length === 0 ? (
              <p className="text-gray-500 text-center py-8">لا توجد مواعيد محددة</p>
            ) : (
              appointments.map((apt) => (
                <div key={apt.id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center border border-gray-100">
                  <div className="text-gray-700 font-medium order-1">
                    {apt.text}
                  </div>
                  <Button
                    label="حذف"
                    onClick={() => handleDeleteAppointment(apt.id)}
                    className="bg-main-color px-4 py-1.5 hover:bg-red-700 transition order-2"
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* قسم الأجازات */}
        <div className="pb-10">
          <h2 className="text-second-color font-bold mb-4">حدد أيام الأجازة :</h2>
          <div className="flex flex-wrap md:flex-nowrap items-center justify-start gap-x-10 mb-8" dir='rtl'>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-third-color font-medium">من</span>
              <div className="relative flex-1 group">
                <LuCirclePlus
                  onClick={() => incrementDay(holidayFrom, setHolidayFrom)}
                  className="absolute right-78 top-1/2 -translate-y-1/2 w-6 h-6 text-second-color cursor-pointer hover:scale-110 transition-transform" 
                />
                <Input
                  placeholder="الأحد, الاثنين,..."
                  type="text" 
                  readOnly
                  value={holidayFrom || ''} 
                  className="w-[300px] p-2.5 px-10"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 md:mr-2">
              <span className="text-third-color font-medium">إلى</span>
              <div className="relative flex-1 group">
                <LuCirclePlus 
                  onClick={() => incrementDay(holidayTo, setHolidayTo)}
                  className="absolute right-78 top-1/2 -translate-y-1/2 w-6 h-6 text-second-color cursor-pointer hover:scale-110 transition-transform" 
                />
                <Input
                  placeholder="الأحد, الاثنين,..."
                  type="text" 
                  readOnly
                  value={holidayTo || ''} 
                  className="w-[300px] p-2.5 px-10"
                />
              </div>
            </div>
          </div>

          <Button 
            label="اضافة إجازة" 
            onClick={handleAddHoliday}
            className="w-[300px] bg-main-color py-2.5 hover:bg-[#1e3450]" 
          />

          {holiday && (
            <div className="bg-white p-3 rounded-lg shadow-2xl flex justify-between items-center border border-gray-200 mt-3">
              <div className="text-third-color text-[15px] font-medium">
                تم تحديد ايام الاجازة من {holiday.from} الى {holiday.to}
              </div> 
              <Button 
                label="حذف" 
                onClick={handleDeleteHoliday} 
                className="bg-main-color px-5 py-1.5 hover:bg-red-500 transition" 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleManagementPage;