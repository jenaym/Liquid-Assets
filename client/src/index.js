import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import './App.css';
import registerServiceWorker from "./registerServiceWorker";
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './store/utils/setAuthToken';
import { setCurrentUser, logoutUser } from './store/actions/authActions';
import { MuiThemeProvider, createMuiTheme, withTheme } from '@material-ui/core/styles';
// import Hue from '@material-ui/core/colors/HUE'
import { blueGrey, cyan, grey } from '@material-ui/core/colors';
<<<<<<< HEAD
=======
import LiquidAssets from "./LiquidAssets";


const primaryGrey = blueGrey[500];
const secondaryCyan = cyan[400];
const font1 = "'Iceberg', cursive";
const font2 = "'Roboto', sans-serif";
>>>>>>> e103b486d41fc2a1001f6dd6c06e9eab4c88d4cd

const theme = createMuiTheme ({
  palette: {
    primary: {
<<<<<<< HEAD
      main: blueGrey[800]
=======
      main: grey[900],
>>>>>>> e103b486d41fc2a1001f6dd6c06e9eab4c88d4cd
    },
    secondary: {
      main: cyan[400],
      light: cyan.A200,
      dark: cyan[700],
    },
    type: 'dark'
  },
  typography: {
<<<<<<< HEAD
    fontFamily: [
      'Iceland',
      'Russo One',
      'VT323',
      'Iceberg',
      'Hind Madurai',
      'Roboto'
    ].join(',')
  },
  overrides: {
    Fab: {
      text: {
        color: grey[50] 
      }
    }
  }
=======
    fontFamily: font2,
  },
>>>>>>> e103b486d41fc2a1001f6dd6c06e9eab4c88d4cd

})

// check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  // decode the token and get user info
  const decoded = jwtDecode(localStorage.jwtToken);

  // set current user w/ decoded token and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // check for an expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // force the user log out
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}


ReactDOM.render(

  <Provider store={store}>

    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>

  </Provider>, document.getElementById("root"));

registerServiceWorker();
