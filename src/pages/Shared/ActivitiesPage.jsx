import React, { useState } from 'react'
import AllActivities from '../../components/AllActivities';
import SearchBar from '../../components/SearchBar';

import { LuFileStack } from "react-icons/lu";
import { RxCountdownTimer } from "react-icons/rx";
import CategoryFilterBar from '../../components/CategoryFilterBar';
import { IoRocketOutline } from "react-icons/io5";
import { MdDoneAll } from "react-icons/md";
import { useGetActivitiesQuery } from '../../api/endpoints/activitiesApi';

const ActivitiesPage = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  //const { data: activitiesFromApi, isLoading } = useGetActivitiesQuery();

  //static مؤقتة


  // activities = activitiesFromApi
  const {
    data: activities = [],
    isLoading,
    error,
  } = useGetActivitiesQuery();


  const filteredActivities = activities.filter((activity) => {
    const matchStatus =
      selectedStatus === "all" || activity.status === selectedStatus;

    const matchSearch =
      activity.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchStatus && matchSearch;
  });

  const status = [
    { id: "all", label: "الكل", icon: <LuFileStack /> },
    { id: "منتهية", label: "منتهية", icon: <MdDoneAll /> },
    { id: "لم تبدأ بعد", label: "لم تبدأ بعد", icon: <RxCountdownTimer /> },
    { id: "بدأت حديثاً", label: "بدأت حديثاً", icon: <IoRocketOutline /> },
  ];

  if (isLoading) {
    return (
      <div className="text-center py-20 text-gray-500">
        جاري تحميل الورشات...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        حدث خطأ أثناء تحميل الورشات
      </div>
    );
  }

  return (
    <div className='container mt-20'>
      <CategoryFilterBar
        categories={status}
        selected={selectedStatus}
        onSelect={setSelectedStatus}
      />

      <SearchBar onSearch={setSearchQuery} />

      <AllActivities activities={filteredActivities} />
    </div>
  );
};

export default ActivitiesPage;