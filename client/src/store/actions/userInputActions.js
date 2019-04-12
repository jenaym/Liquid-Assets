/* --------------------------- */
/*    Redux action creators    */
/* --------------------------- */

import deburr from 'lodash/deburr';
import {
  UPDATE_INPUT_VALUE,
  UPDATE_BRAND_STYLE,
  UPDATE_BOTTLE_SIZE,
  CLEAR_SUGGESTIONS,
  MAYBE_UPDATE_SUGGESTIONS,
  LOAD_SUGGESTIONS_BEGIN,
  GET_BRAND_STYLE_ERROR,
  GET_BOTTLE_SIZE_ERROR,
} from './types';
import queryBooze from '../../LiquidAssets/autosuggest/queryBooze';



async function getMatchingBrandStyle(value) {
  const suggestions = await queryBooze();
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;


  const filtered = inputLength === 0 ? 
    [] : suggestions.filter(suggestion => {
      return suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;
    });
  console.log({ suggestions: JSON.stringify(filtered) }); // *** DEBUG ***
}

export function loadSuggestions(value) {
  return dispatch => {
    dispatch (loadSuggestionsBegin());
    dispatch (maybeUpdateSuggestions(getMatchingBrandStyle(value), value));
  };
}

export function updateInputValue(value) {
  return {
    type: UPDATE_INPUT_VALUE,
    value,
  };
}

export function updateBrandStyle(value) {
  return {
    type: UPDATE_BRAND_STYLE,
    value,
  };
}

export function updateBottleSize(value) {
  return {
    type: UPDATE_BOTTLE_SIZE,
    value,
  };
}

export function validateBrandStyle(value) {
  return ({
    type: GET_BRAND_STYLE_ERROR, 
    value
  });
}


export function validateBottleSize(value) {
  return ({
    type: GET_BOTTLE_SIZE_ERROR, 
    value
  });
}

export function clearSuggestions() {
  return {
    type: CLEAR_SUGGESTIONS,
  };
}

export function loadSuggestionsBegin() {
  return {
    type: LOAD_SUGGESTIONS_BEGIN,
  };
}

export function maybeUpdateSuggestions(suggestions, value) {
  return {
    type: MAYBE_UPDATE_SUGGESTIONS,
    suggestions,
    value,
  };
}

