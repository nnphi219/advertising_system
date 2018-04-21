import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Home from './components/Home/Home';
import UserLogin from './components/User/UserLogin';
import UserManagement from './components/User/UserManagement';
import { UserCreator, UserEditor } from './components/User/UserCreatorUpdater';
import PostManagement from './components/Post/PostManagement';
import { PostCreator, PostEditor } from './components/Post/PostCreatorUpdater';
import { PageCreator, PageEditor } from './components/Pages/PageCreatorUpdater';
import UserRegister from './components/User/UserRegister';
import PostDetail from './components/Post/PostDetail';
import PageDetail from './components/Pages/PageDetail';
import Marketing from './components/Marketing/Marketing';
import PageManagement from './components/Pages/PageManagement';
import ErrorPage from './components/ErrorPage/ErrorPage';
import PostTypeManagement from './components/PostTypes/PostTypeManagement';
import { PostTypeCreator, PostTypeEditor } from './components/PostTypes/PostTypeCreatorUpdater';
import PostTypeDetail from './components/PostTypes/PostTypeDetail';
import Post_Campaign from './components/Post_Campaign/Post_Campaign';

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
                <BrowserRouter>
                    <div>
                        <Route exact={true} path={"/"} component={Home} />
                        <Route exact={true} path={"/login"} component={UserLogin} />
                        <Route exact={true} path={"/register"} component={UserRegister} />

                        <Route exact={true} path={"/users"} component={UserManagement} />
                        <Route exact={true} path={"/users/create"} component={UserCreator} />
                        <Route exact={true} path={"/users/edit/:id"} component={UserEditor} />

                        <Route exact={true} path={"/posts"} component={PostManagement} />
                        <Route exact={true} path={"/post/:id"} component={PostDetail} />
                        <Route exact={true} path={"/posts/create"} component={PostCreator} />
                        <Route exact={true} path={"/posts/edit/:id"} component={PostEditor} />
                        <Route exact={true} path={"/marketing"} component={Marketing} />

                        <Route exact={true} path={"/pages"} component={PageManagement} />
                        <Route exact={true} path={"/page/:id"} component={PageDetail} />
                        <Route exact={true} path={"/pages/create"} component={PageCreator} />
                        <Route exact={true} path={"/pages/edit/:id"} component={PageEditor} />

                        <Route exact={true} path={"/posttypes"} component={PostTypeManagement} />
                        <Route exact={true} path={"/posttypes/:id"} component={PostTypeDetail} />
                        <Route exact={true} path={"/posttypes/create"} component={PostTypeCreator} />
                        <Route exact={true} path={"/posttypes/edit/:id"} component={PostTypeEditor} />

                        <Route exact={true} path={"/notfound"} component={ErrorPage} />

                        <Route path={"/title"} component={Title} />
                    </div>
                </BrowserRouter>

                <BrowserRouter>
                    <Route exact={true} path={"/post-campaign"} component={Post_Campaign} />
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
