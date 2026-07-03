import React from "react";
import AllActivities from "../AllActivities";
import { useGetPublicWorkshopsQuery } from "../../api/endpoints/workshopsApi";

const Activities = ({ id }) => {
  const {
    data: activities = [],
    isLoading,
    error,
  } = useGetPublicWorkshopsQuery();

  if (isLoading) {
    return <div>جاري تحميل النشاطات...</div>;
  }

  return (
    <div className="bg-white-color p-4 mb-40" id={id}>
      <div className="container">
        <h1 className="text-second-color font-semibold text-[40px] mb-10">
          النشاطات
        </h1>

        {error ? (
          <div className="text-center text-red-500">
            تعذر تحميل النشاطات.
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            لا توجد نشاطات حالياً.
          </div>
        ) : (
          <AllActivities activities={activities} />
        )}
      </div>
    </div>
  );
};

export default Activities;