import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { BLACK } from '../../constants/style';

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: BLACK,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: BLACK,
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    flex: 1,
  },
};

const Button = (props) => {
  const { buttonStyle, textStyle } = styles;
  const { style, onPress } = props;
  return (
    <TouchableOpacity
      style={{ ...buttonStyle, ...style }}
      onPress={() => onPress()}
    >
      <Text style={textStyle}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};

export { Button };

