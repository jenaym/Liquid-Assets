//
// Autosuggest facilitator functions
//

import React from 'react';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


export function renderInputComponent (inputProps) {
  const {classes, inputRef = () => {}, ref, ...other} = inputProps;

  return (
    <TextField
      // id="standard-name"
      variant="outlined"
      className={classes.textField}
      fullWidth
      InputProps={{
        inputRef: node => {
          ref (node);
          inputRef (node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

export function renderSuggestion (suggestion, {query, isHighlighted}) {
  const matches = match (suggestion.label, query);
  const parts = parse (suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map (
          (part, index) =>
            part.highlight
              ? <span key={String (index)} style={{fontWeight: 500}}>
                  {part.text}
                </span>
              : <strong key={String (index)} style={{fontWeight: 300}}>
                  {part.text}
                </strong>
        )}
      </div>
    </MenuItem>
  );
}

export function getSuggestionValue (suggestion) {
  return suggestion.label;
}
