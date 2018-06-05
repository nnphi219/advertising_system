import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header';
import Contents from './components/contents/Contents';
import { BrowserRouter, Route } from 'react-router-dom';
import Footer from './components/footer/Footer';
import UserAuthen from './components/users/UserAuthen';

class AppContent extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Contents />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    let currentHref = window.location.href;
    let isLogginForm = (currentHref.indexOf('/login') === -1) ? false : true;
    return (
      <div>
        {
          isLogginForm ?
            <UserAuthen />
            :
            <AppContent />
        }
      </div>
    );
  }
}

export default App;