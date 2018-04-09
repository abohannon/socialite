import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Input, Spinner } from './common';
import { createUser } from '../actions';

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
      <Button onPress={() => this.props.createUser(this.state)}>Sign up</Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="First Name"
            onChangeText={firstName => this.setState({ firstName })}
            placeholder="John"
          />
        </CardSection>
        <CardSection>
          <Input
            label="Email"
            onChangeText={email => this.setState({ email })}
            placeholder="user@gmail.com"
          />
        </CardSection>
        <CardSection>
          <Input
            label="Password"
            onChangeText={password => this.setState({ password })}
            placeholder="password"
            secureTextEntry
          />
        </CardSection>
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = state => ({ loading: state.auth.creatingUser });
export default connect(mapStateToProps, { createUser })(SignupForm);
