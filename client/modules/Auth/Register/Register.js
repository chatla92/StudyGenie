import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import Paper from 'material-ui/Paper';

import authActions from '../AuthActions';
import { VIEW_TYPE } from '../AuthConstants';
import styles from '../AuthView.css';

class Register extends Component {
  state = {
    username: '',
    password: '',
    fullname: '',
    currView: 'signin',

  };

  register = () => {
    const { username, password, fullname } = this.state;
    const { dispatch } = this.props;
    dispatch(authActions.register({
      username,
      password,
      fullname,
    }));
  };

  handleFullnameChange = (e) => {
    this.setState({
      fullname: e.target.value,
    });
  };


  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  render() {
    return (
      <Paper className={styles.paper}>
        <form>
          <TextField
            label="E-mail"
            fullWidth
            onChange={this.handleUsernameChange.bind(this)}
          />
          <TextField
            label="Password"
            fullWidth
            type="password"
            onChange={this.handlePasswordChange.bind(this)}
          />

          <TextField
            label="Full Name"
            fullWidth
            onChange={this.handleFullnameChange.bind(this)}
          />
        </form>
        <div className={styles.buttonsDiv}>
          <Button
            raised
            color="primary"
            onClick={this.register.bind(this)}
            className={styles.registerBtn}
          >
            Register
          </Button>
          <Button
            onClick={() => { this.props.viewChanged(VIEW_TYPE.SIGNIN); }}
            className={styles.flatButton}
          >
            Sign in
          </Button>
          <Button
            onClick={() => { this.props.viewChanged(VIEW_TYPE.FORGOT_PASSWORD); }}
            className={styles.flatButton}
          >
            Forgot Password?
          </Button>
        </div>
      </Paper>
    );
  }
}

Register.propTypes = {
  viewChanged: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Register;
