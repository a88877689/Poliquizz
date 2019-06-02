import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { Provider } from "react-redux";
import "react-redux-notify/dist/ReactReduxNotify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-table/react-table.css"
import "./styles/main.scss";
import {
    faHome,
    faChevronLeft,
    faChevronRight,
    faPencilRuler,
    faFileAlt,
    faDownload,
    faPencilAlt,
    faTrash,
    faQuestionCircle,
    faCheck,
    faBomb,
    faUsers,
    faExclamation
} from "@fortawesome/free-solid-svg-icons";
import * as serviceWorker from "./serviceWorker";

library.add(faHome);
library.add(faChevronLeft);
library.add(faChevronRight);
library.add(faPencilRuler);
library.add(faFileAlt);
library.add(faDownload);
library.add(faPencilAlt);
library.add(faTrash);
library.add(faQuestionCircle);
library.add(faCheck);
library.add(faBomb);
library.add(faUsers);
library.add(faExclamation);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));
serviceWorker.unregister();
