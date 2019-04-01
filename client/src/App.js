import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import LiquidAssets from './LiquidAssets'
import NavbarComponent from './NavbarComponent'
import Signup from './components/user/register';
import Login from './components/user/login';
import PrivateRoute from './components/user/privateRoute';

import ReactVirtualizedTable from './LiquidAssets/TableComponent'


import axios from 'axios';
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


class App extends Component {
  state = {
    formInputs: {
      brandStyle: ``,
      bottleSize: ``,
      unopenedBottles: ``,
      bottleCost: ``,
      bottleWeight: ``,
    }
  };


  // TODO: this needs to go inside of a onClick handler function that can be passed into the button.  This will post the state of the form to the route that I choose the post route to be.  Might have to make a variable and put the states into a variable

  componentDidMount() {
    this.getAlcohol();
  }

  getAlcohol = () => {
    return axios.get('/api/alcohol')
      .then((response) => {
        console.log(response);
        this.setState({
          brandStyle: response.brandStyle,
          bottleSize: response.bottleSize,
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState((state) => ({
      formInputs: {
        ...state.formInputs,
        [name]: value,
      }
    }));
  };

  postToInventory = () => {
    console.log("Posting Inventory");
    return axios.post('/api/inventory', {
      brandStyle: this.state.formInputs.brandStyle,
      sizeML: this.state.formInputs.bottleSize,
      costPerBottle: this.state.formInputs.bottleCost,
      totalBottles: this.state.formInputs.unopenedBottles,
      measuredWeight: this.state.formInputs.bottleWeight
    })
      .then((response) => {
        console.log(response)
      })
      
  }
 
  getUserInventory = () => {
    return axios.get('/api/inventory') 
        .then((response) => {
            console.log(response);
            
            var input = response.data;

                let inventoryData = Object.values(input)
                // for (var i = 0; i < inventoryData.length; i++) {
                    var output = inventoryData.map(function(obj) {
                        return Object.keys(obj).sort().map(function(key) { 
                          return obj[key];
                        });
                      });

                    for (var i = 0; i < output.length; i++) {
                        // userData.push(output[i]);
                        data.push(output[i]);
                    }
                    
                    let id = 0;
                    function createData(type, brandStyle, bottleSizeML, bottleSizeOZ, bottleCost, ozLeft, percentLeft, costPerOZ, openBottleValue, totalBottlesPerBrandStyle, totalValuePerBrandStyle) {
                        id += 1;
                        return { id, type, brandStyle, bottleSizeML, bottleSizeOZ, bottleCost, ozLeft, percentLeft, costPerOZ, openBottleValue, totalBottlesPerBrandStyle, totalValuePerBrandStyle };
                    }
                    
                    const rows = [];
                    
                    for (let i = 0; i < 200; i += 1) {
                        const randomSelection = data[Math.floor(Math.random() * data.length)];
                        rows.push(createData(...randomSelection));
                    }

            
            
            // console.log(userData);
            console.log(data);

        })
        .catch((error) => {
            console.log(error);
        });
}


  check = () => {
    console.log(this.state)
  }

  render() {

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
                  exact path="/"
                  render={(props) => 
                    <LiquidAssets
                      {...props}
                      formInputs={this.state.formInputs}
                      handleInputChange={this.handleInputChange}
                      postToInventory={this.postToInventory}
                      getUserInventory={this.getUserInventory}
                    />
                  }
                />
              </Switch>
            </div>

            {/* <FormComponent 
            handleInputChange={this.handleInputChange}
            />
            <ImageComponent />
            <TableComponent /> */}
            <ReactVirtualizedTable
              data={this.getUserInventory}
            ></ReactVirtualizedTable> 

          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
