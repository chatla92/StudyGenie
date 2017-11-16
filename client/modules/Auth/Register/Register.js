import React, { Component, PropTypes } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
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

          <TextField
            hintText="Full Name"
            floatingLabelText="Full Name"
            fullWidth
            onChange={this.handleFullnameChange.bind(this)}
          />

          <div>
            <RaisedButton
              label="Register"
              primary
              onClick={this.register.bind(this)}
              className={styles.registerBtn}
            />
          </div>
        </form>
        <div className={styles.buttonsDiv}>
          <FlatButton
            label="Sign In"
            onClick={() => { this.props.viewChanged(VIEW_TYPE.SIGNIN); }}
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

Register.propTypes = {
  viewChanged: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Register;
