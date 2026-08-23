import AppRoutes from "./components/AppRoutes";
import { FavoritesProvider } from "./Context/FavoritesContext";
import { RoleProvider } from "./Context/RoleContext";
import RealtimeProvider from "./features/realtime/RealtimeProvider";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <RoleProvider>

      <RealtimeProvider>

        <FavoritesProvider>

          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              duration: 3000,
              style: {
                background: "#363636",
                color: "#fff",
                borderRadius: "12px",
                padding: "12px 20px",
                fontSize: "14px",
                fontWeight: "500",
                direction: "rtl",
              },

              success: {
                duration: 2500,
                iconTheme: {
                  primary: "#10b981",
                  secondary: "#fff",
                },
              },

              error: {
                duration: 3000,
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#fff",
                },
              },
            }}
          />

          <AppRoutes />

        </FavoritesProvider>

      </RealtimeProvider>

    </RoleProvider>
  );
}

export default App;