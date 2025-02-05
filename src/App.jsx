import { Provider } from "react-redux";
import AppRouter from "./routers/app.routes";
import store from "./reduxs/store";

const App = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

export default App;
