import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View } from 'react-native';
import {
  fetchRsvps,
  updateUserRsvp,
  removeRsvp,
} from '../actions';
import { Spinner } from './common';
import BusinessCard from './BusinessCard';
import { GREY_LIGHT } from '../constants/style';

const styles = {
  containerStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 32,
  },
};
class MyPlaces extends Component {
  componentDidMount() {
    this.props.fetchRsvps();
  }

  renderRsvps() {
    const { user, places } = this.props;

    if (user.rsvps.length === 0) {
      return (
        <View style={styles.containerStyle}>
          <Text style={{ color: GREY_LIGHT }}>You haven't RSVP'd anywhere yet!</Text>
        </View>
      );
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
})(MyPlaces);
