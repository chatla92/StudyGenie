import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { authActions } from '../AuthActions';
import { VIEW_TYPE } from '../AuthConstants';
import styles from '../AuthView.css';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.signin = this.signin.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  state = {
    username: '',
    password: '',
  };

  signin() {
    const { username, password } = this.state;
    const { dispatch } = this.props;
    dispatch(authActions.signin({
      username,
      password,
    }));
  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value,
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

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
        </form>
        <div className={styles.buttonsDiv}>
          <Button
            raised
            color="primary"
            onClick={this.signin.bind(this)}
          >
            Sign In
          </Button>
          <Button
            onClick={() => { this.props.viewChanged(VIEW_TYPE.REGISTER); }}
            className={styles.flatButton}
          >
            Register
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

SignIn.propTypes = {
  viewChanged: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default SignIn;
