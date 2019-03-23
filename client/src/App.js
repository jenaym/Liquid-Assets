import React, { Component } from "react";
import "./App.css";
import FormComponent from "./FormComponent/FormComponent";
import './FormComponent/FormComponent.css';
import LoginComponent from "./LoginComponent/LoginComponent"


class App extends Component {
  state = {
    brandStyle: ``,
    bottleSize: ``,
    numberOfUnopenedBottles: ``,
    costPerBottle: ``,
    currentBottleWeight: ``,
    percentageLeft: ``,
    totalBrandStyleValue: ``
  }
  render() {

    const { classes } = this.props;

    return (
      <div className="App">
        <FormComponent />
      </div>
    );
  }
}

export default App;
