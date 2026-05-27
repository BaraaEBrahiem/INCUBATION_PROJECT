import React from "react"
import ApprovalActions from "./ApprovalActions"

const VolunteerRequestDetails = ({ request, onApprove, onReject }) => {
 return (
    <div className="bg-white border border-second-color rounded-xl p-6 shadow flex flex-col gap-6">

      <p><span className="font-bold text-xl">الاسم: </span>{request.name}</p>
      <p><span className="font-bold text-xl">البريد الإلكتروني: </span>{request.email}</p>
      <p><span className="font-bold text-xl">نوع المهارة: </span>{request.required_skill}</p>
      <p><span className="font-bold text-xl">الفئة المستهدفة: </span>{request.target_audience}</p>
      <p><span className="font-bold text-xl">عنوان المشروع: </span>{request.title}</p>
      <p><span className="font-bold text-xl">المهام المطلوبة: </span>{request.tasks}</p>
      <p><span className="font-bold text-xl">شرح مختصر عن الفكرة: </span>{request.description}</p>
      <p><span className="font-bold text-xl">المشكلة التي يحلها المشروع: </span>{request.problem}</p>

      <ApprovalActions
        onApprove={onApprove}
        onReject={onReject}
      />

    </div>
  )
}

export default VolunteerRequestDetails
