import { StatusBar } from 'expo-status-bar';
import { name as appName } from './app.json';
import {
  AppRegistry,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import background from './assets/background.jpg';
import RegistrationScreen from './src/screens/RegistrationScreen';
import { PaperProvider } from 'react-native-paper';
import LoginScreen from './src/screens/LoginScreen';
import PostsScreen from './src/screens/PostsScreen';

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={background}
          resizeMode="cover"
          style={styles.image}
        >
          <RegistrationScreen />
          {/* <LoginScreen /> */}
          {/* <PostsScreen /> */}
        </ImageBackground>
        <StatusBar style="auto" />
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: '100%',
  },
});

AppRegistry.registerComponent(appName, () => App);
