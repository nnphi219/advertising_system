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
                                    <li><a href="#">Lorem ipsum dolor sit amet</a></li>
                                    <li><a href="#">Tamquam ponderum at eum, nibh dicta offendit mei</a></li>
                                    <li><a href="#">Vix no vidisse dolores intellegam</a></li>
                                    <li><a href="#">Est virtute feugiat accommodare eu</a></li>
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
                        <div class="span3">
                            <div class="widget">
                                <h5>Keep updated</h5>
                                <p>Enter your email to subcribe newsletter</p>

                                <ul class="social-network">
                                    <li><a href="#"><i class="icon-bg-light icon-facebook icon-circled icon-1x"></i></a></li>
                                    <li><a href="#" title="Twitter"><i class="icon-bg-light icon-twitter icon-circled icon-1x"></i></a></li>
                                    <li><a href="#" title="Linkedin"><i class="icon-bg-light icon-linkedin icon-circled icon-1x"></i></a></li>
                                    <li><a href="#" title="Pinterest"><i class="icon-bg-light icon-pinterest icon-circled icon-1x"></i></a></li>
                                    <li><a href="#" title="Google plus"><i class="icon-bg-light icon-google-plus icon-circled icon-1x"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="subfooter">
                    <div class="container">
                        <div class="row">
                            <div class="span6">
                                <p>&copy; Plato - All right reserved</p>
                            </div>
                            <div class="span6">
                                <div class="pull-right">
                                    <div class="credits">
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
