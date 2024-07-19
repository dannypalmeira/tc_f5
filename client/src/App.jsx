import {useAuth, AuthProvider} from "./contexts/authContext";
import NonUserRoutes from "./routes/NonUserRoutes";
import "./firebase/firebase.js";
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
