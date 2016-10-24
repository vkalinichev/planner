const taskFilter = ( state, action )=> {

    switch ( action.type ) {
        case 'FILTER_TASKS':
            return action.data;

        default:
            return state || '';
    }

};

export default taskFilter;
