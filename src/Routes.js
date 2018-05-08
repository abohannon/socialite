import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { fetchUser } from './actions';
import { Spinner } from './components/common';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Nearby from './components/Nearby';
import MyPlaces from './components/MyPlaces';
import Settings from './components/Settings';
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

  componentWillMount() {
    this.props.fetchUser();
  }

  getSceneStyle = () => {
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
              hideNavBar
            />
          </Scene>
          <Scene key="private">
            <Scene
              key="nearby"
              component={Nearby}
              title="Nearby"
              titleStyle={styles.titleStyle}
              leftTitle="Settings"
              leftButtonTextStyle={{ color: GREY_DARK }}
              onLeft={() => Actions.settings()}
              rightTitle="My places"
              rightButtonTextStyle={{ color: GREY_DARK }}
              onRight={() => Actions.userDash()}
            />
            <Scene
              key="userDash"
              component={MyPlaces}
              title="My places"
              titleStyle={styles.titleStyle}
              backTitle="Nearby"
              backButtonTextStyle={{ color: GREY_DARK }}
              navBarButtonColor={GREY_DARK}
            />
            <Scene
              key="settings"
              component={Settings}
              title="Settings"
              titleStyle={styles.titleStyle}
              backTitle="Nearby"
              backButtonTextStyle={{ color: GREY_DARK }}
              navBarButtonColor={GREY_DARK}
            />
          </Scene>
        </Scene>
      </Router>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, { fetchUser })(Routes);
