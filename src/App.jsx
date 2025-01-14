import AppRouter from "./routers/app.routes";
import { AuthProvider } from "./context/auth.context";

const App = () => (
  <AuthProvider>
    <AppRouter />
  </AuthProvider>
);

export default App;
