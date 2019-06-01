import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import * as serviceWorker from "./serviceWorker";
import { library } from "@fortawesome/fontawesome-svg-core";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
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
} from "@fortawesome/free-solid-svg-icons";

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

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));
serviceWorker.unregister();
