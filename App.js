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
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
const MainStack = createStackNavigator();

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName =
    getFocusedRouteNameFromRoute(route) ?? 'PostsScreen';

  switch (routeName) {
    case 'PostsScreen':
      return 'Публікації';
    case 'ProfileScreen':
      return 'Профіль';
    case 'CreatePostsScreen':
      return 'Додати пост';
  }
}

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
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Home"
              component={Home}
              options={({ route }) => ({
                headerTitle: getHeaderTitle(route),
              })}
            />
          </MainStack.Navigator>
        </NavigationContainer>
      </TouchableWithoutFeedback>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);
