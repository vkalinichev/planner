export {
    showBack,
    taskFilter,
    tasks,
    projects,
    addingProject
};

function showBack ( state, action ) {
    switch ( action.type ) {
        case 'SHOW_BACK':
            return action.data || false;
        default:
            return state || false
    }
}

function taskFilter ( state, action ) {
    switch ( action.type ) {
        case 'FILTER_TASKS':
            return action.data;

        default:
            return state || '';
    }
}

function tasks ( state, action ) {

    switch ( action.type ) {
        case 'RECEIVE_DATA':
            return action.data.tasks || state;

        case 'ADD_TASK':
            let newTask = Object.assign( {}, action.data, {
                score: 1,
                id: +new Date
            } );
            return state.concat([newTask]);

        case 'UPDATE_TASK':
            let taskUpdate = action.data;

            return state.map( task => ( task.id !== taskUpdate.id ) ?
                task :
                Object.assign( {}, task, taskUpdate )
            );

        case 'DELETE_TASK':
            return state.filter( task => task.id !== action.data );

        default:
            return state || [];
    }
}

function projects ( state, action ) {

    switch ( action.type ) {
        case 'RECEIVE_DATA':
            return action.data.projects || state;

        case 'ADD_PROJECT':
            let newProject = {
                name: action.data,
                id: state.length ? state[state.length - 1 ].id + 1 : 1
            };
            return state.concat([newProject]);

        case 'DELETE_PROJECT':
            return state.filter( project => project.id != action.data );

        default:
            return state || [];
    }
}

function addingProject ( state, action ) {
    switch ( action.type ) {
        case "SHOW_ADD_PROJECT": return true;
        case "HIDE_ADD_PROJECT": return false;
        default: return !!state;
    }
}
