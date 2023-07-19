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
import { Text } from 'react-native-paper';
import background from '../../assets/background.jpg';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { authSelectors } from '../redux/auth/authSlice';
import {
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { authOperations } from '../redux/auth/authOperations';
import PostsList from '../components/PostsList';
import { postsSelectors } from '../redux/posts/postsSlice';

export default ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.selectUsername);
  const posts = useSelector(postsSelectors.selectPosts);
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
            <Image
              source={require('../../assets/avatar.jpg')}
              style={styles.avatar}
            />

            <Image
              source={require('../../assets/addBtnDisabled.png')}
              style={styles.addBtn}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              right: 16,
              top: 22,
              width: 24,
              height: 24,
            }}
          >
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
          </View>
          <Text style={styles.header}>{name}</Text>
          <ScrollView>
            {posts && posts.length > 0 && <PostsList />}
          </ScrollView>
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
    position: 'relative',
    paddingTop: 80,
    paddingHorizontal: 16,
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
  logoutBtn: {
    width: 24,
    height: 24,
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
});
