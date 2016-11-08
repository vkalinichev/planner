const initial = {
    isFetching: false,
    isAuthorized: false
}

const auth = ( state = initial, action ) => {

    switch ( action.type ) {
        case 'AUTH_REQUEST':
            return {
                ...state,
                isFetching: true
            }

        case 'AUTH_RECEIVE':
            return {
                ...state,
                isFetching: false,
                isAuthorized: action.data
            }

        default:
            return state || {}
    }

}

export default auth
