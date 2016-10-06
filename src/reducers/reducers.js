export function showBack ( state, action ) {
    switch ( action.type ) {
        case 'SHOW_BACK':
            return action.data || false;
        default:
            return state || false
    }
}

export function taskFilter ( state, action ) {
    switch ( action.type ) {
        case 'FILTER_TASKS':
            return action.data;

        default:
            return state || '';
    }
}

export function tasks ( state, action ) {

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

export function projects ( state, action) {

    switch ( action.type ) {
        case 'RECEIVE_DATA':
            return action.data.projects || state;

        case 'ADD_PROJECT':
            let newProject = { name: action.data, id: +new Date };
            return state.concat([newProject]);

        default:
            return state || [];
    }
}

export function addingProject ( state, action ) {
    switch ( action.type ) {
        case "SHOW_ADD_PROJECT": return true;
        case "HIDE_ADD_PROJECT": return false;
        default: return !!state;
    }
}
