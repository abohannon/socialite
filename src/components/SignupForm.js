import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card } from 'react-native-elements';
import { Button, Input, Spinner } from './common';
import { createUser } from '../actions';

const styles = {
  buttonContainerStyle: {
    height: 100,
    width: '100%',
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
    return (
      <Card>
        <Input
          label="First Name"
          onChangeText={firstName => this.setState({ firstName })}
          placeholder="John"
        />
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
        <View style={styles.buttonContainerStyle}>
          {this.renderButton()}
        </View>
      </Card>
    );
  }
}

const mapStateToProps = state => ({ loading: state.auth.creatingUser });
export default connect(mapStateToProps, { createUser })(SignupForm);
