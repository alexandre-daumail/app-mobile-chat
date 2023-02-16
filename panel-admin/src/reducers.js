const initialState = { counter: 0 };

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'INCREMENT_COUNTER':
            return { counter: state.counter + 1 };
        default:
            return state;
    }
}
