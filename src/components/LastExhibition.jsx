import React from "react";
import { useGetUserPublicProjectsQuery } from "../api/endpoints/publicProjectsApi";

const LastExhibition = () => {
  const {
    data: exhibitions = [],
    isLoading,
    isError,
  } = useGetUserPublicProjectsQuery("all");

  if (isLoading) {
    return (
      <div>
        <h2 className="text-2xl font-bold mt-5">
          آخر معرض "مشاريع رواد الأعمال" :
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-[200px] rounded-md bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-5 text-center text-red-500">
        حدث خطأ أثناء تحميل صور المعرض.
      </div>
    );
  }

  const latestExhibitions = exhibitions.slice(0, 4);

  return (
    <div>
      <h2 className="text-2xl font-bold mt-5">
        آخر معرض "مشاريع رواد الأعمال" :
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
        {latestExhibitions.map((project) => (
          <img
  src={project.image}
  alt={project.title}
  className="h-[200px] w-full object-cover rounded-md"
/>
        ))}
      </div>
    </div>
  );
};

export default LastExhibition;