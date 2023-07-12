import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
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
import background from '../../assets/background.jpg';
import { StatusBar } from 'expo-status-bar';

export default RegistrationScreen = () => {
  const [isKeyboardShown, setKeyboardShown] =
    useState(false);
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardShown(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardShown(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleSignup = () => {
    const credentials = `login: ${login}, e-mail: ${email}, pass: ${password}`;
    const emailRegex =
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (emailRegex.test(email)) {
      Alert.alert('Success', 'Valid email address!');
      console.log(credentials);
      navigation.navigate('Home', {
        screen: 'PostsScreen',
        params: {
          email: email,
          name: login,
        },
      });
    } else {
      Alert.alert('Error', 'Invalid email address!');
      return;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.mainBox}>
          <View style={styles.avatarBox}>
            {isKeyboardShown && (
              <Image
                source={require('../../assets/avatar.jpg')}
                style={styles.avatar}
              />
            )}
            <Image
              source={
                !isKeyboardShown
                  ? require('../../assets/addBtn.png')
                  : require('../../assets/addBtnDisabled.png')
              }
              style={styles.addBtn}
            />
          </View>
          <Text style={styles.header}>Реєстрація</Text>
          <View style={styles.credentials}>
            <TextInput
              style={styles.input}
              label="Логін"
              mode="flat"
              value={login}
              onChangeText={setLogin}
            />
            <KeyboardAvoidingView
              behavior={
                Platform.OS == 'ios' ? 'padding' : 'height'
              }
            >
              <TextInput
                style={styles.input}
                label="Адреса електронної пошти"
                value={email}
                onChangeText={setEmail}
              />
            </KeyboardAvoidingView>
            <KeyboardAvoidingView
              behavior={
                Platform.OS == 'ios' ? 'padding' : 'height'
              }
            >
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                label="Пароль"
                value={password}
                onChangeText={setPassword}
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
            onPress={() => handleSignup()}
            style={styles.submitBtn}
          >
            Зареєструватися
          </Button>
          <Button
            mode="text"
            textColor="blue"
            onPress={() => navigation.navigate('Login')}
          >
            Вже є акаунт? Увійти
          </Button>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  mainBox: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    width: '100%',
    height: '85%',
    backgroundColor: 'white',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  avatarBox: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -40 }, { translateY: -50 }],
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
    marginBottom: 12,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    textShadowOffset: { width: 4, height: 4 },
    textShadowColor: 'gray',
    textShadowRadius: 15,
  },

  credentials: {
    marginBottom: 70,
  },

  input: {
    marginBottom: 6,
    height: 45,
  },
  showPass: {
    position: 'absolute',
    right: 15,
    bottom: 10,
  },
  submitBtn: {
    marginBottom: 12,
  },
});
