import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header';
import Contents from './components/contents/Contents';
import { BrowserRouter, Route } from 'react-router-dom';
import Footer from './components/footer/Footer';
import UserAuthen from './components/users/UserAuthen';
import { PAGES } from './components/share/PageConfig';
import { URL_API } from './components/share/UrlAPI';
import Request from 'superagent';

class AppContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bannerContents: {},
      postContents: {
        HomePostContents: {},
        BuyPostContents: {},
        RentPostContents: {}
      }
    }
  }

  getHeaderAdvertising() {
    let $this = this;
    let url = URL_API.GetAdvertisement + "/" + PAGES.HEADER.NAME_ID;
    Request.get(url)
      .then((res) => {
        let jsonAdsArea = res.body;

        $this.setState({
          bannerContents: jsonAdsArea
        })
      }).catch((e) => {
        console.log('err');
      });
  }

  getHomeAdvertising() {
    let $this = this;
    let url = URL_API.GetAdvertisement + "/" + PAGES.HOME.NAME_ID;
    Request.get(url)
      .then((res) => {
        let jsonAdsArea = res.body;
        let newState = $this.state.postContents.HomePostContents = jsonAdsArea;

        $this.setState(newState);
      }).catch((e) => {
        console.log('err');
      });
  }

  getBuyAdvertising() {
    let $this = this;
    let url = URL_API.GetAdvertisement + "/" + PAGES.BUY.NAME_ID;
    Request.get(url)
      .then((res) => {
        let jsonAdsArea = res.body;
        let newState = $this.state.postContents.BuyPostContents = jsonAdsArea;

        $this.setState(newState);
      }).catch((e) => {
        console.log('err');
      });
  }

  getRentAdvertising() {
    let $this = this;
    let url = URL_API.GetAdvertisement + "/" + PAGES.RENT.NAME_ID;
    Request.get(url)
      .then((res) => {
        let jsonAdsArea = res.body;
        let newState = $this.state.postContents.RentPostContents = jsonAdsArea;

        $this.setState(newState);
      }).catch((e) => {
        console.log('err');
      });
  }

  componentDidMount() {
    this.getHeaderAdvertising();
    this.getHomeAdvertising();
    this.getBuyAdvertising();
    this.getRentAdvertising();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header
            bannerContents={this.state.bannerContents}
          />
          <Contents
            postContents={this.state.postContents}
          />
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