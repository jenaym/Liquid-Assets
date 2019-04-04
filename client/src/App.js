import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateBrandStyle, updateBottleSize, validateBrandStyle, validateBottleSize } from './store/actions/userInputActions';
import './App.css';
import LiquidAssets from './LiquidAssets';
import NavbarComponent from './NavbarComponent';
import Signup from './components/user/register';
import Login from './components/user/login';
import PrivateRoute from './components/user/privateRoute';
import axios from 'axios';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
// import Hue from '@material-ui/core/colors/HUE'
import blueGrey from '@material-ui/core/colors/blueGrey'
import cyan from '@material-ui/core/colors/cyan'

const primaryGrey = blueGrey[500];
const secondaryCyan = cyan[400]

const theme = createMuiTheme ({
  palette: {
      primary: 
        {main: blueGrey[500]},
      secondary: 
        {main: cyan[400]}
  }
})


class App extends Component {
  state = {
    formInputs: {
      brandStyle: ``,
      bottleSize: ``,
      unopenedBottles: ``,
      bottleCost: ``,
      bottleWeight: ``,
    },
    userInventoryData: [],
    runningTotal: 0,
    formInputErrors: {},
    image: ``,
    tastingNotes: ``
  };


  // TODO: this needs to go inside of a onClick handler function that can be passed into the button.  This will post the state of the form to the route that I choose the post route to be.  Might have to make a variable and put the states into a variable

  componentDidMount() {
    this.getAlcohol();
  }

  componentDidUpdate() {
    if (this.state.formInputs.brandStyle !== this.props.brandStyle
        || this.state.formInputs.bottleSize !== this.props.bottleSize) {
      this.setState(state => ({
        formInputs: {
          ...state.formInputs,
          brandStyle: this.props.brandStyle,
          bottleSize: this.props.bottleSize
        } 
      }));
    }
  }

  getAlcohol = () => {
    return axios
      .get('/api/alcohol')
      .then(response => {
        console.log(response);
        // this.setState({
        //   brandStyle: response.brandStyle,
        //   bottleSize: response.bottleSize,  
        // })
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
    console.log('Posting Inventory ' + this.props.auth.user.id);

    // clear any previous error messages
    this.setState({
      formInputErrors: {
        dataError: '',
          userId: ''
      },
    });

    return new Promise((resolve, reject) => {
      axios
        .post('/api/inventory', {
          brandStyle: this.props.brandStyle,
          sizeML: this.props.bottleSize,
          costPerBottle: this.state.formInputs.bottleCost,
          totalBottles: this.state.formInputs.unopenedBottles,
          measuredWeight: this.state.formInputs.bottleWeight,
          userId: this.props.auth.user.id,
        })
        .then(response => {
          if (response) {
            console.log("POST RESPONSE", response);
            const { errors } = response;
            if (errors) {
              this.setState({
                formInputErrors: errors
              })
              this.props.validateBrandStyle(errors.brandStyle);
              this.props.validateBottleSize(errors.bottleSize);
              reject(errors);
            } else {
              resolve(response);
            }
          } else {
            reject("Unknown error");
          }

          this.props.updateBrandStyle("");
          this.props.updateBottleSize("");
          this.setState({
            formInputs: {
              brandStyle: ``,
              bottleSize: ``,
              unopenedBottles: ``,
              bottleCost: ``,
              bottleWeight: ``,
            },
          });
        })
        .catch(err => {
          if (err) {
            const { errors } = err.response.data;
            this.setState({
              formInputErrors: errors
            })
            this.props.validateBrandStyle(errors.brandStyle);
            this.props.validateBottleSize(errors.bottleSize);
            reject(errors);
          }
          console.log('err', err);
          reject(err);
        });
    });
  };

  getUserInventory = () => {
    console.log("Getting User Inventory");
    return axios
      .get('/api/inventory', {
        params: {
          brandStyle: this.props.brandStyle,
          sizeML: this.props.bottleSize,
          costPerBottle: this.state.formInputs.bottleCost,
          totalBottles: this.state.formInputs.unopenedBottles,
          measuredWeight: this.state.formInputs.bottleWeight,
          userId: this.props.auth.user.id,
        },
      })
      .then(response => {
        console.log(response);
        let userInventoryData = response.data;
        console.log("I am USERINVENTORYDATA", userInventoryData)
        this.setState({
          userInventoryData: userInventoryData,
          runningTotal: userInventoryData.reduce((total, value) => {return parseFloat(value.totalInventoryValue) + total}, 0)
          // console.log("this is the running total:", runningTotal)
        })
      })
      .catch(err => {
        console.log("err", err);
      })
  }


  postThenGet = () => {

    this.postToInventory()
      .then(res => {
        this.getUserInventory();
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  check = () => {
    console.log(this.state);
  };

  render() {
    return (
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
                    userInventoryData={this.state.userInventoryData}
                    formInputErrors={this.state.formInputErrors}
                  />
                )}
              />
            </Switch>
          </div>
          {/* <FormComponent 
            handleInputChange={this.handleInputChange}
            />
            <ImageComponent />
            <TableComponent /> */}

        </div>
      </Router>
    );
  }
}

App.propTypes = {
  auth: PropTypes.object.isRequired,
  brandStyle: PropTypes.string.isRequired,
  bottleSize: PropTypes.string.isRequired,
  updateBrandStyle: PropTypes.func.isRequired,
  updateBottleSize: PropTypes.func.isRequired,
  validateBrandStyle: PropTypes.func.isRequired,
  validateBottleSize: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  brandStyle: state.brandStyle.brandStyle,
  bottleSize: state.bottleSize.bottleSize,
});
const mapDispatchToProps = {
    updateBrandStyle,
    updateBottleSize,
    validateBrandStyle,
    validateBottleSize
};

export default (connect(mapStateToProps, mapDispatchToProps))(App);
// export default (connect(mapStateToProps, {
//   updateBrandStyle, updateBottleSize, validateBrandStyle, validateBottleSize
// }))(App);
