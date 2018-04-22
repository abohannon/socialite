import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { Button } from './common';
import { GREY_LIGHT, GREY_DARK } from '../constants/style';

const styles = {
  containerStyle: {
    marginBottom: 16,
  },
  contentStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  addressContainerStyle: {
    flex: 2,
    paddingRight: 8,
  },
  addressTextStyle: {
    fontSize: 18,
  },
  ratingsContainerStyle: {
    flex: 1,
  },
  ratingsStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoriesStyle: {
    fontSize: 12,
    color: GREY_LIGHT,
  },
};

class BusinessCard extends Component {
  handleOnPress = (props, placeData) => {
    const rsvps = props.userRsvps.reduce((prev, curr) => {
      prev[curr.data.name] = curr;
      return prev;
    }, {});

    if (rsvps[placeData.name]) {
      props.removeRsvp(placeData);
    } else {
      props.updateUserRsvp(placeData);
    }
  };

  renderCount = () => {
    const { places, name } = this.props;

    let count;

    if (places.data[name] && !places.data[name].rsvp) count = 0;

    if (places.data && places.data[name]) {
      if (places.data[name].rsvps) {
        const { rsvps } = places.data[name];
        const rsvpCount = Object.keys(rsvps).length || 0;
        count = rsvpCount;
      }
    } else {
      count = 0;
    }

    return count;
  }

  renderCategories = ({ categories }) => categories.map(category => category.title).join(', ');

  render() {
    const {
      name,
      imageUri,
      rating,
      reviewCount,
      location,
      updateUserRsvp,
      categories,
      url,
      places,
    } = this.props;

    const placeData = {
      name,
      imageUri,
      rating,
      reviewCount,
      location,
      categories,
      url,
    };

    const {
      containerStyle,
      contentStyle,
      addressContainerStyle,
      ratingsContainerStyle,
      ratingsStyle,
      addressTextStyle,
      categoriesStyle,
    } = styles;

    return (
      <Card
        image={{ uri: imageUri }}
        title={name}
        titleStyle={{ color: GREY_DARK }}
      >
        <View style={containerStyle}>
          <View className="card__content" style={contentStyle}>
            <View style={addressContainerStyle}>
              <Text style={addressTextStyle}>
                {location.display_address[0]}
              </Text>
              <Text style={addressTextStyle}>
                {location.display_address[1]}
              </Text>
            </View>
            <View className="card__ratings" style={ratingsContainerStyle}>
              <View style={ratingsStyle}>
                <Text>Rating:</Text>
                <Text>{rating}</Text>
              </View>
              <View style={ratingsStyle}>
                <Text>Reviews:</Text>
                <Text>{reviewCount}</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={categoriesStyle}>
              {this.renderCategories(this.props)}
            </Text>
          </View>
        </View>
        <View className="card__button">
          <Button onPress={() => this.handleOnPress(this.props, placeData)}>
            {this.renderCount()} Going
          </Button>
        </View>
      </Card>
    );
  }
}

export default BusinessCard;
