const projects = ( state, action ) => {

    switch ( action.type ) {
        case 'RECEIVE_DATA':
            return action.data.projects || state;

        case 'ADD_PROJECT':
            return state.concat([ action.data ]);

        case 'DELETE_PROJECT':
            return state.filter( project => project.id != action.data );

        default:
            return state || [];
    }

};

export default projects;
