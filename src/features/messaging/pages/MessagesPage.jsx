// src/features/messaging/pages/MessagesPage.jsx
import React, { useEffect } from "react";
import { useParams} from "react-router-dom";
import logo from "../../../assets/images/logo.png";

// استيراد المكونات التي جهزناها ونظفناها معاً
import ConversationList from "../components/ConversationList";
import ChatWindow from "../components/ChatWindow";

// استيراد الـ Hooks الشغالة من ملف الـ API الخاص بكِ
import {
  useGetConversationsQuery,
  useGetConversationMessagesQuery,
  useMarkConversationAsReadMutation,
} from "../../../api/endpoints/messageApi";

export default function MessagesPage() {
  const { id } = useParams(); // جلب الـ conversationId من رابط المتصفح الحالي
  const conversationId = id ? Number(id) : null;

  // جلب قائمة كل المحادثات
  const { 
    data: conversations = [], 
    isLoading: isConversationsLoading,
    error: conversationsError 
  } = useGetConversationsQuery();

  // جلب رسائل المحادثة النشطة (ويتم تخطيه تلقائياً بـ skip إذا لم يتم تحديد محادثة)
  const { 
    data: messages, 
    isLoading: isMessagesLoading 
  } = useGetConversationMessagesQuery(
    { conversationId },
    { skip: !conversationId }
  );

  // Mutation لتعليم المحادثة كمقروءة فور الدخول إليها
  const [markAsRead] = useMarkConversationAsReadMutation();

  // العثور على بيانات المحادثة الحالية من القائمة لعرض الهيدر الخاص بها
  const currentConversation = conversations.find((c) => c.id === conversationId);

  // تحديث حالة القراءة فوراً عند تغيير المحادثة المحددة
  useEffect(() => {
    if (conversationId) {
      markAsRead(conversationId);
    }
  }, [conversationId, markAsRead]);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white overflow-hidden h-[85vh]">
        
        {/* ─── الشق الأيمن: قائمة جميع المحادثات ─── */}
        <div className="md:col-span-1 border-l border-gray-100 flex flex-col h-full">
           <div className="flex items-center p-3 mb-2 border-b border-second-color bg-gray-50/50">
            <img src={logo} alt="Logo" className="w-16 h-auto" />
            <h1 className="text-xl font-bold text-gray-800">الرسائل</h1>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {isConversationsLoading ? (
              <div className="p-8 text-center text-gray-400 text-sm">جاري تحميل المحادثات...</div>
            ) : conversationsError ? (
              <div className="p-8 text-center text-red-500 text-sm">حدث خطأ أثناء جلب المحادثات</div>
            ) : (
              <ConversationList 
                conversations={conversations} 
                selectedId={conversationId} 
              />
            )}
          </div>
        </div>

        {/* ─── الشق الأيسر: نافذة الشات وعرض الرسائل ─── */}
        <div className="md:col-span-2 flex flex-col h-full bg-gray-50/30">
          {conversationId ? (
            isMessagesLoading && !messages ? (
              <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                جاري تحميل الرسائل...
              </div>
            ) : (
              <ChatWindow 
                conversation={currentConversation} 
                messages={messages} 
              />
            )
          ) : (
            /* واجهة افتراضية مريحة للعين تطلب من اليوزر اختيار شات */
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8">
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4 text-2xl">
                💬
              </div>
              <p className="text-sm font-medium text-gray-600">الرجاء اختيار محادثة من القائمة لبدء التواصل</p>
              <p className="text-xs text-gray-400 mt-1">جميع محادثاتك محمية وآمنة</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}