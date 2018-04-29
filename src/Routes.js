import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import firebase from 'firebase';
import { fetchUser } from './actions';
import { Spinner } from './components/common';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Nearby from './components/Nearby';
import UserDashboard from './components/UserDashboard';
import { GREY_DARK, WHITE_2 } from './constants/style';

const styles = {
  titleStyle: {
    fontWeight: '900',
    color: GREY_DARK,
  },
};
class Routes extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    fetchUser: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    // check to see if user exists; if so, user is authenticated.
    this.props.fetchUser();
  }

  getSceneStyle = (props, computedProps) => {
    const style = {
      backgroundColor: WHITE_2,
    };
    return style;
  }

  render() {
    const { fetchingUser } = this.props.auth;
    if (fetchingUser) {
      return <Spinner />;
    }
    return (
      <Router getSceneStyle={this.getSceneStyle}>
        <Scene key="root" hideNavBar>
          <Scene key="public">
            <Scene
              key="login"
              component={LoginForm}
              title="Please Login"
              rightTitle="Sign up"
              onRight={() => Actions.signup()}
              hideNavBar
            />
            <Scene
              key="signup"
              component={SignupForm}
              title="Create Account"
              backTitle="Login"
            />
          </Scene>
          <Scene key="private">
            <Scene
              key="nearby"
              component={Nearby}
              title="Nearby"
              rightTitle="My places"
              onRight={() => Actions.userDash()}
              titleStyle={styles.titleStyle}
            />
            <Scene
              key="userDash"
              component={UserDashboard}
              title="My places"
              rightTitle="Logout"
              onRight={() => firebase.auth().signOut()}
              titleStyle={styles.titleStyle}
            />
          </Scene>
        </Scene>
      </Router>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, { fetchUser })(Routes);
