import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import {Toaster} from 'react-hot-toast'
import { ChakraProvider } from '@chakra-ui/react';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
    <Provider store={store}>
      <BrowserRouter> 
        <App />
        <Toaster/>
      </BrowserRouter>
    </Provider>
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals();
