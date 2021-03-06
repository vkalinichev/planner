import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { fetchProjects, fetchTasks } from './actions/actions';
import './style.css';

import App from './components/app/App';
import DevTools from './containers/DevTools'
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
            <div className='app' >
                <Router history={ history }>
                    <Route path='/' component={ App } >
                        <Route path=':projectId' component={ TasksList }>
                            <Route path='new' component={ TaskNew }/>
                            <Route path=':taskId' component={ TaskEdit }/>
                        </Route>
                    </Route>
                </Router>
                <DevTools />
            </div>
        </Provider>,
        document.getElementById("root")
    );
}

function save () {
    const state = store.getState();

    fetch(`/tasks`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tasks: state.tasks
        })
    })
}

function init() {
    run();
    store.dispatch( fetchProjects() ).then(
        store.dispatch( fetchTasks() )
    )
}

init();
