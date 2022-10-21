import {palitraReducer, InitialStateType, addColorAC, deleteColorAC, changeColorAC} from '../bll/palitraReducer'

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        colors: [
            {
                tint: 'black',
                id: '1',
            },
            {
                tint: 'red',
                id: '2',
            }
        ],
    }
})

test('correct color should be removed', () => {
    const endState = palitraReducer(startState, deleteColorAC('1'))

    expect(endState.colors.length).toBe(1)
    expect(endState.colors[0].id).toBe('2')
})

test('correct color should be added', () => {
    let color = {
        tint: 'blue',
        id: '3',
    }

    const endState = palitraReducer(startState, addColorAC(color))

    expect(endState.colors.length).toBe(3)
    expect(endState.colors[2].tint).toBe('blue')
    expect(endState.colors[0].id).toBe('1')
})

test('correct color should be change', () => {

    const endState = palitraReducer(startState, changeColorAC('1', 'blue'))

    expect(endState.colors.length).toBe(2)
    expect(endState.colors[0].tint).toBe('blue')
})