/* ------------------- */
/*    Redux reducer    */
/* ------------------- */

import { 
  UPDATE_BRAND_STYLE,
  CLEAR_SUGGESTIONS,
  LOAD_SUGGESTIONS_BEGIN,
  MAYBE_UPDATE_SUGGESTIONS
 } from '../actions/types';

const initialState = {
  brandStyle: '',
  suggestions: [],
  isLoading: false,
};

export default function userInputReducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_BRAND_STYLE:
      return {
        ...state,
        brandStyle: action.value,
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
