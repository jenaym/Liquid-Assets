//
// User login component
//
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import classnames from 'classnames';

import { loginUser } from '../../store/actions/authActions';


//
// Styles for the Sign Up box
//
const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 1,
  },
  stext: {
    marginTop: 10,
    align: "bottom"
  },
  submit2: {
    marginTop: theme.spacing.unit * 5,
  },
});

//
// Derived Ract Component Class
//
class SignIn extends Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    const { classes }  = props;
    this.classes = classes; 
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/'); // redirect
    }
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }
  //
  // On Change event handler
  //
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  //
  // Sign-in form submit event handler
  //
  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  }

  //
  // Render the component
  //
  render() {
    const { errors } = this.state;

    return (
      <main className={this.classes.main}>
        <Paper className={this.classes.paper}>
          <Avatar className={this.classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={this.classes.form} onSubmit={this.onSubmit}>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input 
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.email
                })}
                autoComplete="email"
                autoFocus
              />
              {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                value={this.state.password}
                onChange={this.onChange}
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.password
                })}
                autoComplete="current-password"
                />
                {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.classes.submit}
            >
              Sign in
            </Button>
          </form>

          <CssBaseline />
          <Grid container spacing={16} alignItems="center">
            <Grid item xs={6} align="right" color="secondary" className="stext">
              Need an account?
            </Grid>
            <Grid item xs={6} align="center">
              <Button
                  type="submit"
                  size="medium"
                  variant="contained"
                  color="inherit"
                  className={this.classes.submit2}
                  href="/signup"
                >
                  Create Account
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default (connect(mapStateToProps, { loginUser }))(withStyles(styles)(SignIn));
