import React from 'react';
import ReactDOM from 'react-dom';//react native je za mobilne
import './app/layouts/styles.css';
import 'semantic-ui-css/semantic.min.css';
import App from './app/layouts/App';
import reportWebVitals from './reportWebVitals';
import { store, StoreContext } from './app/stores/store';
import { BrowserRouter } from 'react-router-dom';

//strict mode enforca sav kod nije nije upd to date s react 17, ili je deprekejtan

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter> 
     </StoreContext.Provider>,//provida se konteskt aplikaciji zbog mobx stora, a browserrouter omogucava koristenje react rpoutera
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
