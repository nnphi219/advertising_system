import React from 'react';
import LoginForm from './LoginForm';
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