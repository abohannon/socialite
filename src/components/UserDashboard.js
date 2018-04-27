import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text } from 'react-native';
import {
  fetchRsvps,
  updateUserRsvp,
  removeRsvp,
} from '../actions';
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
          displayPhone={data.display_phone}
          phone={data.phone}
          price={data.price}
          isClosed={data.is_closed}
          location={data.location}
          categories={data.categories}
          places={places}
          userRsvps={this.props.user.rsvps}
          updateUserRsvp={this.props.updateUserRsvp}
          removeRsvp={this.props.removeRsvp}
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

export default connect(mapStateToProps, {
  fetchRsvps,
  removeRsvp,
  updateUserRsvp,
})(UserDashboard);
