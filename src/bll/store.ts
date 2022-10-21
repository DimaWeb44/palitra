import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {ActionsTypeApp, appReducer} from "./appReducer";
import {FormActionsType, formReducer} from "./formReducer";
import {PalitraActionType, palitraReducer} from "./palitraReducer";

export const rootReducer = combineReducers({
    app: appReducer,
    palitra: palitraReducer,
    form: formReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppActionsType =
    | ActionsTypeApp
    | PalitraActionType
    | FormActionsType
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = ThunkDispatch<RootStateType, unknown, AppActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store;