import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { getBoozeSizeSuggestions } from './autosuggest/queryBooze';
import {
  renderInputComponent,
  renderSuggestion,
  getSuggestionValue,
} from './autosuggest/renderProps';
import { updateBottleSize } from '../store/actions/userInputActions';

//
// Auto-suggest text box styles
//
const styles = theme => ({
  root: {
    height: 250,
    flexGrow: 1,
  },
  container: {
    padding: theme.spacing.unit * 1.5,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

class BottleSizeIntegrationAutosuggest extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      inputValue: '',
      suggestions: [],
      errors: {},
    };
  }

  initSuggestions () {
    let query = null;
    if (this.props.brandStyle) {
      query = `brandStyle=${this.props.brandStyle}`
    }
    getBoozeSizeSuggestions(query)
    .then(gottenBoozeSizeSuggestions => {
      console.log({gottenBoozeSizeSuggestions: gottenBoozeSizeSuggestions});
      this.setState ({
        suggestions: gottenBoozeSizeSuggestions,
      });
    })
    .catch(err => console.log(err));
  }

  // componentDidMount is where we
  componentDidMount () {
    this.initSuggestions();
  }

  componentDidUpdate() {
    // this is added primarily for clearing
    // Note the two variables have circular dependancy
    if (this.state.inputValue !== this.props.bottleSize) {
      this.setState({
        inputValue: this.props.bottleSize
      })
    }
    if (this.state.errors !== this.props.error) {
      this.setState({errors: this.props.error});
    }
    if (this.state.suggestions.length === 0) {
      this.initSuggestions ();
    }
  }


  getSuggestions(value) {
    const inputValue = deburr (value.trim ()).toLowerCase ();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : // WE HAD TO MODIFY THIS BECUASE WE MOVED THIS PROPERTY INSIDE THIS CLASS.  IT WAS OUTSIDE THIS CLASS BEFORE
        this.state.suggestions.filter (suggestion => {
          const keep =
            count < 5 &&
            suggestion.label.slice (0, inputLength).toLowerCase () ===
              inputValue;

          if (keep) {
            count += 1;
          }

          return keep;
        });
  }

  handleSuggestionsFetchRequested = ({value}) => {
    this.setState ({
      suggestions: this.getSuggestions (value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState ({
      suggestions: [],
    });
  };

  handleChange = name => (event, {newValue}) => {
    this.setState ({
      [name]: newValue,
    });
    event.target.name = "bottleSize";
    this.props.onChange(event);
    this.props.updateBottleSize(newValue);
  };

  render () {
    const {classes} = this.props;

    const autosuggestProps = {
      renderInputComponent,
      // ALSO HERE WE HAD TO UPDATE FROM suggestions: 'this.suggestion' to what we wrote below ...
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
    };

    let invalidInput = false;
    let label = this.props.label;

    // error: true,
    // label: '<error message>'
    if (this.state.errors) {
      invalidInput = true;
      label = this.state.errors;
    }

    return (
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          classes,
          label: this.props.label,
          // label: label,
          placeholder: this.props.placeholder,
          value: this.state.inputValue,
          onChange: this.handleChange('inputValue'),
          // ...inputValidation,
          error: invalidInput,
        }}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderSuggestionsContainer={options => (
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )}
      />
    );
  }
}

BottleSizeIntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
  updateBottleSize: PropTypes.func.isRequired,
  brandStyle: PropTypes.string.isRequired,
  bottleSize: PropTypes.string.isRequired,
  // error: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  brandStyle: state.brandStyle.brandStyle,
  bottleSize: state.bottleSize.bottleSize,
  error: state.bottleSize.error
});

export default (connect(mapStateToProps, { updateBottleSize }))(withStyles(styles)(BottleSizeIntegrationAutosuggest));
