import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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


const FormComponent = (props) => {
    return (

        <form className={'form-container'} noValidate autoComplete="off">

            <br></br>

            <TextField
                id="outlined-full-width"
                label="Input the brand of booze you be weighin' and it's vintage or style here playa!"
                style={{ margin: 5 }}
                placeholder="Pappy Van Winkle 15 yr"
                helperText="Make sure to use that auto-complete for high data fidelity homie"
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <br></br>
            <br></br>
            <br></br>

            <TextField
                id="outlined-full-width"
                label="What size bottle is this?  750mL 1000mL or some weird ass size?"
                style={{ margin: 5 }}
                placeholder="750 ml"
                helperText="we'll let you know exactly how many ounces of booze you got in that there bottle."
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <br></br>
            <br></br>
            <br></br>

            <TextField
                id="outlined-full-width"
                label="How many extra bottles of this you got stashed away? Not including this opened bottle"
                style={{ margin: 5 }}
                placeholder="12"
                helperText="this helps us calculate the total dollar value in your possesion for this product"
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <br></br>
            <br></br>
            <br></br>

            <TextField
                id="outlined-full-width"
                label="How much does this sauce cost you per bottle?"
                style={{ margin: 5 }}
                placeholder="17.00"
                helperText="We will tell you your cost per ounce!"
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <br></br>
            <br></br>
            <br></br>

            <TextField
                id="outlined-full-width"
                label="Throw it up on the scale and type in what it weighs, in gramz pleeze."
                style={{ margin: 5 }}
                placeholder="1432g"
                helperText="So much better than eyeball estimation.  When you go to the bank, and ask for your balance do you want the banker to be like: 'You got somewhere between like 10 and 15 thousand dollars you know give or take'.  Yeah, didn't think so... that's hella inaccurate."
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
            />

        </form>

    )
};
FormComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormComponent);