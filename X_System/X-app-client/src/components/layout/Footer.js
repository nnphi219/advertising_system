import React, { Component } from 'react';

class Footer extends Component {
    state = { loading: false };
    render() {
        return (
            <footer className="footer" >
                <div className="container">
                    <div className="row">
                        <div className="span3">
                            <div className="widget">
                                <div className="footerlogo">
                                    <h6><a href="index.html">Plato</a></h6>
                                    <address>
                                        <strong>{'Plato business company, Inc.'}</strong><br />
                                        {'4455 Great building Ave, Suite A10'}<br />
                                        {'San Francisco, CA 94107'}<br />
                                        <abbr title="Phone">{'P:'}</abbr> {'(123) 456-7890'}
                                    </address>
                                </div>
                            </div>
                        </div>
                        <div className="span3">
                            <div className="widget">
                                <h5>Browse pages</h5>
                                <ul className="list list-ok">
                                    <li><a href="#1">Lorem ipsum dolor sit amet</a></li>
                                    <li><a href="#2">Tamquam ponderum at eum, nibh dicta offendit mei</a></li>
                                    <li><a href="#3">Vix no vidisse dolores intellegam</a></li>
                                    <li><a href="#4">Est virtute feugiat accommodare eu</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="span3">
                            <div className="widget">
                                <h5>Flickr photostream</h5>
                                <div className="flickr_badge">
                                    <script type="text/javascript" src="http://www.flickr.com/badge_code_v2.gne?count=8&amp;display=random&amp;size=s&amp;layout=x&amp;source=user&amp;user=34178660@N03"></script>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </div>
                        <div className="span3">
                            <div className="widget">
                                <h5>Keep updated</h5>
                                <p>Enter your email to subcribe newsletter</p>

                                <ul className="social-network">
                                    <li><a href="#5"><i className="icon-bg-light icon-facebook icon-circled icon-1x"></i></a></li>
                                    <li><a href="#6" title="Twitter"><i className="icon-bg-light icon-twitter icon-circled icon-1x"></i></a></li>
                                    <li><a href="#7" title="Linkedin"><i className="icon-bg-light icon-linkedin icon-circled icon-1x"></i></a></li>
                                    <li><a href="#8" title="Pinterest"><i className="icon-bg-light icon-pinterest icon-circled icon-1x"></i></a></li>
                                    <li><a href="#9" title="Google plus"><i className="icon-bg-light icon-google-plus icon-circled icon-1x"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="subfooter">
                    <div className="container">
                        <div className="row">
                            <div className="span6">
                                <p>&copy; Plato - All right reserved</p>
                            </div>
                            <div className="span6">
                                <div className="pull-right">
                                    <div className="credits">
                                        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
