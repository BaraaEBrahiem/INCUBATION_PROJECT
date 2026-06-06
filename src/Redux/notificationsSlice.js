import { createSlice } from "@reduxjs/toolkit";
const adaptNotification = (backendNotif) => {
  // 1. تحويل الأدوار إلى فئات الفلترة بالفرونت
  let category = "general";
  const role = backendNotif.target_role?.toUpperCase();
  if (role === "IDEA_OWNER" || role === "INCUBATION") category = "incubation";
  if (role === "VOLUNTEER") category = "volunteer";
  if (role === "EVALUATOR" || role === "VOLUNTEER_EVALUATOR") category = "evaluation";

  // 2. تركيب الروابط بناءً على النوع والـ ID المعرف
  let action = null;
  if (backendNotif.action_type && backendNotif.related_object_id) {
    let label = "عرض";
    let ReactLink = "/dashboard"; // رابط احتياطي
    const id = backendNotif.related_object_id;

    switch (backendNotif.action_type) {
      case "VIEW_IDEA":
        label = "رؤية الفكرة 💡";
        ReactLink = `/ideas/${id}`;
        break;
      case "VIEW_REQUEST":
        label = "معاينة الطلب 📄";
        ReactLink = `/dashboard/requests/${id}`;
        break;
      case "OPEN_CHAT":
        label = "فتح المحادثة 💬";
        ReactLink = `/messages/${id}`;
        break;
      default:
        label = "عرض التفاصيل";
        ReactLink = "/dashboard";
    }

    action = { label, link: ReactLink };
  }

  return {
    id: backendNotif.id,
    title: backendNotif.title,
    message: backendNotif.message,
    type: backendNotif.type || "INFO",
    status: backendNotif.is_read ? "read" : "unread", // مواءمة Boolean الباك اند مع string الفرونت
    category: category,
    action: action,
    time: backendNotif.created_at, // الوقت التلقائي من السيرفر
    image: backendNotif.image || null,
  };
};

const initialState = {
  items: [],
  unreadCount: 0,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      const rawItems = Array.isArray(action.payload) ? action.payload : [];
      state.items = rawItems.map(adaptNotification);
      state.unreadCount = state.items.filter((n) => n.status === "unread").length;
    },
    addNotification: (state, action) => {
      const adapted = adaptNotification(action.payload);
      if (!state.items.some((n) => n.id === adapted.id)) {
        state.items.unshift(adapted);
        if (adapted.status === "unread") {
          state.unreadCount += 1;
        }
      }
    },
    markAsRead: (state, action) => {
      const id = action.payload;
      const notif = state.items.find((n) => n.id === id);
      if (notif && notif.status === "unread") {
        notif.status = "read";
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    clearUnread: (state) => {
      state.items = state.items.map((n) => ({ ...n, status: "read" }));
      state.unreadCount = 0;
    },
  },
});

export const { setNotifications, addNotification, markAsRead, clearUnread } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;