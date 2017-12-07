import React     from 'react';
import LoginForm from './LoginForm';
import Axios     from 'axios';

import Auth from '../../lib/Auth';

class Login extends React.Component {
  state = {
    user: {
      email: '',
      password: ''
    }
  };

  handleChange = ({ target: { name, value } }) => {
    const user = Object.assign({}, this.state.user, { [name]: value });
    this.setState({ user });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .post('/api/login', this.state.user)
      .then(res => {
        Auth.setToken(res.data.token);
        console.log(res.data);
        this.props.history.push(`/users/${res.data.user.id}`);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <LoginForm
        user={this.state.user}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default Login;
