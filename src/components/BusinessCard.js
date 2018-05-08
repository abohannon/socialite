import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import Communications from 'react-native-communications';
import { removeRsvp, updateUserRsvp, updatePlaceRsvp } from '../actions';
import { Button } from './common';
import { BLACK, GREY_LIGHT, GREY_DARK, GREEN, RED_BROWN } from '../constants/style';

const styles = {
  cardContainerStyle: {
    borderRadius: 4,
    shadowColor: BLACK,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  viewContainerStyle: {
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
  detailsContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 4,
  },
  phoneStyle: {
    fontSize: 12,
    marginRight: 8,
  },
  openStyle: {
    color: GREEN,
    fontSize: 12,
  },
  closedStyle: {
    color: RED_BROWN,
    fontSize: 12,
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
      props.updatePlaceRsvp(placeData);
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

    const message = `${count} Going`;

    return message;
  }

  renderCategories = ({ categories }) => categories.map(category => category.title).join(', ');

  renderOpenStatus = ({ openStyle, closedStyle }) => {
    if (this.props.isClosed) {
      return <Text style={closedStyle}>Closed</Text>;
    }

    return <Text style={openStyle}>Open</Text>;
  }

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
      price,
      phone,
      displayPhone,
      isClosed,
    } = this.props;

    const placeData = {
      name,
      imageUri,
      rating,
      reviewCount,
      location,
      categories,
      url,
      price,
      phone,
      displayPhone,
      isClosed,
    };

    const {
      cardContainerStyle,
      viewContainerStyle,
      contentStyle,
      addressContainerStyle,
      ratingsContainerStyle,
      ratingsStyle,
      addressTextStyle,
      categoriesStyle,
      detailsContainerStyle,
      phoneStyle,
    } = styles;

    return (
      <Card
        image={{ uri: imageUri }}
        title={name}
        titleStyle={{ color: GREY_DARK }}
        containerStyle={cardContainerStyle}
      >
        <View style={viewContainerStyle}>
          <View className="card__content" style={contentStyle}>
            <View style={addressContainerStyle}>
              <Text style={addressTextStyle}>
                {location.display_address[0]}
              </Text>
              <Text style={addressTextStyle}>
                {location.display_address[1]}
              </Text>
              <View style={detailsContainerStyle}>
                <Text
                  style={phoneStyle}
                  onPress={() => Communications.phonecall(phone, true)}
                >
                  {displayPhone}
                </Text>
                {this.renderOpenStatus(styles)}
              </View>
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
              <View style={ratingsStyle}>
                <Text>Price:</Text>
                <Text>{price}</Text>
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
            {this.renderCount()}
          </Button>
        </View>
      </Card>
    );
  }
}

export default connect(null, {
  removeRsvp, updateUserRsvp, updatePlaceRsvp,
})(BusinessCard);
