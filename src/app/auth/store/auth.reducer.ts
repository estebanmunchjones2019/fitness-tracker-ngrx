import * as AuthActions from './auth.actions';

export interface State {
    isAuth: boolean;
}

const initialState: State = {
    isAuth: false
}

export function authReducer(state: State, action: AuthActions.AuthActions) {
    switch(action.type) {
        case AuthActions.SET_AUTHENTICATED:
            return {
                ...state,
                isAuth: true
            }
        case AuthActions.SET_UNAUTHENTICATED:
            return {
                ...state,
                isAuth: false
            }
        default:
            return {
                ...state
            }
    }
}

export const getAuth = (state: State) => state.isAuth;