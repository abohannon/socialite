import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import debounce from 'lodash/debounce';
import { Spinner, SearchInput } from './common';
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
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
    };

    this.onChangeTextDelayed = debounce(this.handleSearchInput, 500);
  }
  componentDidMount() {
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
    }

    const placeRsvpUpdated = prevProps.user.sendingPlaceRsvp && !user.sendingPlaceRsvp;
    const placeRsvpRemoved = prevProps.user.removingRsvp && !user.removingRsvp;

    if (placeRsvpUpdated || placeRsvpRemoved) {
      fetchPlaces();
      fetchRsvps();
    }
  }

  handleSearchInput = (searchTerm) => {
    const { location, fetchYelpData } = this.props;

    this.setState({
      searchTerm,
    });

    fetchYelpData(location.coords, this.state.searchTerm);
  }

  renderCards() {
    const { yelp } = this.props;

    return yelp.data.map((item, index) => (
      <BusinessCard
        key={index}
        imageUri={item.image_url}
        name={item.name}
        rating={item.rating}
        reviewCount={item.review_count}
        url={item.url}
        displayPhone={item.display_phone}
        phone={item.phone}
        price={item.price}
        isClosed={item.is_closed}
        location={item.location}
        categories={item.categories}
        places={this.props.places}
        userRsvps={this.props.user.rsvps}
      />
    ));
  }

  render() {
    const { yelp } = this.props;

    if (!yelp.data) {
      return <Spinner />;
    }
    return (
      <ScrollView>
        <SearchInput
          showLoadingIcon={yelp.fetchingData}
          onChangeText={this.onChangeTextDelayed}
          value={this.state.searchTerm}
          placeholder="Where do you want to go?"
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
