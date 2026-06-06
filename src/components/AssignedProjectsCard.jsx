import React from "react";
import Button from "./Button";
import NavLinkUniversal from "./NavLinkUniversal";
import { useSelector } from "react-redux";

const AssignedProjectsCard = ({ project }) => {

  const userRoles = useSelector((state) => state.auth?.user?.roles) || [];

  const isIncubator = userRoles.includes("incubator");

  const targetPath = isIncubator 
    ? `/incubation-projectinfo/${project.id}` 
    : `/projectinfo/${project.id}`;

  return (
    <div className="bg-white w-fit border border-second-color rounded-xl p-6 shadow flex flex-col gap-8">

      <p>
        <span className="font-bold text-xl">الاسم: </span>
        {project.name}
      </p>

      <p>
        <span className="font-bold text-xl">البريد الإلكتروني: </span>
        {project.email}
      </p>

      <p>
        <span className="font-bold text-xl">عنوان المشروع: </span>
        {project.projectTitle}
      </p>

      <NavLinkUniversal
        to={targetPath}
        label={
          <Button 
            label="عرض التفاصيل" 
            className="bg-main-color w-full"
          />
        }
      />

    </div>
  );
};

export default AssignedProjectsCard;