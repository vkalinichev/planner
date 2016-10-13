import history from "../routes/history";

export default store => next => action => {

    if ( ! action.redirect ) return next(action);

    history.replaceState(null, action.redirect);
}
