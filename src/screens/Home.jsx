import ProfileScreen from './ProfileScreen';
import PostsScreen from './PostsScreen';
import CreatePostsScreen from './CreatePostsScreen';
import { Image, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Tab = createMaterialBottomTabNavigator();

export default Home = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',

      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
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
  }, [navigation]);
  return (
    <Tab.Navigator
      initialRouteName="PostsScreen"
      labeled={false}
      activeColor="orange"
      inactiveColor="black"
      barStyle={{ backgroundColor: '#694fad' }}
    >
      <Tab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../../assets/postsIcon.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        tabBarLabel="Додати пост"
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../../assets/addBtn.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        tabBarLabel="Профіль"
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../../assets/userIcon.png')}
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
