//
// User sign-up component
//
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

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
    marginTop: theme.spacing.unit * 2,
  },
});

//
// Derived Ract Component Class
//
class SignUp extends Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    const { classes }  = props;
    this.classes = classes; 
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
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
  // Sign-up form submit event handler
  //
  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  //
  // Render the component
  //
  render() {
    const { errors } = this.state;
    // const { user } = this.props.auth;

    return (
      <main className={this.classes.main}>
        {/* {user ? user.name : null} */}
        <CssBaseline />
        <Paper className={this.classes.paper}>
          <Avatar className={this.classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Typography component="h3" variant="h6">
            Create your account
          </Typography>
          <form  onSubmit={this.onSubmit}>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="name">Your Name</InputLabel>
              <Input 
                id="name"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.name
                })}
                autoFocus
              />
              {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
            </FormControl>
            <FormControl margin="normal" required fullWidth>
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
              />
              {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
            </FormControl>
            <FormControl margin="normal" required fullWidth>
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
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password2">Confirm Password</InputLabel>
              <Input 
                name="password2"
                type="password"
                id="password2"
                value={this.state.password2}
                onChange={this.onChange}
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.password2
                 })}
                />
              {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
            </FormControl>
  
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.classes.submit}
            >
              Sign Up
            </Button>
          </form>
        </Paper>
      </main>
    );
  }  
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

// export default withStyles(styles)(SignUp);
export default (connect(mapStateToProps, { registerUser }))(withRouter((withStyles(styles)(SignUp))));
