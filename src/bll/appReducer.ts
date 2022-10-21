import {AppActionsType} from "./store";

const initialState: InitialStateType = {status: 'idle',}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        default:
            return {...state}
    }
}

// actions
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

// types
export type InitialStateType = { status: RequestStatusType }
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ActionsTypeApp = ReturnType<typeof setAppStatusAC>



