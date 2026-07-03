import React from "react"
import ApprovalActions from "./ApprovalActions"
import Button from "./Button"

import useConversationLauncher
from "../features/messaging/hooks/useConversationLauncher";

import { useNavigate } from "react-router-dom";

import { useStartConversationMutation } from "../api/endpoints/messageApi";

const ConsultationRequestCard = ({ request, onApprove, onReject, mode }) => {

  const {
    launchConversation,
    isLoading,
} = useConversationLauncher();

  return (
  <div className="bg-white w-full max-w-md border border-second-color rounded-xl p-4 md:p-6 shadow flex flex-col gap-6 mx-auto">
      <p><span className="font-bold text-xl">الاسم: </span>{request.requester_name}</p>
      <p><span className="font-bold text-xl">البريد الإلكتروني: </span>{request.requester_email}</p>
      <p><span className="font-bold text-xl">المهارة المطلوبة: </span>{request.required_skill}</p>
      <p><span className="font-bold text-xl">عنوان المشروع: </span>{request.idea_title}</p>
      <p><span className="font-bold text-xl">نوع المساعدة: </span>{request.help_type}</p>
      <p><span className="font-bold text-xl">شرح: </span>{request.description}</p>

      {mode === "request" && (
        <ApprovalActions
          onApprove={() => onApprove && onApprove(request.id)}
          onReject={() => onReject && onReject(request.id)}
        />
      )}

      {mode === "followup" && (
      <Button
          label={isLoading ? "جاري الفتح..." : "مراسلة"}
          className="bg-main-color w-full"
          onClick={() =>
              launchConversation(request.requester_id)
          }
      />
      )}

    </div>
  )
}

export default ConsultationRequestCard
