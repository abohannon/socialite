import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import { BLACK } from '../../constants/style';

const Input = (props) => {
  const {
    label, value, onChangeText, secureTextEntry, placeholder,
  } = props;
  return (
    <View>
      <FormLabel>{label}</FormLabel>
      <FormInput
        placeholder={placeholder}
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export { Input };

