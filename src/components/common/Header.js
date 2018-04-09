import React from 'react';
import { View, Text } from 'react-native';

const componentStyles = {
  containerStyle: {
    paddingTop: 20,
    height: 75,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
};

const Header = (props) => {
  const { containerStyle } = componentStyles;
  const { title } = props;
  return (
    <View style={containerStyle}>
      <Text>{title}</Text>
    </View>
  );
};

export { Header };
