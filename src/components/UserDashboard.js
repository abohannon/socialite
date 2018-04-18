import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text } from 'react-native';
import { fetchRsvps } from '../actions';
import { Spinner } from './common';
import BusinessCard from './BusinessCard';

class UserDashboard extends Component {
  componentDidMount() {
    this.props.fetchRsvps();
  }

  renderRsvps() {
    const { rsvps, fetchingRsvps } = this.props.user;

    if (rsvps.length === 0) {
      return <Text>No RSVPs found.</Text>;
    }

    return rsvps.map((item) => {
      const { data } = item;
      return (
        <BusinessCard
          key={data.name}
          imageUri={data.imageUri}
          name={data.name}
          rating={data.rating}
          reviewCount={data.reviewCount}
          url={data.url}
          location={data.location}
          categories={data.categories}
        />
      );
    });
  }

  render() {
    if (this.props.user.fetchingRsvps) {
      return <Spinner />;
    }
    return (
      <ScrollView>
        {this.renderRsvps()}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps, { fetchRsvps })(UserDashboard);
