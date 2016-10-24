import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import tasks from './tasks'
import projects from './projects'
import taskFilter from './taskFilter'

const plannerApp = combineReducers({
    projects,
    tasks,
    taskFilter,
    routing: routerReducer
});

export default plannerApp;
