/* ------------------- */
/*    Redux reducer    */
/* ------------------- */

import { 
  UPDATE_BOTTLE_SIZE,
  CLEAR_SUGGESTIONS,
  LOAD_SUGGESTIONS_BEGIN,
  MAYBE_UPDATE_SUGGESTIONS
 } from '../actions/types';

const initialState = {
  bottleSize: '',
  suggestions: [],
  isLoading: false,
};

export default function userInputReducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_BOTTLE_SIZE:
      return {
        ...state,
        bottleSize: action.value,
      };

    case CLEAR_SUGGESTIONS:
      return {
        ...state,
        suggestions: [],
      };

    case LOAD_SUGGESTIONS_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case MAYBE_UPDATE_SUGGESTIONS:
      // Ignore suggestions if input value changed
      if (action.value !== state.value) {
        return {
          ...state,
          isLoading: false,
        };
      }

      return {
        ...state,
        suggestions: action.suggestions,
        isLoading: false,
      };

    default:
      return state;
  }
}
