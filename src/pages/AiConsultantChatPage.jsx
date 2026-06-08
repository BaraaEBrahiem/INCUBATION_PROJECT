import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  useGetChatSessionsQuery,
  useGetChatSessionDetailQuery,
} from "../api/endpoints/chatApi";

export default function AIConsultantChatPage() {
  const { categoryId } = useParams();
  const [message, setMessage] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [localMessages, setLocalMessages] = useState([]);
  const [typing, setTyping] = useState(false);

  const chatEndRef = useRef(null);


  const { data: sessions = [], refetch: refetchSessions } = useGetChatSessionsQuery();
  const { data: sessionDetail} = 
    useGetChatSessionDetailQuery(sessionId, { skip: !sessionId });


  useEffect(() => {
    if (sessionDetail && sessionDetail.messages) {
      setLocalMessages(sessionDetail.messages);
    } else if (!sessionId) {
      setLocalMessages([]);
    }
  }, [sessionDetail, sessionId]);

  // عمل Scroll تلقائي لأسفل المحادثة
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localMessages, typing]);

  const newChat = () => {
    setSessionId(null);
    setLocalMessages([]);
  };

  const sendMessage = async () => {
    if (!message.trim() || typing) return;

    const userMsg = message;
    setMessage("");

    // 1. إضافة رسالة اليوزر للواجهة فوراً للسرعة السلسة
    setLocalMessages((prev) => [...prev, { sender: "user", content: userMsg }]);
    setTyping(true);

    const payload = {
      message: userMsg,
      session_id: sessionId,
      consultation_field: categoryId,
    };

    try {
      // 2. نفتح الاتصال المباشر بالباك-أند باستخدام fetch لأن الـ stream يتطلب قراءة التدفق (Reader)
      const response = await fetch("http://127.0.0.1:8000/api/chatbot/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("فشل إرسال الرسالة");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let assistantMessage = "";

      // 3. نجهز رسالة فارغة للبوت في الواجهة لنبدأ بملئها
      setLocalMessages((prev) => [
        ...prev,
        { sender: "assistant", content: "" },
      ]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (let line of lines) {
          if (line.startsWith("data:")) {
            const cleanLine = line.replace("data: ", "").trim();
            if (!cleanLine) continue;

            const data = JSON.parse(cleanLine);

            // نحدث النص حرف بحرف
            if (data.chunk) {
              assistantMessage += data.chunk;
              setLocalMessages((prev) => {
                const updated = [...prev];
                if (updated.length > 0) {
                  updated[updated.length - 1].content = assistantMessage;
                }
                return updated;
              });
            }

            // عند انتهاء البوت من الكلام، نستقبل الـ ID الحقيقي للمحادثة
            if (data.done && data.session_id) {
              setSessionId(data.session_id);
              refetchSessions(); // تحديث القائمة الجانبية للمحادثات عبر RTK
            }
          }
        }
      }
    } catch (err) {
      console.error("حدث خطأ في استقبال البث:", err);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-100 overflow-hidden" dir="rtl">
      {/* SIDEBAR */}
      <div className="w-90 bg-white border-l border-second-color flex flex-col">
        <div className="p-4 border-b border-second-color">
          <h2 className="text-3xl font-bold text-second-color">المحادثات</h2>
          <p className="text-xl text-gray-500">المستشار الذكي - {categoryId}</p>
        </div>

        <div className="p-4">
          <button
            onClick={newChat}
            className="w-full bg-main-color font-bold text-white py-2 rounded-xl hover:bg-gray-800 transition"
          >
            + محادثة جديدة
          </button>
        </div>

        {/* LIST */}
        <div className="flex-1 overflow-y-auto px-3 space-y-2">
          {sessions.length === 0 && (
            <p className="text-sm text-gray-400 text-center mt-10">لا يوجد محادثات</p>
          )}

          {sessions.map((s) => (
            <div
              key={s.id}
              onClick={() => setSessionId(s.id)}
              className={`cursor-pointer p-3 rounded-xl border transition hover:bg-gray-50 ${
                sessionId === s.id ? "bg-gray-100 border-black" : "bg-white"
              }`}
            >
              <p className="text-sm font-medium line-clamp-1">{s.title}</p>
              <p className="text-xs text-gray-400 mt-1">{s.consultation_field}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 flex gap-3 bg-white border-b border-second-color">
             <div className="w-16 h-16 rounded-full bg-main-color flex items-center justify-center text-white text-2xl">
          🤖
        </div>

          <h1 className="text-2xl font-bold pt-2">المستشار الذكي - {categoryId}</h1>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {localMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-3 rounded-2xl max-w-[65%] text-sm leading-relaxed shadow ${
                  msg.sender === "user" ? "bg-black text-white" : "bg-white border"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {typing && <div className="text-sm text-gray-500 animate-pulse">المستشار يكتب...</div>}
          <div ref={chatEndRef} />
        </div>

        {/* INPUT */}
        <div className="p-4 bg-white border-second-color border-t flex gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="اكتب رسالتك للمستشار الذكي..."
            className=" flex-1 border-2 border-second-color rounded-xl px-4 py-2 focus:outline-none focus:border-l-green-500"
            disabled={typing}
          />
          <button
            onClick={sendMessage}
            disabled={typing || !message.trim()}
            className="bg-main-color text-white px-5 rounded-xl hover:bg-gray-800 transition disabled:bg-gray-300"
          >
            إرسال
          </button>
        </div>
      </div>
    </div>
  );
}