import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { BLACK } from '../../constants/style';

const styles = {
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1,
  },
  inputStyle: {
    color: BLACK,
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
  },
};

const Input = (props) => {
  const { containerStyle, labelStyle, inputStyle } = styles;
  const {
    label, value, onChangeText, secureTextEntry, placeholder,
  } = props;
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        style={inputStyle}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export { Input };

