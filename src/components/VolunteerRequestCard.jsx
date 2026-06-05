import React from "react"
import NavLinkUniversal from "./NavLinkUniversal"
import Button from "./Button"

const VolunteerRequestCard = ({ request }) => {
  return (
  <div className="bg-white w-full max-w-md border border-second-color rounded-xl px-6 md:px-8 py-6 shadow flex flex-col gap-3 mx-auto">

      <p><span className="font-bold text-xl">الاسم: </span>{request.requester_name}</p>
      <p><span className="font-bold text-xl">البريد الإلكتروني: </span>{request.requester_email}</p>
      <p><span className="font-bold text-xl">المهارة المطلوبة: </span>{request.required_skill}</p>
      <p><span className="font-bold text-xl">عنوان المشروع: </span>{request.idea_title}</p>

      <div className="flex items-center justify-center mt-4">
        <NavLinkUniversal
          to={`/volunteer-request/${request.id}`}
          label={<Button label="عرض التفاصيل" className="bg-main-color w-70" />}
        />
      </div>
    </div>
  )
}

export default VolunteerRequestCard
