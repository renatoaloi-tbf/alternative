import {cloneDeep} from 'lodash';
const INITIAL_STATE = {
	currentScreen: ''
};

const push = (state, {payload}) => {
	const newState = cloneDeep(state);
	newState.currentScreen = payload;
	return newState;
};

export const menu = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'PUSH':
			return push(state, action);
		default:
			return state;
	}
};
