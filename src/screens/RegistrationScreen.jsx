import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import background from '../../assets/background.jpg';

export default RegistrationScreen = () => (
  <SafeAreaView style={styles.container}>
    <ImageBackground
      source={background}
      resizeMode="contain"
      style={styles.image}
    >
      <Text style={styles.text}>Inside</Text>
    </ImageBackground>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
});
