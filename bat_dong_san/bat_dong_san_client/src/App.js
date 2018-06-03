import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header';
import Contents from './components/contents/Contents';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/footer/Footer';

class App extends Component {
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

export default App;