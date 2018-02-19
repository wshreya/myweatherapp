import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./redux/store";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
<Provider store={store}>
				<Router>
					<Switch>
						<Route component={App}/>
					</Switch>
				</Router>
</Provider>,
  document.getElementById("root"));
registerServiceWorker();
