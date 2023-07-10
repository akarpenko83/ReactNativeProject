import React, { useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {
  TextInput,
  Text,
  Button,
} from 'react-native-paper';

export default LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainBox}>
        <Text style={styles.header}>Увійти</Text>
        <View style={styles.credentials}>
          <TextInput
            style={styles.input}
            label="Адреса електронної пошти"
            value={null}
            onChange={null}
          />

          <TextInput
            style={[styles.input, styles.password]}
            secureTextEntry={true}
            label="Пароль"
            value={null}
            onChange={null}
          />
          <Button
            mode="text"
            textColor="blue"
            onPress={() =>
              console.log('Pressed showpassword')
            }
            style={styles.showPass}
          >
            Показати
          </Button>
        </View>
        <Button
          mode="contained"
          buttonColor="darkorange"
          onPress={() => console.log('Pressed Login')}
          style={styles.submitBtn}
        >
          Увійти
        </Button>

        <Button
          mode="text"
          textColor="blue"
          onPress={() => console.log('Pressed Signup')}
        >
          Немає акаунту? Зареєструватися
        </Button>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  mainBox: {
    position: 'relative',
    paddingTop: 40,
    paddingLeft: 16,
    paddingRight: 16,
    width: '100%',
    height: '60%',
    backgroundColor: 'white',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  avatarBox: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -40 }, { translateY: -60 }],
    shadowColor: 'black',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 15,
    width: 120,
    height: 120,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#F6F6F6F6',
    borderColor: 'black',
    borderRadius: 16,
  },
  avatar: {
    borderRadius: 16,
    width: '100%',
    height: '100%',
  },
  addBtn: {
    position: 'absolute',
    right: -12,
    bottom: 12,
  },
  header: {
    marginBottom: 32,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    textShadowOffset: { width: 4, height: 4 },
    textShadowColor: 'gray',
    textShadowRadius: 15,
  },
  input: {
    marginBottom: 16,
  },
  credentials: {
    marginBottom: 63,
  },
  showPass: {
    position: 'absolute',
    right: 15,
    bottom: 25,
  },
  submitBtn: {
    marginBottom: 12,
  },
});
