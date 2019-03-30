import React from 'react';
import { AppBar, Toolbar, Typography, Button, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from './actions/authActions';

const NavbarComponent = (props) => {
    function onLogoutClick(e) {
        e.preventDefault();
        props.logoutUser();
    }
    const { isAuthenticated, user } = props.auth;
    const authLinks = (
        <Grid item xs align='right'>
            <Button
                color="inherit"
                href="/login"
                onClick={onLogoutClick}>
                Logout
                <img
                    className="rounded-circle ml-1"
                    src={user.avatar} alt={user.name}
                    style={{ width: '25px', marginRight: '3px' }}
                    title="You need to have a Gravatar connected to your email to display an image" />
            </Button>
        </Grid>

    );
    const guestLinks = (
        <Grid item xs align='right'>
            <Button color="inherit" href="/login">
                Log In
            </Button>
        </Grid>

    );

    return (
        <AppBar position="static">
            <Toolbar>
                <Grid container>
                    <Grid item xs align='right'>
                        <Typography variant="title" color="inherit" className='Typography'>
                            LIQUID ASSETS
                        </Typography>
                    </Grid>
                    {isAuthenticated ? authLinks : guestLinks}
                </Grid>
            </Toolbar>
        </AppBar>
    )
};

NavbarComponent.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(NavbarComponent);