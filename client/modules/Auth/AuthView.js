import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './AuthView.css';

import SignIn from './SignIn/SignIn';
import Register from './Register/Register';
import ForgotPassword from './ForgotPassword/ForgotPassword';

import authActions from './AuthActions';
import { VIEW_TYPE } from './AuthConstants';

class AuthView extends Component {
  constructor() {
    super();
    this.changeCurrView = this.changeCurrView.bind(this);
  }

  state = {
    currView: VIEW_TYPE.SIGNIN,
  };

  changeCurrView(currView) {
    this.setState({
      currView,
    });
  }

  render() {
    let paper = null;
    const { currView } = this.state;

    if (currView === VIEW_TYPE.FORGOT_PASSWORD) {
      paper = <ForgotPassword viewChanged={this.changeCurrView} dispatch={this.props.dispatch} />;
    } else if (currView === VIEW_TYPE.REGISTER) {
      paper = <Register viewChanged={this.changeCurrView} dispatch={this.props.dispatch} />;
    } else {
      paper = <SignIn viewChanged={this.changeCurrView} dispatch={this.props.dispatch} />;
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
};

const mapStateToProps = (state) => ({
  currView: state.auth.currView,
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
