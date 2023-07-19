import { name as appName } from './app.json';
import {
  AppRegistry,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import RegistrationScreen from './src/screens/RegistrationScreen';
import { PaperProvider } from 'react-native-paper';
import LoginScreen from './src/screens/LoginScreen';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import CommentsScreen from './src/screens/CommentsScreen';
import MapScreen from './src/screens/MapScreen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';
import getHeaderTitle from './src/helpers/getHeaderTitle';
import getBackedNavigation from './src/helpers/getBackedNavigation';
import getHeaderShown from './src/helpers/getHeaderShown';

const MainStack = createStackNavigator();

export default function App({ navigation }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
          >
            <NavigationContainer>
              <MainStack.Navigator initialRouteName="Login">
                <MainStack.Screen
                  name="Signup"
                  component={RegistrationScreen}
                  options={{ headerShown: false }}
                />
                <MainStack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{ headerShown: false }}
                />
                <MainStack.Screen
                  name="Home"
                  component={Home}
                  options={({ route }) => ({
                    headerLeft: getBackedNavigation(
                      route,
                      navigation,
                    ),
                    headerTitle: getHeaderTitle(route),
                  })}
                />
                <MainStack.Screen
                  name="CommentsScreen"
                  component={CommentsScreen}
                  options={{
                    title: 'Коментарі',
                    headerTitleAlign: 'center',
                  }}
                />
                <MainStack.Screen
                  name="MapScreen"
                  component={MapScreen}
                  options={{
                    title: 'Мапа',
                    headerTitleAlign: 'center',
                  }}
                />
              </MainStack.Navigator>
            </NavigationContainer>
          </TouchableWithoutFeedback>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => App);
