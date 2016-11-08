import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import auth from './auth'
import tasks from './tasks'
import projects from './projects'
import taskFilter from './taskFilter'

const plannerApp = combineReducers({
    auth,
    projects,
    tasks,
    taskFilter,
    routing
});

export default plannerApp;
