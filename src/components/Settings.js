import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { WHITE } from '../constants/style';

const styles = {
  containerStyle: {
    padding: 16,
    backgroundColor: WHITE,
  },
};

const Settings = () => (
  <View>
    <TouchableOpacity
      style={styles.containerStyle}
      onPress={() => firebase.auth().signOut()}
    >
      <Text>Sign out</Text>
    </TouchableOpacity>
  </View>
);

export default Settings;

