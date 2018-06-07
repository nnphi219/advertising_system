import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Footer from './components/header/Footer';
import LeftNav from './components/header/LeftNav';
import TopNav from './components/header/TopNav';
import Contents from './components/contents/Contents';
import UserAuthen from './components/contents/users/UserAuth';

class AppContent extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container body">
          <div className="main_container">
            <LeftNav />
            <TopNav />
            <Contents />
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

class App extends Component {
  render() {
    let currentHref = window.location.href;
    let isLogginForm = (currentHref.indexOf('/login') === -1) ? false : true;
    return (
      isLogginForm ?
        <UserAuthen />
        :
        <AppContent />
    );
  }
}

export default App;
