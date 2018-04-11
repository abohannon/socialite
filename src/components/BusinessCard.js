import React from 'react';
import { View, Text, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { Button } from './common';

renderCategories = ({ categories }) => categories.map(category => category.title).join(', ');

const BusinessCard = (props) => {
  const {
    name,
    imageUri,
    rating,
    reviewCount,
    location,
  } = props;
  return (
    <Card
      image={{ uri: imageUri }}
      title={name}
    >
      <View className="card__content">
        <View>
          <Text>
            Rating: {rating}
          </Text>
          <Text>
            Reviews: {reviewCount}
          </Text>
        </View>
        <View>
          <Text>
            {location.display_address[0]}
          </Text>
          <Text>
            {location.display_address[1]}
          </Text>
        </View>
        <View>
          <Text>
            {this.renderCategories(props)}
          </Text>
        </View>
      </View>
      <View className="card__button">
        <Button>0 Going</Button>
      </View>
    </Card>
  );
};

export default BusinessCard;
