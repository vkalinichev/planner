export {
    taskFilter,
    tasks,
    projects
};

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
            console.log(state, action.data);
            console.log(state.concat([ action.data ]));
            return state.concat([ action.data ]);

        case 'DELETE_PROJECT':
            return state.filter( project => project.id != action.data );

        default:
            return state || [];
    }
}
