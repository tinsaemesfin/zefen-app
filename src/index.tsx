import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './app/store';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './components/Home';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    
  <Provider store={store}>
  <div>
        {/* <Statistics /> */}
        <Home />
        <ToastContainer />
      </div>
  </Provider>
  <div id="modal-root"></div>

</React.StrictMode>
);


reportWebVitals();
