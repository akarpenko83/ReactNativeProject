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
import CommentsScreen from './src/screens/CommentsScreen';
import MapScreen from './src/screens/MapScreen';
const MainStack = createStackNavigator();

function getBackedNavigation(route) {
  const routeName =
    getFocusedRouteNameFromRoute(route) ??
    'CreatePostsScreen';

  switch (routeName) {
    case 'CreatePostsScreen':
      () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            style={styles.logoutBtn}
            source={require('./assets/arrow-left.png')}
          />
        </TouchableOpacity>
      );
      break;
    default:
      return null;
  }
}

function getHeaderTitle(route) {
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
                headerLeft: getBackedNavigation(route),
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
  );
}

AppRegistry.registerComponent(appName, () => App);
