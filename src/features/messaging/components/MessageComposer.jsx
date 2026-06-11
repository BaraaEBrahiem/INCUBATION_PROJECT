import { useState } from "react";
import { useSendMessageMutation } from "../../../api/endpoints/messageApi";

export default function MessageComposer({ conversationId }) {
  const [content, setContent] = useState("");
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!content.trim() || isLoading) {
      return;
    }

    try {
      await sendMessage({
        conversationId,
        content: content.trim(),
      }).unwrap();

      setContent(""); // تصفير الحقل فوراً بعد الإرسال الناجح
    } catch (error) {
      console.error("خطأ أثناء إرسال الرسالة:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-second-color p-4 flex gap-2 bg-white">
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSubmit(e)}
        placeholder="اكتب رسالة..."
        className="flex-1 border border-second-color rounded-lg px-3 py-2 text-sm outline-none focus:border-teal-700"
        disabled={isLoading}
      />

      <button
        type="submit"
        disabled={isLoading || !content.trim()}
        className="bg-main-color  text-white disabled:bg-gray-300 px-5 rounded-lg text-sm font-medium transition-colors"
      >
        {isLoading ? "جاري..." : "إرسال"}
      </button>
    </form>
  );
}