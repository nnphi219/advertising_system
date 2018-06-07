import React from 'react';
import UserLogin from './UserLogin';
import UserRegister from './UserRegister';

import './user_auth_frontend/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './user_auth_frontend/fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import './user_auth_frontend/vendor/animate/animate.css';
import './user_auth_frontend/vendor/css-hamburgers/hamburgers.min.css';
import './user_auth_frontend/vendor/animsition/css/animsition.min.css';
import './user_auth_frontend/vendor/select2/select2.min.css';
import './user_auth_frontend/vendor/daterangepicker/daterangepicker.css';
import './user_auth_frontend/css/util.css';
import './user_auth_frontend/css/main.css';

class UserAuthen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggin: true
        };

        this.openLogin = this.openLogin.bind(this);
        this.openRegister = this.openRegister.bind(this);
    }

    openLogin(event) {
        console.log(1);
        this.setState({
            isLoggin: true
        });
    }

    openRegister(event) {
        this.setState({
            isLoggin: false
        });
    }

    render() {
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        {
                            this.state.isLoggin ?
                                <UserLogin
                                    openRegister={this.openRegister}
                                />
                                : <UserRegister
                                    openLogin={this.openLogin}
                                />
                        }
                        <div className="login100-more" style={{ backgroundImage: "url('images/CashRegisters_POS_Brisbane_Sept2012-787x1030.jpg')" }}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserAuthen;