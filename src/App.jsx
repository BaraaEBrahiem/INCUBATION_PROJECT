import AppRoutes from "./components/AppRoutes";
import { FavoritesProvider } from "./Context/FavoritesContext";
import { RoleProvider } from "./Context/RoleContext";
import { Provider } from "react-redux";
import { useEffect, useRef } from "react";
import store from "./redux/store";
import { useDispatch, /*useSelector*/ } from "react-redux";
import { setNotifications } from "./redux/notificationsSlice";
import logo from "./assets/images/logo.png";
import { Toaster } from "react-hot-toast";

// TODO: بعد الربط هذه الـ hooks
// import { useGetNotificationsQuery } from "./api/endpoints/notificationsApi";
// import { connectWebSocket } from "./api/websocket";
// import { useRole } from "./hooks/useRole";

function NotificationsLoader({ children }) {
  const dispatch = useDispatch();
  const hasLoaded = useRef(false);

  // const token = useSelector(state => state.auth?.token);

  // TODO: بعد الربط استخدمي هذا السطر لجلب الإشعارات من API
  // const { data: apiNotifications } = useGetNotificationsQuery(undefined, {
  //   skip: !token,
  // });

  // TODO: بعد الربط استخدمي هذا الـ useEffect لتشغيل WebSocket
  // useEffect(() => {
  //   if (token) {
  //     connectWebSocket(token);
  //   }
  // }, [token]);

  useEffect(() => {
    async function loadNotifications() {
      if (!hasLoaded.current) {
        const initialNotifications = [
          {
            id: 1,
            image: logo,
            time: "2 دقيقة",
            status: "unread",
            category: "general",
            message: "لديك رسالة جديدة",
            action: { label: "عرض الرسالة", link: "/messagespage" },
          },
          {
            id: 2,
            image: logo,
            time: "1 ساعة",
            status: "unread",
            category: "general",
            message: "تمت مشاهدة ملفك الشخصي",
            action: { label: "عرض الملف الشخصي", link: "/profileinfo" },
          },
          {
            id: 10,
            image: logo,
            time: "10 دقائق",
            status: "unread",
            category: "incubation",
            message: "تم تحديث حالة مشروعك",
            action: { label: "عرض المرحلة", link: "/incubation-stages" },
          },
          {
            id: 11,
            image: logo,
            time: "20 دقيقة",
            status: "unread",
            category: "evaluation",
            message: "لديك تقييم جديد",
            action: { label: "عرض التقييم", link: "/evaluation-center" },
          },
        ];
        dispatch(setNotifications(initialNotifications));
        hasLoaded.current = true;
      }
    }
    loadNotifications();
  }, [dispatch]);

  return children;
}

function App() {
  return (
    <Provider store={store}>
      <RoleProvider>
        <FavoritesProvider>
          <NotificationsLoader>
            <Toaster
              position="top-center"
              reverseOrder={false}
              gutter={8}
              containerClassName=""
              containerStyle={{}}
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                  borderRadius: '12px',
                  padding: '12px 20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  direction: 'rtl',
                },
                success: {
                  duration: 2500,
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
            <AppRoutes />
          </NotificationsLoader>
        </FavoritesProvider>
      </RoleProvider>
    </Provider>
  );
}

export default App;