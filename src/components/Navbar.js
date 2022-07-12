import PropTypes from "prop-types";
import React, { Component } from "react";

import { Link } from "react-router-dom";

export class Navbar extends Component {


  constructor(props) {
    super(props);

    this.state = {
      animate: false
    }
  }



  render() {
    // let { active, isActive } = this.props;
    // console.log(document.querySelector('.nav-link').classList.add('active'));
    // let animationClasses = (this.state.animate ? 'active' : '');
    // const handlclick = () => {
    //   console.log();
    // console.log(document.querySelector('.nav-link').classList.toggle('active'));


    // }
    // const cmenu = document.querySelector('.nav-link');
    // console.log(cmenu);
    // cmenu.addEventListener('click', () => {
    //   console.log('clicked');
    //   // cmenu.classList.add('active');
    //   // console.log(cmenu.classList);
    // })

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            News Monkey
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link" to="/business">
                  Business
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/entertainment">
                  Entertainment
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/health">
                  Health
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/science">
                  Science
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sports">
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/technology">
                  Technology
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
Navbar.contextTypes = {
  router: PropTypes.object
};

export default Navbar;
