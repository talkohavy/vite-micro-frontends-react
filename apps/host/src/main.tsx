import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import GlobalErrorBoundaryDevelopment from "./components/ErrorBoundaries/GlobalErrorBoundaryDevelopment";
import ReactErrorOverlay from "./components/ReactErrorOverlay";
import SuspenseUntilReady from "./components/SuspenseUntilReady";
import DarkThemeProvider from "./providers/DarkThemeProvider";
// import { createStore } from "./store";
// import { State } from "./store/types";
import "./index.css";

// import { Provider } from "react-redux";

// const isLogged = !!localStorage.getItem("isLogged");

// const preloadedState = { user: { isLogged } } as State;

// const store = createStore({ preloadedState });

function Client() {
  return (
    <React.StrictMode>
      <SuspenseUntilReady
        asyncFn={async () => {
          console.log("Application is up and running!");
        }}
      >
        <GlobalErrorBoundaryDevelopment>
          {/* <Provider store={store}> */}
          <BrowserRouter>
            <DarkThemeProvider>
              <App />
            </DarkThemeProvider>
          </BrowserRouter>
          {/* </Provider> */}
        </GlobalErrorBoundaryDevelopment>
      </SuspenseUntilReady>
    </React.StrictMode>
  );
}

const rootElement = document.getElementById("root") as HTMLDivElement;
const root = ReactDOM.createRoot(rootElement);
root.render(<Client />);

window.addEventListener("error", ({ error }) => ReactErrorOverlay(error));
window.addEventListener("unhandledrejection", ({ reason }) =>
  ReactErrorOverlay(reason)
);
