import React, { Component, PropTypes } from 'react';

import authActions from '../AuthActions';
import { VIEW_TYPE } from '../AuthConstants';
import styles from '../AuthView.css';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
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
    const { dispatch } = this.dispatch;
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
            hintText="E-mail"
            floatingLabelText="E-mail"
            fullWidth
            onChange={this.handleUsernameChange.bind(this)}
          />
          <TextField
            hintText="Password"
            floatingLabelText="Password"
            fullWidth
            type="password"
            onChange={this.handlePasswordChange.bind(this)}
          />
        </form>
        <div className={styles.buttonsDiv}>
          <RaisedButton
            label="Sign In"
            primary
            onClick={this.signin.bind(this)}
          />
          <FlatButton
            label="Register"
            onClick={() => { this.props.viewChanged(VIEW_TYPE.REGISTER); }}
            className={styles.flatButton}
          />
          <FlatButton
            label="Forgot Password?"
            onClick={() => { this.props.viewChanged(VIEW_TYPE.FORGOT_PASSWORD); }}
            className={styles.flatButton}
          />
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
