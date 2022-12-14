import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <BrowserRouter>
    <MoralisProvider 
      serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL ?? ''} 
      appId={process.env.REACT_APP_MORALIS_APPLICATION_ID ?? ''}
    >
      <App />
    </MoralisProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
