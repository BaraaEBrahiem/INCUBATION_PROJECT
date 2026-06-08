import React from "react"
import Button from "./Button"
import NavLinkUniversal from "./NavLinkUniversal"

const AssignedProjectsCard = ({ project }) => {
  return (
    <div className="bg-white w-fit border border-second-color rounded-xl p-6 shadow flex flex-col gap-8">

      <p>
        <span className="font-bold text-xl">الاسم: </span>
        {project.owner_name}
      </p>

      <p>
        <span className="font-bold text-xl">البريد الإلكتروني: </span>
        {project.owner_email}
      </p>

      <p>
        <span className="font-bold text-xl">عنوان المشروع: </span>
        {project.idea_title}
      </p>

      <NavLinkUniversal
        to={`/projectinfo/${project.id}`}
        label={
          <Button 
            label="عرض التفاصيل" 
            className="bg-main-color w-full"
          />
        }
      />

    </div>
  )
}

export default AssignedProjectsCard
