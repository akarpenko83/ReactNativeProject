import React, { useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainBox}>
        <Text style={styles.header}>Увійти</Text>
        <View style={styles.credentials}>
          <KeyboardAvoidingView
            behavior={
              Platform.OS == 'ios' ? 'padding' : 'height'
            }
          >
            <TextInput
              style={styles.input}
              label="Адреса електронної пошти"
              value={null}
              onChange={null}
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView
            behavior={
              Platform.OS == 'ios' ? 'padding' : 'height'
            }
          >
            <TextInput
              style={[styles.input, styles.password]}
              secureTextEntry={true}
              label="Пароль"
              value={null}
              onChange={null}
            />
          </KeyboardAvoidingView>
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
    justifyContent: 'flex-end',
  },
  mainBox: {
    paddingTop: 40,
    paddingHorizontal: 16,
    width: '100%',
    height: '68%',
    backgroundColor: 'white',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
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
