import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { loginUser } from '../actions';
import { Card, Button, Input, Spinner } from './common';

const styles = {
  containerStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonContainerStyle: {
    height: 100,
    width: '100%',
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
    return (
      <View style={styles.containerStyle}>
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
            <View className="login__button-container" style={styles.buttonContainerStyle}>
              {this.renderButton()}
            </View>
          </View>
        </Card>
        <Text onPress={() => Actions.signup()}>Need an account? Sign up.</Text>
      </View>
    );
  }
}
const mapStateToProps = state => ({ loading: state.auth.loggingInUser });

export default connect(mapStateToProps, { loginUser })(LoginForm);
