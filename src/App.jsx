import { AuthProvider } from "./context/auth.provider";
import AppRouter from "./routers/app.routes";

const App = () => (
  <AuthProvider>
    <AppRouter />
  </AuthProvider>
);

export default App;
