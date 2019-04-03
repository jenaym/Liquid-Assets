import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles, TextField, Grid, Paper, Button} from '@material-ui/core';
import BrandStyleIntegrationAutosuggest
  from './BrandStyleIntegrationAutosuggest';
import BottleSizeIntegrationAutosuggest
  from './BottleSizeIntegrationAutosuggest';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

const nateStyles = {
  paper: {
    padding: 40,
    marginTop: 30,
    marginRight: 62,
  },
  gridContainer: {
    marginTop: 20,
    marginLeft: 40,
    padding: 20,
  },
};

const FormComponent = props => {
  return (
    <Grid container style={nateStyles.gridContainer}>
      <Grid item xs>
        <Paper style={nateStyles.paper}>

          <form
            className={'form-container'}
            noValidate
            // Not sure how this works.
            autoComplete="off"
          >
            {/* THIS IS HOW WE ACCOMPLISHED AUTOCOMPLETE */}
            <BrandStyleIntegrationAutosuggest
              id="brandStyle"
              label="Input the brand of booze you be weighin' and it's vintage or style here playa!"
              placeholder="Pappy Van Winkle 15 yr"
              value={props.formInputs.brandstyle}
              onChange={props.handleInputChange}
              name="brandStyle"
              autosuggest={props.autosuggest}
            />

            <BottleSizeIntegrationAutosuggest
              id="bottleSize"
              label="What size bottle is this?  750mL 1000mL or some weird ass size?"
              placeholder="750 ml"
              helperText="we'll let you know exactly how many ounces of booze you got in that there bottle."
              name="brandStyle"
              value={props.formInputs.bottleSize}
              onChange={props.handleInputChange}
              autosuggest={props.autosuggest}
            />

            <TextField
              id="outlined-full-width"
              label="How many extra bottles of this you got stashed away? Not including this opened bottle"
              style={{margin: 5}}
              placeholder="12"
              helperText="this helps us calculate the total dollar value in your possesion for this product"
              fullWidth
              margin="normal"
              variant="outlined"
              name="unopenedBottles"
              value={props.formInputs.unopenedBottles}
              onChange={props.handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              id="outlined-full-width"
              label="How much does this sauce cost you per bottle?"
              style={{margin: 5}}
              placeholder="17.00"
              helperText="We will tell you your cost per ounce!"
              fullWidth
              margin="normal"
              variant="outlined"
              name="bottleCost"
              value={props.formInputs.bottleCost}
              onChange={props.handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              id="outlined-full-width"
              label="Throw it up on the scale and type in what it weighs, in gramz pleeze."
              style={{margin: 5}}
              placeholder="1432g"
              helperText="So much better than eyeball estimation.  When you go to the bank, and ask for your balance do you want the banker to be like: 'You got somewhere between like 10 and 15 thousand dollars you know give or take'.  Yeah, didn't think so... that's hella inaccurate."
              fullWidth
              margin="normal"
              variant="outlined"
              name="bottleWeight"
              value={props.formInputs.bottleWeight}
              onChange={props.handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Grid item align="right" style={{marginTop: 20}}>
              <Button
                variant="contained"
                className="button"
                onClick={props.postThenGet}
              >

                Send To Inventory
              </Button>
            </Grid>

          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};
FormComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles (styles) (FormComponent);
