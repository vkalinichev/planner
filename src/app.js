import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { fetchData } from './actions/actions';
import './style.css';

import App from './components/app/App';
import TasksList from './components/tasks/TasksList';
import TaskEdit from './components/tasks/TaskEdit';
import TaskNew from './components/tasks/TaskNew';

import configureStore from './store/configureStore'

const store = configureStore()

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
                    <Route path=':projectId' component={ TasksList }>
                        <Route path='new' component={ TaskNew }/>
                        <Route path=':taskId' component={ TaskEdit }/>
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
    store.subscribe( save );
    store.dispatch( fetchData() )
}

init();
