import * as types from '../types';

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
    user: {}

}
const mainReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.SET_USER:

            return { ...action.payload }

            break;

        case types.GET_USER:

            return { authenticated: action.payload }

            break;

        case types.GET_USER:

            return { ...initialState }

            break;

        default:
            return { ...state }
            break;
    }

}

export default mainReducer
