export default store => next => action => {
    console.groupCollapsed( ( new Date ).toLocaleTimeString(), action.type );
    console.log( 'before action', store.getState() );
    console.log( 'dispatching', action);
    next(action);
    console.log( 'after', store.getState() );
    console.groupEnd();
}
