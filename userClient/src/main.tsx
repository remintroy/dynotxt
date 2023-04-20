import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { Provider } from "react-redux";
import Store, { presistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={Store}>
    <PersistGate loading={null} persistor={presistor}>
      <App />
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
