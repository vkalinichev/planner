import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import tasks from './tasks'
import projects from './projects'
import taskFilter from './taskFilter'

const plannerApp = combineReducers({
    projects,
    tasks,
    taskFilter,
    routing
});

export default plannerApp;
