import React from 'react';
import { View, Text, Image } from 'react-native';
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

const handleOnPress = (props, placeData) => {
  props.updateUserRsvp(placeData);
};

const renderCategories = ({ categories }) => categories.map(category => category.title).join(', ');

const BusinessCard = (props) => {
  const {
    name,
    imageUri,
    rating,
    reviewCount,
    location,
    updateUserRsvp,
  } = props;

  const placeData = {
    name,
    imageUri,
    rating,
    reviewCount,
    location,
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
            {renderCategories(props)}
          </Text>
        </View>
      </View>
      <View className="card__button">
        <Button onPress={() => handleOnPress(props, placeData)}>0 Going</Button>
      </View>
    </Card>
  );
};

export default BusinessCard;
