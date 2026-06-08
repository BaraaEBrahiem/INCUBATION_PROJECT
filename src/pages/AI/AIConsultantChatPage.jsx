import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function AIConsultantChatPage() {
  const { categoryId } = useParams();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [typing, setTyping] = useState(false);

  const chatEndRef = useRef(null);

  // scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // load sessions
  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/chatbot/sessions/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSessions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadSession = async (id) => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/chatbot/sessions/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSessionId(id);
      setMessages(res.data.messages);
    } catch (err) {
      console.error(err);
    }
  };

  const newChat = () => {
    setSessionId(null);
    setMessages([]);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = message;
    setMessage("");

    setMessages((prev) => [...prev, { sender: "user", content: userMsg }]);
    setTyping(true);

    const payload = {
      message: userMsg,
      session_id: sessionId,
      consultation_field: categoryId,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/chatbot/chat/stream/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let assistantMessage = "";

      // placeholder assistant message
      setMessages((prev) => [
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
            const data = JSON.parse(line.replace("data: ", ""));

            if (data.chunk) {
              assistantMessage += data.chunk;

              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1].content = assistantMessage;
                return updated;
              });
            }

            if (data.session_id) {
              setSessionId(data.session_id);
              fetchSessions();
            }
          }
        }
      }
    } catch (err) {
      console.error(err);
    }

    setTyping(false);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-100 overflow-hidden">

      {/* SIDEBAR */}
      <div className="w-80 bg-white border-r flex flex-col">

        {/* HEADER */}
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold">المحادثات</h2>
          <p className="text-xs text-gray-500">
            المستشار الذكي - {categoryId}
          </p>
        </div>

        {/* NEW CHAT */}
        <div className="p-4">
          <button
            onClick={newChat}
            className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition"
          >
            + محادثة جديدة
          </button>
        </div>

        {/* LIST */}
        <div className="flex-1 overflow-y-auto px-3 space-y-2">

          {sessions.length === 0 && (
            <p className="text-sm text-gray-400 text-center mt-10">
              لا يوجد محادثات
            </p>
          )}

          {sessions.map((s) => (
            <div
              key={s.id}
              onClick={() => loadSession(s.id)}
              className={`cursor-pointer p-3 rounded-xl border transition hover:bg-gray-50`}
            >
              <p className="text-sm font-medium line-clamp-1">
                {s.title}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {s.consultation_field}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="p-4 bg-white border-b">
          <h1 className="text-lg font-bold">
            المستشار الذكي - {categoryId}
          </h1>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-3 rounded-2xl max-w-[65%] text-sm leading-relaxed shadow
                ${
                  msg.sender === "user"
                    ? "bg-black text-white"
                    : "bg-white border"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {typing && (
            <div className="text-sm text-gray-500">
              المستشار يكتب...
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* INPUT */}
        <div className="p-4 bg-white border-t flex gap-2">

          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="اكتب رسالتك..."
            className="flex-1 border rounded-xl px-4 py-2 focus:outline-none"
          />

          <button
            onClick={sendMessage}
            disabled={typing}
            className="bg-black text-white px-5 rounded-xl hover:bg-gray-800 transition"
          >
            إرسال
          </button>
        </div>

      </div>
    </div>
  );
}