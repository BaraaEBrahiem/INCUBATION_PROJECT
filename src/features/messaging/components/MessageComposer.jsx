import { useState } from "react";

import {
  useSendMessageMutation,
} from "../../../api/endpoints/messageApi";

export default function MessageComposer({
  conversationId,
}) {
  const [content, setContent] =
    useState("");

  const [sendMessage, { isLoading }] =
    useSendMessageMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      return;
    }

    try {
      await sendMessage({
        conversationId,
        content,
      }).unwrap();

      setContent("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
      border-t
      p-4
      flex
      gap-2
    "
    >
      <input
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
        placeholder="اكتب رسالة..."
        className="
        flex-1
        border
        rounded-lg
        px-3
        py-2
      "
      />

      <button
        disabled={isLoading}
        className="
        bg-blue-500
        text-white
        px-4
        rounded-lg
      "
      >
        إرسال
      </button>
    </form>
  );
}