import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { fetchData} from './actions/actions'
import * as reducers from './reducers/reducers'
import './style.css';

import App from './components/App';
import TasksList from './components/TasksList';
import TaskNewModal from './components/TaskNewModal';
import TaskEditModal from './components/TaskEditModal';

reducers.routing = routerReducer;

const store = createStore( combineReducers( reducers ), applyMiddleware( thunkMiddleware ) );
const history = syncHistoryWithStore( browserHistory, store );

function run () {
    ReactDOM.render(
        <Provider store={ store } >
            <Router history={history}>
                <Route path='/' component={App} >
                    <Route path='/:projectId' component={ TasksList }>
                        <Route path='/:projectId/new' component={ TaskNewModal }/>
                        <Route path='/:projectId/:taskId' component={ TaskEditModal }/>
                    </Route>
                </Route>
            </Router>
        </Provider>,
        document.getElementById("root")
    );
}

function save () {
    const state = store.getState();

    fetch(`/api/data`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            projects: state.projects,
            tasks: state.tasks
        })
    })
}

function init() {
    run();
    store.subscribe( run );
    store.subscribe( save );
    store.dispatch( fetchData() )
}

init();
