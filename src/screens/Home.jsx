import ProfileScreen from './ProfileScreen';
import PostsScreen from './PostsScreen';
import CreatePostsScreen from './CreatePostsScreen';
import { Image, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { authOperations } from '../redux/auth/authOperations';
import { useDispatch } from 'react-redux';
import getHeaderShown from '../helpers/getHeaderShown';
import { useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createMaterialBottomTabNavigator();

export default Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const route = useRoute();

  console.log(getHeaderShown(route));

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerShown: getHeaderShown(route),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            dispatch(authOperations.logout());
            navigation.navigate('Login');
          }}
        >
          <Image
            style={styles.logoutBtn}
            source={require('../../assets/log-out.png')}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, route]);

  return (
    <Tab.Navigator
      initialRouteName="PostsScreen"
      labeled={false}
      activeColor="orange"
      inactiveColor="black"
      barStyle={{
        backgroundColor: 'lightgray',
      }}
    >
      <Tab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="dots-square"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        tabBarLabel="Додати пост"
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        tabBarLabel="Профіль"
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  logoutBtn: {
    marginHorizontal: 15,

    width: 24,
    height: 24,
  },
});
