import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, IndexRoute } from "react-router-dom";
import AdsArea from './components/Ads_Area/AdsArea';
import Root from './components/Root';

class App extends Component {
  render() {
    // return (
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <h1 className="App-title">Welcome to React</h1>
    //     </header>
    //     <p className="App-intro">
    //       To get started, edit <code>src/App.js</code> and save to reload.
    //     </p>
    //   </div>
    // );

    return (
      <BrowserRouter>
      <div>
          <Route path={"/"} component={Root} />
          <Route path={"/create/ads-area"} component={AdsArea} />
          {/* <Route path={"/user/:id"} component={User} />
          <Route path={"/home"} component={Home} />
          <Route path={"home-single"} component={Home}/> */}
      </div>
      </BrowserRouter>
  );
  }
}

export default App;
