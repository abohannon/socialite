import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, ImageBackground, StatusBar } from 'react-native';
import { Card } from 'react-native-elements';
import { loginUser } from '../actions';
import { Button, Input, Spinner } from './common';
import { WHITE } from '../constants/style';


const styles = {
  containerStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonContainerStyle: {
    width: '100%',
    marginTop: 32,
  },
  logoStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 64,
    marginBottom: 64,
  },
  logoTextStyle: {
    fontSize: 36,
    fontWeight: '700',
    color: WHITE,
  },
  imageBackgroundStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
};
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
      imageBackgroundStyle,
    } = styles;

    const backgroundUri = 'https://images.unsplash.com/photo-1504420379316-1a01ae921844?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f6d64f3a56411aa919cdde3d989d6635&auto=format&fit=crop&w=634&q=80';

    return (
      <View style={containerStyle}>
        <StatusBar barStyle="light-content" />
        <ImageBackground
          style={imageBackgroundStyle}
          source={{ uri: backgroundUri }}
        >
          <View style={logoStyle}>
            <Text style={logoTextStyle}>
          socialite
            </Text>
          </View>
          <Card>
            <View>
              <Input
                label="Email"
                onChangeText={email => this.setState({ email })}
                placeholder="user@gmail.com"
              />
              <Input
                label="Password"
                onChangeText={password => this.setState({ password })}
                placeholder="password"
                secureTextEntry
              />
              <View className="login__button-container" style={buttonContainerStyle}>
                {this.renderButton()}
              </View>
            </View>
          </Card>
        </ImageBackground>
      </View>
    );
  }
}
const mapStateToProps = state => ({ loading: state.auth.loggingInUser });

export default connect(mapStateToProps, { loginUser })(LoginForm);
