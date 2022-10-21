import {AxiosError, AxiosResponse} from 'axios';
import {appAPI} from "../api/api";
import {setAppStatusAC} from "./appReducer";
import {AppActionsType, AppDispatchType, AppThunkType} from "./store";

const initialState: InitialStateType = {response: null}

export const formReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'FORM/SET-RESPONSE':
            return {...state, response: JSON.stringify(action.response, null, 1)}
        default:
            return state
    }
}

// actions
export const setResponseAC = (response: AxiosResponse) =>
    ({type: 'FORM/SET-RESPONSE', response} as const)

// thunks
export const setResponseTC = (data: FormData): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    appAPI.sendForm(data)
        .then(res => {
            dispatch(setResponseAC(res))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e: AxiosError<{ error: string }>) => {
            dispatch(setAppStatusAC('failed'))
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            console.log('Error: ', {...e})
        })
}

//types
export type InitialStateType = { response: string | null }
export type FormActionsType = | ReturnType<typeof setResponseAC>

