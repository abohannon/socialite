import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button, Input } from './common';
import { createUser } from '../actions';
import { BLACK, BLACK_50, RED_BROWN, PURPLE, BACKGROUND2_URI } from '../constants/style';

const styles = {
  containerStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  formContainerStyle: {
    width: 250,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 128,
  },
  buttonContainerStyle: {
    width: '100%',
    marginTop: 32,
  },
  imageBackgroundContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: BLACK,
  },
  imageBackgroundStyle: {
    opacity: 0.7,
  },
  bottomTextContainerStyle: {
    textAlign: 'center',
    marginTop: 16,
    color: PURPLE,
  },
  errorStyle: {
    color: RED_BROWN,
    textAlign: 'center',
    marginTop: 8,
    padding: 8,
    backgroundColor: BLACK_50,
    borderRadius: 4,
    overflow: 'hidden',
  },
};

class SignupForm extends Component {
  state = {
    firstName: '',
    email: '',
    password: '',
  }

  renderErrorMessage = (style) => {
    if (this.props.error && this.props.error.errorMessage) {
      return (
        <Text style={style}>{this.props.error.errorMessage}</Text>
      );
    }
    return null;
  }

  render() {
    const {
      containerStyle,
      imageBackgroundContainer,
      imageBackgroundStyle,
      formContainerStyle,
      buttonContainerStyle,
      bottomTextContainerStyle,
      errorStyle,
    } = styles;
    return (
      <View style={containerStyle}>
        <ImageBackground
          style={imageBackgroundContainer}
          source={{ uri: BACKGROUND2_URI }}
          imageStyle={imageBackgroundStyle}
        >
          <View style={formContainerStyle}>
            <Input
              onChangeText={firstName => this.setState({ firstName })}
              placeholder="John"
            />
            <Input
              onChangeText={email => this.setState({ email })}
              placeholder="user@gmail.com"
            />
            <Input
              onChangeText={password => this.setState({ password })}
              placeholder="password"
              secureTextEntry
            />
            <View style={buttonContainerStyle}>
              <Button
                raised
                loading={!!this.props.loading}
                onPress={() => this.props.createUser(this.state)}
              >
                {this.props.loading ? '' : 'Sign up'}
              </Button>
            </View>
            <Text style={bottomTextContainerStyle} onPress={() => Actions.pop()}>
              Login
            </Text>
            {this.renderErrorMessage(errorStyle)}
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.creatingUser,
  error: state.auth.error,
});
export default connect(mapStateToProps, { createUser })(SignupForm);
