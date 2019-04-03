import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './store/utils/setAuthToken';
import { setCurrentUser, logoutUser } from './store/actions/authActions';
import './App.css';
import LiquidAssets from './LiquidAssets';
import NavbarComponent from './NavbarComponent';
import Signup from './components/user/register';
import Login from './components/user/login';
import PrivateRoute from './components/user/privateRoute';

//import {AppProvider, Page} from '@shopify/polaris';
import DataTable from './DataTable';


// import ReactVirtualizedTable from './LiquidAssets/TableComponent'


import axios from 'axios';
import { Paper, Grid } from '@material-ui/core';
import { arrayOf } from 'prop-types';
// import FormComponent from "./LiquidAssets/FormComponent";
// import ImageComponent from "./LiquidAssets/ImageComponent";
// import TableComponent from "./LiquidAssets/TableComponent";

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

var data = [];
var updated = false;

// const headings = [
//   'Alcohol Type',
//   'Brand/Style',
//   'Size mL',
//   'Cost Per Bottle',
//   'Oz Left in Open Bottle',
//   'Percent Left in Open Bottle',
//   'Open Bottle Value',
//   'Total Bottles in Inventory',
//   'Total Value in Stock'
// ]




class App extends Component {
  
  state = {
    rows: [],
    formInputs: {
      brandStyle: ``,
      bottleSize: ``,
      unopenedBottles: ``,
      bottleCost: ``,
      bottleWeight: ``,
    },
    auth: {}, // user authentication { isAuthenticated, user }
  };

  unsubscribe = store.subscribe(() => {
    // debug only can't modify, i.e. setState here
    // console.log(store.getState().brandStyle.brandStyle);
  });

  // TODO: this needs to go inside of a onClick handler function that can be passed into the button.  This will post the state of the form to the route that I choose the post route to be.  Might have to make a variable and put the states into a variable

  componentDidMount() {
    this.setState({
      auth: store.getState().auth,
    });
    this.getAlcohol();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.auth !== store.getState().auth) {
      this.setState({
        auth: store.getState().auth,
        formInputs: {
          brandStyle: store.getState().brandStyle.brandStyle,
          bottleSize: store.getState().bottleSize.bottleSize
        }

      });
    }
    if (this.state.formInputs.brandStyle !== store.getState().brandStyle.brandStyle) {
      this.setState(state => ({
        formInputs: {
          ...state.formInputs,
          brandStyle: store.getState().brandStyle.brandStyle
        },
      }));
    }
    if (this.state.formInputs.bottleSize !== store.getState().bottleSize.bottleSize) {
      this.setState(state => ({
        formInputs: {
          ...state.formInputs,
          bottleSize: store.getState().bottleSize.bottleSize
        },
      }));
    }
  }

  getAlcohol = () => {
    return axios
      .get('/api/alcohol')
      .then(response => {
        console.log(response);
        this.setState({
          brandStyle: response.brandStyle,
          bottleSize: response.bottleSize,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState(state => ({
      formInputs: {
        ...state.formInputs,
        [name]: value,
      },
    }));
  };

  postToInventory = () => {
    console.log('Posting Inventory ' + this.state.auth.user.id);

    return new Promise((resolve, reject) => {
      axios
        .post('/api/inventory', {
          // brandStyle: this.state.formInputs.brandStyle,
          // sizeML: this.state.formInputs.bottleSize,
          brandStyle: store.getState().brandStyle.brandStyle,
          sizeML: store.getState().bottleSize.bottleSize,
          costPerBottle: this.state.formInputs.bottleCost,
          totalBottles: this.state.formInputs.unopenedBottles,
          measuredWeight: this.state.formInputs.bottleWeight,
          userId: this.state.auth.user.id,
        })
        .then(response => {
          console.log(response)
          resolve(response);
        })
        .catch(err => {
          console.log('err', err);
          reject(err);
        })
    });
  };



  getUserInventory = () => {
    console.log('Getting User Inventory');
    return axios
      .get('/api/inventory'
        , {

          params: {
            brandStyle: this.state.formInputs.brandStyle,
            sizeML: this.state.formInputs.bottleSize,
            costPerBottle: this.state.formInputs.bottleCost,
            totalBottles: this.state.formInputs.unopenedBottles,
            measuredWeight: this.state.formInputs.bottleWeight,
            userId: this.state.auth.user.id,
          },
        })
      .then((response => {
        console.log(response);
        
        var input = response.data;

        let inventoryData = Object.values(input)
        // for (var i = 0; i < inventoryData.length; i++) {
        var output = inventoryData.map(function (obj) {
          return Object.keys(obj).sort().map(function (key) {
            return obj[key];
          });
        });

        for (var i = 0; i < inventoryData.length; i++) {
          // userData.push(output[i]);
          
            let type = output[i][10];
            let brandStyle = output[i][0];

            let sizeML = output[i][6];
            let sizeOz = output[i][7];
            let costPerBottle = output[i][1];
            let percentLeft = output[i][5];
            let currentValue = output[i][3];
            let totalBottles = output[i][8];
            let totalvalue = output[i][9];

          let newArray = [type, brandStyle, sizeML, sizeOz, costPerBottle, percentLeft, currentValue, totalBottles, totalvalue];

          console.log(newArray);
          
          
         // }
          data.unshift(newArray);
        }

        console.log(data)
        this.setState({
          rows: data,
        })

        }))
    
  };


  postThenGet = () => {
    this.postToInventory()
      .then (res => {
        console.log ('TESTING');

        data = [];
        this.getUserInventory ();
        this.setState({
          rows: data,
        
        })
      })
      .catch (err => {
        console.log ('err', err);
      });
  };

  check = () => {
    console.log (this.state);
  };

  render() {

    const headings = [
      'Alcohol Type',
      'Brand/Style',
      'Size mL',
      'Cost Per Bottle',
      'Oz Left in Open Bottle',
      'Percent Left in Open Bottle',
      'Open Bottle Value',
      'Total Bottles in Inventory',
      'Total Value in Stock'
    ]

    return (
      
      <Provider store={store}>
        <Router>
          <div className="App">

            <NavbarComponent />
            <div className="container">
              <Switch>
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
                <Route
                  exact
                  path="/"
                  render={props => (
                    <LiquidAssets
                      {...props}
                      formInputs={this.state.formInputs}
                      handleInputChange={this.handleInputChange}
                      postToInventory={this.postToInventory}
                      getUserInventory={this.getUserInventory}
                      postThenGet={this.postThenGet}
                      
                    />
                  )}
                />

            </Switch>
            <Grid container>
              <Grid item xs>
              <Paper>
                <DataTable headings={headings} rows={this.state.rows} />
              </Paper>
              </Grid>
            </Grid>
            </div>


          </div>
        </Router>
      </Provider>
      
    );
  }
}

export default App;
