import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
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
  Dialog,
  Portal,
} from 'react-native-paper';
import background from '../../assets/background.jpg';
import { StatusBar } from 'expo-status-bar';

export default RegistrationScreen = () => {
  const [isKeyboardShown, setKeyboardShown] =
    useState(false);
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
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

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const credentials = `login: ${login}, e-mail: ${email}, pass: ${password}`;

  const handleSignup = () => {
    console.debug('CREDENTIALS:', credentials);
    showDialog();
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

            <TextInput
              style={styles.input}
              label="Адреса електронної пошти"
              value={email}
              onChangeText={setEmail}
            />

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
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>CREDENTIALS</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">
                {credentials}
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
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
    height: '75%',
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

  credentials: {
    marginBottom: 43,
  },

  input: {
    marginBottom: 16,
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
