import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import Routes from './src/Routes';
import configureStore from './src/store/configureStore';

const store = configureStore();
export default class App extends Component {
  constructor(props) {
    super(props);
    // Initialize Firebase
    firebase.initializeApp({
      apiKey: 'AIzaSyASWMSd5uCVLPEKimaK6EDnWoQRWx7DN9I',
      authDomain: 'react-native-social-app-4322c.firebaseapp.com',
      databaseURL: 'https://react-native-social-app-4322c.firebaseio.com',
      projectId: 'react-native-social-app-4322c',
      storageBucket: '',
      messagingSenderId: '917447438216',
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

// disable warning notification in simulator
console.disableYellowBox = true;
