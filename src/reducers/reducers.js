import { combineReducers } from 'redux';
import { SET_FILTER, SET_MOVIES, SET_USER } from '../actions/actions';

const initialState = {
	movies: [],
	visibilityFilter: '',
	user: ''
}

const reducer = (state = initialState , action) => {
	switch (action.type) {
		case SET_FILTER: 
		return {
			...state,
			visibilityFilter: action.value
		}
		case SET_MOVIES:
			return {
				...state,
				movies: action.value
			}
		case SET_USER:
			return {
				...state,
				user: action.value
			}

		default:
			return state;
	}
}

export const moviesApp = combineReducers({
	app: reducer
});
