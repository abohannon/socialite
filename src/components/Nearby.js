import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Text, Image } from 'react-native';
import firebase from 'firebase';
import { SearchBar } from 'react-native-elements';
import { Card, Spinner } from './common';
import { fetchUserLocation, fetchYelpData, updateUserRsvp } from '../actions';
import BusinessCard from './BusinessCard';

class Nearby extends Component {
  componentDidMount() {
    const { fetchUserLocation } = this.props;
    fetchUserLocation();
  }

  componentDidUpdate(nextProps) {
    const { fetchYelpData, location } = this.props;

    if (this.props.location !== nextProps.location) {
      fetchYelpData(location.coords);
    }
  }

  renderCards(props) {
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
});

export default connect(mapStateToProps, {
  fetchUserLocation,
  fetchYelpData,
  updateUserRsvp,
})(Nearby);
