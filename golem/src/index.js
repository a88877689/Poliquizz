import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import * as serviceWorker from "./serviceWorker";
import { library } from "@fortawesome/fontawesome-svg-core";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.scss";
import {
    faHome,
    faChevronLeft,
    faChevronRight,
    faPencilRuler,
    faFileAlt,
} from "@fortawesome/free-solid-svg-icons";

library.add(faHome);
library.add(faChevronLeft);
library.add(faChevronRight);
library.add(faPencilRuler);
library.add(faFileAlt);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));
serviceWorker.unregister();
