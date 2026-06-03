import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Button";
import { useGetExhibitionsListQuery } from "../../../api/endpoints/admin/exhibitionApi";

export default function ExhibitionRecord() {
  const navigate = useNavigate();

  const {
    data: exhibitions,
    isLoading,
    error,
    refetch,
  } = useGetExhibitionsListQuery();

  let exhibitionsList = Array.isArray(exhibitions)
    ? exhibitions
    : [];

  if (
    exhibitions?.results &&
    Array.isArray(exhibitions.results)
  ) {
    exhibitionsList =
      exhibitions.results;
  }

  if (
    exhibitions?.data &&
    Array.isArray(exhibitions.data)
  ) {
    exhibitionsList =
      exhibitions.data;
  }

  const openDetails = (
    ex
  ) => {
    navigate(
      "/projectspage",
      {
        state: {
          year: ex.year,
          exhibitionId:
            ex.id,
            
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div
        className="p-6"
        dir="rtl"
      >
        <h2 className="text-xl font-bold mb-6 text-main-color">
          سجل المعارض
        </h2>

        <div className="flex flex-col gap-4">
          {[1, 2, 3].map(
            (i) => (
              <div
                key={i}
                className="bg-teal-100 shadow-md rounded-xl px-4 py-6 h-28 animate-pulse"
              ></div>
            )
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="p-6"
        dir="rtl"
      >
        <h2 className="text-xl font-bold mb-6 text-main-color">
          سجل المعارض
        </h2>

        <div className="text-center py-10">
          <p className="text-red-500 mb-3">
            حدث خطأ في تحميل
            المعارض
          </p>

          <button
            onClick={refetch}
            className="bg-main-color text-white px-4 py-2 rounded"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="p-6"
      dir="rtl"
    >
      <h2 className="text-xl font-bold mb-6 text-main-color">
        سجل المعارض
      </h2>

      {exhibitionsList.length ===
      0 ? (
        <div className="text-center py-10 text-gray-500">
          لا توجد معارض
          سابقة
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {exhibitionsList.map(
            (ex) => (
              <div
                key={ex.id}
                className="bg-teal-100 shadow-md rounded-xl px-4 py-6 border-dotted border-2 border-main-color flex flex-col md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-bold text-lg">
                    {
                      ex.title
                    }
                  </p>

                  <p className="mt-1">
                    تاريخ
                    الانعقاد:{" "}
                    <span className="font-semibold">
                      {
                        ex.date
                      }
                    </span>
                  </p>

                  <p className="mt-1">
                    عدد
                    المشاريع
                    المخرجة:{" "}
                    <span className="font-semibold">
                      {ex.projects_count ||
                        ex
                          .projects
                          ?.length ||
                        0}
                    </span>
                  </p>
                </div>

                <Button
                  label="عرض التفاصيل"
                  onClick={() =>
                    openDetails(
                      ex
                    )
                  }
                  className="mt-4 md:mt-0 bg-main-color"
                />
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}