import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { fetchRsvps } from '../actions';
import { Spinner } from './common';

class UserDashboard extends Component {
  componentDidMount() {
    this.props.fetchRsvps();
  }

  renderRsvps() {
    const { rsvps } = this.props.user;

    if (rsvps === null || rsvps === undefined) {
      return <Text>No RSVPs found.</Text>;
    }

    return rsvps.map(item => <Text>{item}</Text>);
  }

  render() {
    if (this.props.user.fetchingRsvps) {
      return <Spinner />;
    }
    return (
      <View>
        {this.renderRsvps()}
      </View>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps, { fetchRsvps })(UserDashboard);
