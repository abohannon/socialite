import React from 'react';
import { View, Text, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { Button } from './common';


const styles = {
  imageStyle: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
};

const BusinessCard = (props) => {
  const {
    name, imageUri, rating, reviewCount,
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
        </View>
        <View>
          <Text>
        Reviews: {reviewCount}
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
