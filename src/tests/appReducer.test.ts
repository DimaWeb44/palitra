import {appReducer, InitialStateType, setAppStatusAC} from '../bll/appReducer'

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        status: 'idle',
    }
})

test('correct status should be set', () => {

    const endState = appReducer(startState, setAppStatusAC('loading'))

    expect(endState.status).toBe('loading');
})

