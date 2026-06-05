import React from 'react';

const AvailabilityBox = ({ availability, availabilityType }) => {
  const list = Array.isArray(availability) ? availability : [];

  return (
    <div className=" bg-white  rounded-xl border border-main-color border-t-10  p-4 shadow-lg flex flex-col gap-4 md:w-[300px] mt-6 md:mt-0" dir="rtl">
      <h3 className="font-bold text-lg">أيام التفرغ:</h3>

      {list.length === 0 ? (
        <p className="text-gray-500 text-sm">لم يتم تحديد أيام تفرغ بعد.</p>
      ) : (
        <ul className="flex flex-col gap-2 text-gray-700">
          {list.map((item, index) => (
            <li key={index} className="text-sm bg-gray-50 p-2 rounded border border-gray-100 flex justify-between items-center">
              <span className="font-semibold text-main-color">{item.day}</span>
              <span className="text-xs text-gray-500">
                من {item.from?.substring(0, 5)} إلى {item.to?.substring(0, 5)}
              </span>
            </li>
          ))}
        </ul>
      )}

      {availabilityType && (
        <div className="mt-2 border-t border-gray-100 pt-3">
          <h3 className="font-bold text-base mb-1">نوع التوفر:</h3>
          <p className="text-gray-700 text-sm">{availabilityType}</p>
        </div>
      )}
    </div>
  );
};

export default AvailabilityBox;