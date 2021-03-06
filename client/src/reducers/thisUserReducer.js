const initialState = null;

const thisUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_USER_SUCCESS':
            return action.payload;
        
        case 'FETCH_USER_FAILURE':
            return null;
        
        case 'CLEAR':
            return initialState;
        
        default:
            return state;
    }
}

export default thisUserReducer;