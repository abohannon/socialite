import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, ImageBackground, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { loginUser } from '../actions';
import { Button, Input, Spinner } from './common';
import { WHITE, BLACK, PURPLE, BACKGROUND_URI } from '../constants/style';


const createStyles = () => ({
  containerStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  formContainerStyle: {
    width: 250,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonContainerStyle: {
    width: '100%',
    marginTop: 32,
  },
  logoStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 88,
    marginBottom: 48,
  },
  logoTextStyle: {
    fontSize: 36,
    fontWeight: '700',
    color: WHITE,
    fontFamily: 'Hiragino Mincho ProN',
  },
  bottomTextContainerStyle: {
    textAlign: 'center',
    marginTop: 16,
    color: PURPLE,
  },
  imageBackgroundContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: BLACK,
  },
  imageBackgroundStyle: {
    opacity: 0.7,
  },
});
class LoginForm extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    loginUser: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    password: '',
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="small" />;
    }
    return (
      <Button raised onPress={() => this.props.loginUser(this.state)}>
        Login
      </Button>
    );
  }

  render() {
    const {
      containerStyle,
      logoStyle,
      logoTextStyle,
      buttonContainerStyle,
      imageBackgroundContainer,
      imageBackgroundStyle,
      formContainerStyle,
      bottomTextContainerStyle,
    } = createStyles();

    return (
      <View style={containerStyle}>
        <StatusBar barStyle="light-content" />
        <ImageBackground
          style={imageBackgroundContainer}
          source={{ uri: BACKGROUND_URI }}
          imageStyle={imageBackgroundStyle}
        >
          <View style={logoStyle}>
            <Text style={logoTextStyle}>
          socialite
            </Text>
          </View>
          <View style={formContainerStyle}>
            <Input
              onChangeText={email => this.setState({ email })}
              placeholder="user@gmail.com"
            />
            <Input
              onChangeText={password => this.setState({ password })}
              placeholder="password"
              secureTextEntry
            />
            <View className="login__button-container" style={buttonContainerStyle}>
              {this.renderButton()}
            </View>
            <Text style={bottomTextContainerStyle} onPress={() => Actions.signup()}>
                Sign up
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const mapStateToProps = state => ({ loading: state.auth.loggingInUser });

export default connect(mapStateToProps, { loginUser })(LoginForm);
