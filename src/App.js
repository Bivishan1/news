import logo from "./logo.svg";
import "./App.css";

//starting class based component
//rcc - react class based component.
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";

export default class App extends Component {
  c = "bivi"; //
  render() {
    return (
      <div>
        <Navbar />
        <News />
      </div>
    );
  }
}
