import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Home from './components/Home/Home';
import UserLogin from './components/User/UserLogin';
import UserManagement from './components/User/UserManagement';
import UserCreatorUpdater, { UserCreator, UserEditor } from './components/User/UserCreatorUpdater';
import PostManagement from './components/Post/PostManagement';
import { PostCreator, PostEditor } from './components/Post/PostCreatorUpdater';
import Banner from './components/layout/Banner';

class Title extends Component {
    render() {
        return (
            <div id="page-wrapper">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">This is Admin System Page</h1>
                    </div>
                </div>
            </div>
        );
    }
}

class App extends Component {
    render() {
        return (
            <div>
                <Banner />
                <BrowserRouter>
                    <div>
                        <Route exact={true} path={"/"} component={Home} />
                        <Route exact={true} path={"/login"} component={UserLogin} />

                        <Route exact={true} path={"/users"} component={UserManagement} />
                        <Route exact={true} path={"/users/create"} component={UserCreator} />
                        <Route exact={true} path={"/users/edit/:id"} component={UserEditor} />

                        <Route exact={true} path={"/posts"} component={PostManagement} />
                        <Route exact={true} path={"/posts/create"} component={PostCreator} />
                        <Route exact={true} path={"/posts/edit/:id"} component={PostEditor} />

                        <Route path={"/title"} component={Title} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
