import { name as appName } from './app.json';
import {
  AppRegistry,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import RegistrationScreen from './src/screens/RegistrationScreen';
import { PaperProvider } from 'react-native-paper';
import LoginScreen from './src/screens/LoginScreen';
import PostsScreen from './src/screens/PostsScreen';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const MainStack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <NavigationContainer>
          <MainStack.Navigator initialRouteName="Login">
            <MainStack.Screen
              name="Signup"
              component={RegistrationScreen}
            />
            <MainStack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: null }}
            />

            {/* <PostsScreen /> */}
          </MainStack.Navigator>
        </NavigationContainer>
      </TouchableWithoutFeedback>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);
