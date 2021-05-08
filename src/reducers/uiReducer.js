import { types } from "../types/types";

const initialState = {
    loading: false,
    mgError: null
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.uiSetError:

            return {
                ...state,
                msgError: action.payload
            };
        case types.uiRemoveError:

            return {
                ...state,
                msgError: null  //quiza podria colocar un mensaje con payload para decir formulario correcto o algo asi
            };

        case types.uiStartLoading:
            return {
                ...state,
                msgError: true
            }

        case types.uiFinishLoading:
            return {
                ...state,
                msgError: false
            }
        default:
            return state;
    }
}
