import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import "./index.sass";
import App from "./App";
import "semantic-ui-css/semantic.min.css";
import "react-notifications/lib/notifications.css";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
