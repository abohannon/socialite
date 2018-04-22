import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Text, Image } from 'react-native';
import firebase from 'firebase';
import { SearchBar } from 'react-native-elements';
import { Card, Spinner } from './common';
import {
  fetchUserLocation,
  fetchYelpData,
  updateUserRsvp,
  removeRsvp,
  fetchRsvps,
  fetchPlaces,
} from '../actions';
import BusinessCard from './BusinessCard';

class Nearby extends Component {
  componentDidMount() {
    console.log('nearby mounted');
    const { fetchUserLocation, fetchPlaces, fetchRsvps } = this.props;
    fetchUserLocation();
    fetchPlaces();
    fetchRsvps();
  }

  componentDidUpdate(prevProps) {
    const {
      fetchYelpData,
      location,
      places,
      fetchRsvps,
      fetchPlaces,
      user,
    } = this.props;

    if (location !== prevProps.location) {
      fetchYelpData(location.coords);
      // TODO: Remove coord in favor of user search?
    }
    // TODO: rework this to reduce action dispatches
    if (
      prevProps.user.sendingRsvp && !user.sendingRsvp
      || prevProps.user.removingRsvp && !user.removingRsvp
    ) {
      if (this.props.user.message) {
        fetchPlaces();
        fetchRsvps();
      }
    }
  }

  renderCards() {
    const { yelp } = this.props;

    return yelp.data.map((item, index) => (
      <BusinessCard
        key={item.name}
        imageUri={item.image_url}
        name={item.name}
        rating={item.rating}
        reviewCount={item.review_count}
        url={item.url}
        location={item.location}
        categories={item.categories}
        updateUserRsvp={this.props.updateUserRsvp}
        removeRsvp={this.props.removeRsvp}
        places={this.props.places}
        userRsvps={this.props.user.rsvps}
      />
    ));
  }

  render() {
    const { location, yelp } = this.props;
    const currentLocation = location ? location.coords : {};
    if (!yelp.data) {
      return <Spinner />;
    }
    return (
      <ScrollView>
        <SearchBar
          lightTheme
          placeholder="Search"
          icon={{ type: 'font-awesome', name: 'search' }}
          containerStyle={{ backgroundColor: 'transparent' }}
        />
        {this.renderCards()}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  location: state.user.location,
  yelp: state.yelp,
  places: state.places,
  user: state.user,
});

export default connect(mapStateToProps, {
  fetchUserLocation,
  fetchYelpData,
  updateUserRsvp,
  removeRsvp,
  fetchRsvps,
  fetchPlaces,
})(Nearby);
