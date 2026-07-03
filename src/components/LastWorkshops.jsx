import React from "react";
import NavLinkUniversal from "./NavLinkUniversal";
import { useGetPublicWorkshopsQuery } from "../api/endpoints/workshopsApi";

const LastWorkshops = () => {
  const {
    data: workshops = [],
    isLoading,
    error,
  } = useGetPublicWorkshopsQuery();

  // أول أربع ورشات
  const lastFour = workshops.slice(0, 4);

  if (isLoading) {
    return (
      <div>
        <h2 className="text-2xl font-bold">
          آخر ورشات العمل والفعاليات :
        </h2>

        <div className="mt-5 text-center">
          جاري تحميل الورشات...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2 className="text-2xl font-bold">
          آخر ورشات العمل والفعاليات :
        </h2>

        <div className="mt-5 text-center text-red-500">
          تعذر تحميل الورشات.
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">
        آخر ورشات العمل والفعاليات :
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
        {lastFour.map((ws) => (
          <NavLinkUniversal
            key={ws.id}
            to={`/public-workshops/${ws.id}`}
            label={
              <img
                src={ws.image}
                alt={ws.title}
                className="h-[300px] w-full object-cover rounded-md"
              />
            }
          />
        ))}
      </div>
    </div>
  );
};

export default LastWorkshops;