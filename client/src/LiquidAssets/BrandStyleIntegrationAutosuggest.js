import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import getBoozeSuggestions from './autosuggest/queryBooze';
import {
    renderInputComponent,
    renderSuggestion,
    getSuggestionValue,
} from './autosuggest/renderProps';
import { updateBrandStyle } from '../store/actions/userInputActions';

//
// Auto-suggest text box styles
//
const styles = theme => ({
    root: {
        height: 250,
        flexGrow: 1,
    },
    container: {
        padding: "0px 0px 20px 0px",
        'margin-top': '16px',
        'margin-bottom': '8px'
    },
    suggestionsContainerOpen: {
        // position: 'absolute',
        zIndex: 4,
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

class BrandStyleIntegrationAutosuggest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      suggestions: [],
      errors: "",
    };
    this.suggestions = [];
  }

  initSuggestions () {
    if (this.suggestions.length === 0) {
      getBoozeSuggestions()
      .then(gottenBoozeSuggestions => {
        this.suggestions = gottenBoozeSuggestions;
        this.setState ({
          suggestions: this.suggestions,
        });
      })
      .catch(err => console.log(err));  
    } else {
      this.setState ({
        suggestions: this.suggestions,
      });
    }
  }

  // componentDidMount is where we
  componentDidMount () {
    this.initSuggestions();
  }

  componentDidUpdate() {
    // this is added primarily for clearing
    // Note the two variables have circular dependancy
    if (this.state.inputValue !== this.props.brandStyle) {
      this.setState({
        inputValue: this.props.brandStyle
      });
    }
    if (this.state.errors !== this.props.error) {
      this.setState({errors: this.props.error});
    }
    if (this.state.suggestions.length === 0) {
      this.initSuggestions();
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
      suggestions: this.getSuggestions(value),
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
    event.target.name = "brandStyle";
    this.props.onChange(event);
    this.props.updateBrandStyle(newValue);
  };

  render () {
    const {classes} = this.props;
    const inputValidation = { error: false };
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
          // label: label,
          label: this.props.label,
          placeholder: this.props.placeholder,
          value: this.state.inputValue,
          onChange: this.handleChange('inputValue'),
          // ...inputValidation
          error: invalidInput,
        }}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderSuggestionsContainer={options => (
          <Paper 
            {...options.containerProps} 
          >
            {options.children}
          </Paper>
        )}
      />
    );
  }
}

BrandStyleIntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
  updateBrandStyle: PropTypes.func.isRequired,
  brandStyle: PropTypes.string.isRequired,
  bottleSize: PropTypes.string.isRequired,
  // error: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  brandStyle: state.brandStyle.brandStyle,
  bottleSize: state.bottleSize.bottleSize,
  error: state.brandStyle.error,
});

export default (connect(mapStateToProps, { updateBrandStyle }))(withStyles(styles)(BrandStyleIntegrationAutosuggest));
