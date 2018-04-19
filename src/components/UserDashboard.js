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
    const { user, places } = this.props;

    if (user.rsvps.length === 0) {
      return <Text>No RSVPs found.</Text>;
    }

    return user.rsvps.map((item) => {
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
          places={places}
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

const mapStateToProps = state => ({
  user: state.user,
  places: state.places,
});

export default connect(mapStateToProps, { fetchRsvps })(UserDashboard);
