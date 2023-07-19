import { useRoute } from '@react-navigation/native';

import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelectors } from '../redux/auth/authSlice';
import PostsList from '../components/PostsList';
import { postsSelectors } from '../redux/posts/postsSlice';
import { postsOperations } from '../redux/posts/postsOperations';
import { ScrollView } from 'react-native-gesture-handler';

export default PostsScreen = () => {
  const dispatch = useDispatch();

  const email = useSelector(authSelectors.selectUserEmail);
  const name = useSelector(authSelectors.selectUsername);
  const posts = useSelector(postsSelectors.selectPosts);
  const currentUserUid = useSelector(
    authSelectors.selectUserUid,
  );

  useEffect(() => {
    dispatch(postsOperations.getPosts(currentUserUid));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.post}>
        <Image
          source={require('../../assets/avatar.jpg')}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text>{email}</Text>
        </View>
      </View>
      <ScrollView style={styles.postsContainer}>
        {posts && posts.length > 0 && <PostsList />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },

  logoutBtn: {
    marginRight: 10,
    width: 24,
    height: 24,
  },
  post: {
    flexDirection: 'row',
    paddingVertical: 8,

    alignItems: 'center',
    width: '100%',
  },
  avatar: {
    borderRadius: 16,
    marginRight: 10,
    width: 60,
    height: 60,
  },
  name: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  photo: {
    marginBottom: 8,
    position: 'relative',
    width: '100%',
    height: 240,
    backgroundColor: '#E8E8E8',
    borderRadius: 6,
    overflow: 'hidden',
  },
  postsContainer: {
    marginBottom: 80,
  },
  capturedImage: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 18,
    color: 'black',
  },
  description: {
    flexWrap: 'wrap',
    height: 30,
    justifyContent: 'center',
    alignContent: 'space-between',
  },
});
