import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import authActions from '../AuthActions';
import { VIEW_TYPE } from '../AuthConstants';
import styles from '../AuthView.css';

class ForgotPassword extends Component {
  state = {
    username: '',
  };

  requestPassword = () => {
    const { username } = this.state;
    const { dispatch } = this.props;
    dispatch(authActions.requestPassword({
      username,
    }));
  };

  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  isRequestAllowed = () => {
    const { username } = this.state;
    return (!username);
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
        </form>
        <div className={styles.buttonsDiv}>
          <Button
            raised
            disabled={this.isRequestAllowed()}
            color="primary"
            onClick={this.requestPassword.bind(this)}
            className={styles.requestPasswordBtn}
          >
            Request Password
          </Button>
          <Button
            onClick={() => { this.props.viewChanged(VIEW_TYPE.SIGNIN); }}
            className={styles.flatButton}
          >
            Sign In
          </Button>
          <Button
            onClick={() => { this.props.viewChanged(VIEW_TYPE.REGISTER); }}
            className={styles.flatButton}
          >
            Register
          </Button>
        </div>
      </Paper>
    );
  }
}

ForgotPassword.propTypes = {
  viewChanged: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default ForgotPassword;
