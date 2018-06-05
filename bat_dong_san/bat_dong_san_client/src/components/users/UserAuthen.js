import React from 'react';
import LoginForm from './LoginForm';
import './vendor/bootstrap/css/bootstrap.min.css';
import './fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import './vendor/animate/animate.css';
import './vendor/css-hamburgers/hamburgers.min.css';
import './vendor/animsition/css/animsition.min.css';
import './vendor/select2/select2.min.css';
import './vendor/daterangepicker/daterangepicker.css';
import './css/util.css';
import './css/main.css';
import RegisterForm from './RegisterForm';

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
            this.state.isLoggin ?
                <LoginForm
                    openRegister={this.openRegister}
                />
                : <RegisterForm
                    openLogin={this.openLogin}
                />
        );
    }
}

export default UserAuthen;