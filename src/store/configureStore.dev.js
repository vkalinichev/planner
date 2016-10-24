import { createStore, applyMiddleware, compose } from 'redux'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

const configureStore = preloadedState => {
    const store = createStore(
        rootReducer,
        preloadedState,
        compose(
            applyMiddleware(
                thunk,
                createLogger( { collapsed: true } ),
                routerMiddleware( browserHistory )
            )
        )
    );

    if ( module.hot ) {
        module.hot.accept( '../reducers', () => {
            const nextRootReducer = require( '../reducers' ).default
            store.replaceReducer( nextRootReducer )
        } )
    }

    return store
}

export default configureStore
