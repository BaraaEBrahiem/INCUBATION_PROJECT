import { useParams } from "react-router-dom";
import WorkshopDetailsCard from "../../components/WorkshopDetailsCard";

import { useGetWorkshopByIdQuery } from "../../api/endpoints/workshopsApi";

const WorkshopDetailsPage = () => {
  const { id } = useParams();

  const { data: workshop, isLoading, error, refetch } =
    useGetWorkshopByIdQuery(id);
  
  if (isLoading) {
    return (
      <div className="container mt-10 text-center">
        جاري تحميل تفاصيل الورشة...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-10 text-center">
        <p className="text-red-500 mb-3">حدث خطأ في تحميل الورشة</p>

        <button
          onClick={refetch}
          className="bg-main-color text-white px-4 py-2 rounded"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  if (!workshop) {
    return (
      <div className="container mt-10 text-center text-gray-500">
        لم يتم العثور على الورشة المطلوبة
      </div>
    );
  }

  return (
    <div className="container mt-10">
      <h1 className="text-3xl font-bold mb-4 text-second-color">
        تفاصيل الورشة
      </h1>

      <div className="p-4">
        <WorkshopDetailsCard workshop={workshop} />
      </div>
    </div>
  );
};

export default WorkshopDetailsPage;