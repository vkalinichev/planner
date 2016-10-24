const tasks = ( state, action ) => {

    switch ( action.type ) {
        case 'RECEIVE_DATA':
            return action.data.tasks || state;

        case 'ADD_TASK':
            return state.concat([ action.data ]);

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

};

export default tasks;
