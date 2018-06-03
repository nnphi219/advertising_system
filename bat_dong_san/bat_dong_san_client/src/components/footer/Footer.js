import React from 'react';
import { NavLink } from 'react-router-dom';

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className="wrapper footer">
                    <ul>
                        <li className="links">
                            <ul>
                                <li><a href="#41">About</a></li>
                                <li><a href="#43">Support</a></li>
                                <li><a href="#42">Terms</a></li>
                                <li><a href="#44">Policy</a></li>
                                <li><a href="#45">Contact</a></li>
                            </ul>
                        </li>

                        <li className="links">
                            <ul>
                                <li><a href="#46">Appartements</a></li>
                                <li><a href="#47">Houses</a></li>
                                <li><a href="#48">Villas</a></li>
                                <li><a href="#49">Mansions</a></li>
                                <li><a href="#50">...</a></li>
                            </ul>
                        </li>

                        <li className="links">
                            <ul>
                                <li><a href="#31">New York</a></li>
                                <li><a href="#32">Los Anglos</a></li>
                                <li><a href="#33">Miami</a></li>
                                <li><a href="#34">Washington</a></li>
                                <li><a href="#35">...</a></li>
                            </ul>
                        </li>

                        <li className="about">
                            <p>La Casa is real estate minimal html5 website template, designed and coded by pixelhint, tellus varius, dictum erat vel, maximus tellus. Sed vitae auctor ipsum</p>
                            <ul>
                                <li><a href="http://facebook.com/pixelhint" className="facebook" target="_blank"></a></li>
                                <li><a href="http://twitter.com/pixelhint" className="twitter" target="_blank"></a></li>
                                <li><a href="http://plus.google.com/+Pixelhint" className="google" target="_blank"></a></li>
                                <li><a href="#" className="skype"></a></li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div className="copyrights wrapper">
                    Copyright © 2015 <a href="http://pixelhint.com" target="_blank" className="ph_link" title="Download more free Templates">Pixelhint.com</a>. All Rights Reserved.
		            </div>
            </footer>
        );
    }
}

export default Footer;