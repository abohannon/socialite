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
  fetchRsvps,
  fetchPlaces,
} from '../actions';
import BusinessCard from './BusinessCard';

class Nearby extends Component {
  componentDidMount() {
    const { fetchUserLocation, fetchPlaces } = this.props;
    fetchUserLocation();
    fetchPlaces();
  }

  componentDidUpdate(nextProps) {
    const {
      fetchYelpData,
      location,
      places,
      fetchRsvps,
      fetchPlaces,
    } = this.props;

    if (location !== nextProps.location) {
      fetchYelpData(location.coords);
      // TODO: Remove coord in favor of user search?
    }

    fetchRsvps();
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
        places={this.props.places}
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
});

export default connect(mapStateToProps, {
  fetchUserLocation,
  fetchYelpData,
  updateUserRsvp,
  fetchRsvps,
  fetchPlaces,
})(Nearby);
