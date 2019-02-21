import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard';
import * as serviceWorker from './serviceWorker';
import './styles/main/css/normalize.css';

if (typeof(localStorage) !== 'undefined') {
    ReactDOM.render(<Dashboard />, document.getElementById('root'));
} else {
    alert ('LocalStorage required for presistent data.  Please use a newer browser.');
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
