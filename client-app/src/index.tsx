import React from "react";
import ReactDOM from "react-dom"; //react native je za mobilne
import 'react-datepicker/dist/react-datepicker.css'
import "./app/layouts/styles.css";
import "semantic-ui-css/semantic.min.css";
import "react-calendar/dist/Calendar.css";
import App from "./app/layouts/App";
import "react-toastify/dist/ReactToastify.min.css";
import reportWebVitals from "./reportWebVitals";
import { store, StoreContext } from "./app/stores/store";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

//strict mode enforca sav kod nije nije upd to date s react 17, ili je deprekejtan

export const history = createBrowserHistory();//mos bilo di koiristit
ReactDOM.render(
  <StoreContext.Provider value={store}>
    <Router history={history}>
      <App />
    </Router>
  </StoreContext.Provider>, //provida se konteskt aplikaciji zbog mobx stora, a browserrouter omogucava koristenje react rpoutera
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
