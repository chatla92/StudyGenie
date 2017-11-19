import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

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
        </form>
        <div className={styles.buttonsDiv}>
          <RaisedButton
            label="Request Password"
            primary
            onClick={this.requestPassword.bind(this)}
            className={styles.requestPasswordBtn}
          />
          <FlatButton
            label="Sign In"
            onClick={() => { this.props.viewChanged(VIEW_TYPE.SIGNIN); }}
            className={styles.flatButton}
          />
          <FlatButton
            label="Register"
            onClick={() => { this.props.viewChanged(VIEW_TYPE.REGISTER); }}
            className={styles.flatButton}
          />
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
