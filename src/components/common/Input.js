import React from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import { WHITE, WHITE_50 } from '../../constants/style';

const styles = {
  labelStyle: {
    marginLeft: 0,
    marginRight: 0,
    color: WHITE,
  },
  containerStyle: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
  },
  inputStyle: {
    width: '100%',
    color: WHITE,
  },
};

const Input = (props) => {
  const {
    label, value, onChangeText, secureTextEntry, placeholder, validate,
  } = props;

  const { labelStyle, containerStyle, inputStyle } = styles;

  return (
    <View>
      <FormLabel labelStyle={labelStyle}>{label}</FormLabel>
      <FormInput
        placeholder={placeholder}
        placeholderTextColor={WHITE_50}
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        containerStyle={containerStyle}
        inputStyle={inputStyle}
      />
    </View>
  );
};

export { Input };

