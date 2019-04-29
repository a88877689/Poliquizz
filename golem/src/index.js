import React from 'react';
import ReactDOM from 'react-dom';
import 'element-theme-default';
import '@/styles/main.scss';
import App from '@/App';
import * as serviceWorker from '@/serviceWorker';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faFileAlt, faQuestionCircle, faCaretDown, faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faHome);
library.add(faFileAlt);
library.add(faQuestionCircle);
library.add(faCaretDown);
library.add(faDownload);
library.add(faTrash);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
