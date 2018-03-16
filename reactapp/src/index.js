import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import AdsArea from './components/Ads_Area/AdsArea';
import { BrowserRouter, Link, Route } from "react-router-dom";

// const App = () => (
//     <div>App
//         <Link> to='/about'>About</Link>
//     </div>
// );

// const About = () => (
//     <div>About
//         <Link> to='/'>App</Link>
//     </div>
// );

// const Main = () => <h1>Hello world</h1>;


ReactDOM.render(<App />, window.document.getElementById('root'));

// ReactDOM.render(<BrowserRouter>
//                     <div>
//                         <Route path='/' component={Main} />
//                     </div>
//                 </BrowserRouter>
//     , document.getElementById('navigation'));
// ReactDOM.render(<AdsArea />, document.getElementById('root'));
registerServiceWorker();
