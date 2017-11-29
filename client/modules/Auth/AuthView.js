import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './AuthView.css';

import SignIn from './SignIn/SignIn';
import Register from './Register/Register';
import ForgotPassword from './ForgotPassword/ForgotPassword';

import authActions from './AuthActions';
import { VIEW_TYPE, AUTH_STAT } from './AuthConstants';

class AuthView extends Component {
  constructor() {
    super();
    this.changeCurrView = this.changeCurrView.bind(this);
  }

  state = {
    currView: VIEW_TYPE.SIGNIN,
    message: '',
  };

  changeCurrView(currView) {
    this.setState({
      currView,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth_status !== this.props.auth_status) {
      let message = '';
      switch (nextProps.auth_status) {
        case AUTH_STAT.REGISTER_SUCCESSFUL:
          message = 'Registration successful.';
          break;
        case AUTH_STAT.PASSWORD_REQUESTED:
          message = 'Password requested. Check mail';
          break;
        case AUTH_STAT.EMAIL_TAKEN:
          message = 'Email is taken.';
        case AUTH_STAT.LOGIN_FAILURE:
          message = 'The password is incorrect.';
          break;
        case AUTH_STAT.REGISTER_FAILURE:
          message = 'The registration failed. Try later.';
          break;
        case AUTH_STAT.PASSWORD_REQUEST_FAILED:
          message = 'The password request failed.';
          break;
        default:
          message = '';
      }
      this.setState({
        message,
      });
    }
  }

  render() {
    let paper = null;
    const { currView } = this.state;

    if (currView === VIEW_TYPE.FORGOT_PASSWORD) {
      paper = <ForgotPassword
        message={this.state.message}
        viewChanged={this.changeCurrView}
        dispatch={this.props.dispatch}
        />;
    } else if (currView === VIEW_TYPE.REGISTER) {
      paper = <Register
        message={this.state.message}
        viewChanged={this.changeCurrView}
        dispatch={this.props.dispatch}
      />;
    } else {
      paper = <SignIn
        message={this.state.message}
        viewChanged={this.changeCurrView}
        dispatch={this.props.dispatch}
      />;
    }
    return (
      <div>
        <div id={styles.authContainer}>
          {paper}
        </div>
      </div>
    );
  }
}

AuthView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth_status: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  auth_status: state.auth.auth_status,
});

function mapDispatchToProp(dispatch) {
  return {
    ...bindActionCreators({
      ...authActions,
    }, dispatch),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProp)(AuthView);
