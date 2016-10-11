import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { fetchData} from './actions/actions'
import * as reducers from './reducers/reducers'
import './style.css';

import App from './components/app/App';
import TasksList from './components/tasks/TasksList';
import Task from './components/tasks/Task';

reducers.routing = routerReducer;

const store = createStore(
    combineReducers( reducers ),
    applyMiddleware( thunkMiddleware )
);

const history = syncHistoryWithStore(
    browserHistory,
    store
);

window.store = store;

function run () {
    render(
        <Provider store={ store } >
            <Router history={ history }>
                <Route path='/' component={ App } >
                    <Route path='/:projectId' component={ TasksList }>
                        <Route path='/:projectId/:taskId' component={ Task }/>
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
