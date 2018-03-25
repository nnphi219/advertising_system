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
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
