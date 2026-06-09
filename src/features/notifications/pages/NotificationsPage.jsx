import React from "react";
import { 
  useGetNotificationsQuery, 
  useMarkAllNotificationsAsReadMutation 
} from "../../../api/endpoints/notificationApi";
import NotificationItem from "../components/NotificationItem";

const NotificationsPage = () => {
  const { data: notifications = [], isLoading } = useGetNotificationsQuery();

  const [markAll, { isLoading: markAllLoading }] = useMarkAllNotificationsAsReadMutation();

  return (
    <div className="min-h-screen p-4  flex justify-center items-start" dir="rtl">
      <div className="container max-w-4xl  rounded-xl  p-6">
        
        {/* الهيدر العلوي لصفحة الإشعارات */}
        <div className="flex items-center justify-between pb-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-black">مركز الإشعارات</h1>
            <p className="text-sm text-gray-500 mt-1">تابع آخر التحديثات والنشاطات الخاصة بك</p>
          </div>

          {notifications.length > 0 && (
            <button
              disabled={markAllLoading}
              onClick={() => markAll()}
              className="text-sm font-semibold text-white hover:text-blue-800 disabled:text-gray-400 bg-main-color hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
            >
              {markAllLoading ? "جاري التحديث..." : "تعيين الكل كمقروء"}
            </button>
          )}
        </div>

        {/* محتوى الإشعارات */}
        <div className="space-y-2">
          {isLoading && (
            <div className="p-8 text-center text-gray-500">
              <div className="animate-pulse">جاري تحميل الإشعارات...</div>
            </div>
          )}

          {!isLoading && notifications.length === 0 && (
            <div className="p-12 text-center text-gray-400 border-2  rounded-xl">
              <div className="text-4xl mb-2">🔔</div>
              <p className="text-md">صندوق الإشعارات فارغ حالياً</p>
            </div>
          )}

          {!isLoading && notifications.length > 0 && (
            <div className="divide-y divide-gray-50 rounded-lg  overflow-hidden">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className="p-1 hover:scale-95 transition-colors"
                >
                  <NotificationItem notification={notification} />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default NotificationsPage;