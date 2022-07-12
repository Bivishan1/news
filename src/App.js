import logo from "./logo.svg";
import "./App.css";

//starting class based component
//rcc - react class based component.
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
// import Spinner from "./components/Spinner";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default class App extends Component {
  page = 6;//
  render() {

    return (
      <Router>


        <div>
          <Navbar to="/" />

          <Routes>
            <Route
              path="/"
              element={<News pagesize={this.page} category="general" country="in" />}
            ></Route>
            {/* "Key" keyword to mount to the unique address. */}
            <Route
              path="/business"
              element={<News key={"business"} pagesize={this.page} category="business" country="in" />}
            ></Route>
            <Route
              path="/entertainment"
              element={
                <News key={"entertainment"} pagesize={this.page} category="entertainment" country="in" />
              }
            ></Route>
            <Route
              path="/health"
              element={
                <News key={"health"} pagesize={this.page} category="health" country="in" />
              }
            ></Route>
            <Route
              path="/science"
              element={<News key={"science"} pagesize={this.page} category="science" country="in" />}
            ></Route>
            <Route
              path="/sports"
              element={<News key={"sports"} pagesize={this.page} category="sports" country="in" />}
            ></Route>
            <Route
              path="/technology"
              element={<News key={"technology"} pagesize={this.page} category="technology" country="in" />}
            ></Route>
          </Routes>
        </div>
      </Router>
    );
  }
}
