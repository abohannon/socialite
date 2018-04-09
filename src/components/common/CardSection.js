import React from 'react';
import { View } from 'react-native';
import { WHITE } from '../../constants/style';

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: WHITE,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
  },
};

const CardSection = props => (
  <View style={styles.containerStyle}>
    {props.children}
  </View>
);

export { CardSection };

