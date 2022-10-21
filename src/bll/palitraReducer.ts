import {AppActionsType} from "./store";

const initialState: InitialStateType = {
    colors: []
}

export const palitraReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'PALITRA/ADD-COLOR':
            return {...state, colors: [...state.colors, action.color]}
        case 'PALITRA/DELETE-COLOR':
            return {...state, colors: [...state.colors].filter((color: colorType) => color.id !== action.id)}
        case 'PALITRA/CHANGE-COLOR':
            return {
                ...state, colors: state.colors.map((color: colorType) => color.id === action.id
                    ? {...color, tint: action.newTint}
                    : color)
            }
        default:
            return state
    }
}

// actions
export const addColorAC = (color: colorType) => ({type: 'PALITRA/ADD-COLOR', color} as const)
export const deleteColorAC = (id: string) => ({type: 'PALITRA/DELETE-COLOR', id} as const)
export const changeColorAC = (id: string, newTint: string) => ({type: 'PALITRA/CHANGE-COLOR', id, newTint} as const)

//types
export type colorType = {
    tint: string
    id: string
}
export type InitialStateType = { colors: Array<colorType> }
export type PalitraActionType =
    | ReturnType<typeof addColorAC>
    | ReturnType<typeof deleteColorAC>
    | ReturnType<typeof changeColorAC>

