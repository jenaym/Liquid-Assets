import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, TextField, Grid, Paper, Button, Icon, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import BrandStyleIntegrationAutosuggest
    from './BrandStyleIntegrationAutosuggest';
import BottleSizeIntegrationAutosuggest
    from './BottleSizeIntegrationAutosuggest';
import { grey, pink, purple } from '@material-ui/core/colors'

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
        marginTop: 30
        // marginRight: 62,
    },
    gridContainer: {
        marginTop: 20,
        marginLeft: 20,
        padding: 20,
    },
    formInputs: {
        fontFamily: 'Iceberg',
        marginTop: 20
    }
};

const FormComponent = props => {
    // OverridesCss () => {
        
    // }
    return (
        <Grid container style={nateStyles.gridContainer}>
            <Grid item xs>
                <Paper 
                    style={nateStyles.paper}
                    elevation={0}
                >

                    <form
                        className={'form-container'}
                        noValidate
                        // Not sure how this works.
                        autoComplete="off"
                        style={{}}
                    >
                        {/* THIS IS HOW WE ACCOMPLISHED AUTOCOMPLETE */}
                        <BrandStyleIntegrationAutosuggest
                            id="outlined-full-width"
                            label={"Booze Name"}
                            style={nateStyles.formInputs}
                            placeholder="Pappy Van Winkle 15 yr"
                            color='secondary'
                            value={props.formInputs.brandstyle}
                            onChange={props.handleInputChange}
                            name="brandStyle"
                            autosuggest={props.autosuggest}
                            formInputErrors={props.formInputErrors.brandstyle}
                        />

                        <BottleSizeIntegrationAutosuggest
                            id="outlined-full-width"
                            label="Bottle Size in mL"
                            placeholder="750 ml"
                            // style={{ margin: 5 }}
                            helperText=""
                            name="brandStyle"
                            value={props.formInputs.bottleSize}
                            onChange={props.handleInputChange}
                            autosuggest={props.autosuggest}
                            formInputErrors={props.formInputErrors.bottleSize}
                        />

                        <TextField
                            id="outlined-full-width"
                            label="Backstock"
                            style={nateStyles.formInputs}
                            placeholder="12"
                            helperText=""
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
                            label="Cost Per Bottle"
                            style={{ marginTop: 20 }}
                            placeholder="17.00"
                            helperText=""
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
                            label="Product Weight In Grams"
                            style={{ marginTop: 20 }}
                            placeholder="1432"
                            helperText=""
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

                        <Grid item align="right" style={{ marginTop: 40, marginBottom: 'auto' }}>
                            <Fab
                                variant="contained"
                                color='secondary'
                                // style={{ backgroundColor: purple['A400'] }}
                                mini='true'
                                className="button"
                                onClick={props.postThenGet}
                                disabled={!props.formInputs.unopenedBottles || !props.formInputs.bottleCost || !props.formInputs.bottleWeight}
                            >
                                <AddIcon style={{color: grey[50]}} />
                            </Fab>
                        </Grid>
                        <div className="container ml-auto text-danger">
                            {props.formInputErrors.userId}
                            {props.formInputErrors.dataError}
                        </div>

                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};
FormComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormComponent);
