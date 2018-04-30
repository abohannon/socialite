import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { Card } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Button, Input, Spinner } from './common';
import { createUser } from '../actions';
import { WHITE, BLACK, PURPLE, BACKGROUND2_URI } from '../constants/style';

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
};

class SignupForm extends Component {
  state = {
    firstName: '',
    email: '',
    password: '',
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button raised onPress={() => this.props.createUser(this.state)}>Sign up</Button>
    );
  }

  render() {
    const {
      containerStyle,
      imageBackgroundContainer,
      imageBackgroundStyle,
      formContainerStyle,
      buttonContainerStyle,
      bottomTextContainerStyle,
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
              {this.renderButton()}
            </View>
            <Text style={bottomTextContainerStyle} onPress={() => Actions.pop()}>
              Login
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => ({ loading: state.auth.creatingUser });
export default connect(mapStateToProps, { createUser })(SignupForm);
