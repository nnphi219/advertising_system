import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Request from 'superagent';
import './App.css';
import Footer from './components/header/Footer';
import LeftNav from './components/header/LeftNav';
import TopNav from './components/header/TopNav';
import Contents from './components/contents/Contents';
import UserAuthen from './components/contents/users/UserAuth';
import PostCampaignRegister from './components/contents/post_campaign/PostCampaignRegister';
import UrlApi from './components/contents/share/UrlApi';
import { setUser } from './actions/user/user';

class AppContent extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container body">
          <div className="main_container">
            <LeftNav />
            <TopNav />
            <Contents
              user={this.props.user}
            />
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logedIn: false,
      user: {}
    };
  }

  authen() {
    var token = localStorage.getItem('x-auth');

    let $this = this;
    Request.get(UrlApi.UserAuthen)
      .set('x-auth', token)
      .then((res) => {
        var user = res.body;
        if (user) {
          $this.props.onSetUser(user);
          this.setState({
            logedIn: true,
            user: user
          });
        }
        else {

        }

      }).catch((e) => {
      });
  }

  componentDidMount() {
    this.authen();
  }

  render() {
    let currentHref = window.location.href;
    let isLogginForm = (currentHref.indexOf('/login') === -1) ? false : true;
    let isPostCampaginRegister = (currentHref.indexOf('/post-campaign') === -1) ? false : true;
    return (
      isPostCampaginRegister ?
        <PostCampaignRegister />
        :
        !this.state.logedIn || isLogginForm ?
          <UserAuthen />
          :
          <AppContent
            user={this.state.user}
          />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSetUser: (user) => dispatch(setUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);