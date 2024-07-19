import {useAuth, AuthProvider} from "./contexts/authContext";
import NonUserRoutes from "./routes/NonUserRoutes";
import "./messaging_init_in_sw";
import UserRoutes from "./routes/UserRoutes";

function App() {
  const {isLoggedOut} = useAuth();

  return <div>{isLoggedOut ? <NonUserRoutes /> : <UserRoutes />}</div>;
}

export default function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
