import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {
  FontAwesome5,
  EvilIcons,
} from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { postsSelectors } from '../redux/posts/postsSlice';
import { commentsOperations } from '../redux/comments/commentsOperations';

export default function PostsList() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const postsArray = useSelector(
    postsSelectors.selectPosts,
  );
  const [commentsLength, setCommentsLength] = useState({});

  useEffect(() => {
    const fetchCommentsLength = async postId => {
      try {
        const response = await dispatch(
          commentsOperations.getComments(postId),
        );
        const length = response.payload.length;
        setCommentsLength(prev => ({
          ...prev,
          [postId]: length,
        }));
      } catch (error) {
        console.log(error);
      }
    };

    postsArray.forEach(post => {
      fetchCommentsLength(post.id);
    });
  }, [dispatch, postsArray]);

  return (
    <>
      {postsArray.map(post => (
        <View key={post.id}>
          <View style={styles.photo}>
            <Image
              source={{ uri: post.data.uri }}
              style={styles.capturedImage}
            />
          </View>
          <Text style={styles.locationTitle}>
            {post.data.title}
          </Text>
          <View style={styles.description}>
            <TouchableOpacity
              style={{
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
              onPress={() => {
                navigation.navigate('CommentsScreen', {
                  postId: post.id,
                  uri: post.data.uri,
                });
              }}
            >
              <FontAwesome5
                name="comments"
                size={20}
                color={
                  commentsLength[post.id]
                    ? 'darkorange'
                    : 'gray'
                }
              />
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  marginLeft: 8,
                }}
              >
                {commentsLength[post.id]
                  ? commentsLength[post.id].toString()
                  : '0'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
              onPress={() => {
                navigation.navigate('MapScreen', {
                  location: post.data.location,
                });
              }}
            >
              <EvilIcons
                name="location"
                size={20}
                color="black"
              />
              <Text>{post.data.locationTitle}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  photo: {
    marginBottom: 8,
    position: 'relative',
    width: '100%',
    height: 240,
    backgroundColor: '#E8E8E8',
    borderRadius: 6,
    overflow: 'hidden',
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
