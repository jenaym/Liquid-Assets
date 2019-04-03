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

class BrandStyleIntegrationAutosuggest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            suggestions: [],
        };
    }

    initSuggestions() {
        getBoozeSuggestions()
            .then(gottenBoozeSuggestions => {
                this.setState({
                    suggestions: gottenBoozeSuggestions,
                });
            })
            .catch(err => console.log(err));
    }

    // componentDidMount is where we
    componentDidMount() {
        this.initSuggestions();
    }

    getSuggestions(value) {
        const inputValue = deburr(value.trim()).toLowerCase();
        const inputLength = inputValue.length;
        let count = 0;

        return inputLength === 0
            ? []
            : // WE HAD TO MODIFY THIS BECUASE WE MOVED THIS PROPERTY INSIDE THIS CLASS.  IT WAS OUTSIDE THIS CLASS BEFORE
            this.state.suggestions.filter(suggestion => {
                const keep =
                    count < 5 &&
                    suggestion.label.slice(0, inputLength).toLowerCase() ===
                    inputValue;

                if (keep) {
                    count += 1;
                }

                return keep;
            });
    }

    handleSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value),
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    handleChange = name => (event, { newValue }) => {
        if (this.state.suggestions.length === 0) {
            this.initSuggestions();
        }
        this.setState({
            [name]: newValue,
        });
        this.props.updateBrandStyle(newValue);
    };

    render() {
        const { classes } = this.props;

        const autosuggestProps = {
            renderInputComponent,
            // ALSO HERE WE HAD TO UPDATE FROM suggestions: 'this.suggestion' to what we wrote below ...
            suggestions: this.state.suggestions,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            getSuggestionValue,
            renderSuggestion,
        };

        return (
            <Autosuggest
                {...autosuggestProps}
                inputProps={{
                    classes,
                    label: this.props.label,
                    placeholder: this.props.placeholder,
                    value: this.state.inputValue,
                    onChange: this.handleChange('inputValue'),
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

BrandStyleIntegrationAutosuggest.propTypes = {
    classes: PropTypes.object.isRequired,
    updateBrandStyle: PropTypes.func.isRequired,
    brandStyle: PropTypes.object.isRequired,
    bottleSize: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    brandStyle: state.brandStyle,
    bottleSize: state.bottleSize,
});

export default (connect(mapStateToProps, { updateBrandStyle }))(withStyles(styles)(BrandStyleIntegrationAutosuggest));
