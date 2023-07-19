import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { TextInput } from 'react-native-paper';

import CommentsList from '../components/CommentsList';
import { useDispatch, useSelector } from 'react-redux';
import { authSelectors } from '../redux/auth/authSlice';
import { commentsOperations } from '../redux/comments/commentsOperations';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';

export default CommentsScreen = () => {
  const dispatch = useDispatch();
  const currentUserUid = useSelector(
    authSelectors.selectUserUid,
  );
  useEffect(() => {
    dispatch(commentsOperations.getComments(postId));
  }, []);

  const [commentText, setCommentText] = useState(null);
  const {
    params: { postId, uri },
  } = useRoute();

  const handleSendComment = async () => {
    if (!commentText || commentText.trim() === '') {
      Alert.alert('Please enter a comment');

      return;
    }

    const newComment = {
      currentUserId: currentUserUid,
      postId: postId,
      date: Date.now(),
      avatarUrl: null,
      commentText: commentText,
    };
    await dispatch(
      commentsOperations.addComment(newComment),
    );
    await dispatch(commentsOperations.getComments(postId));
    const formReset = () => {
      setCommentText(null);
    };

    formReset();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.post}>
        <Image source={{ uri: uri }} style={styles.image} />
      </View>
      <ScrollView style={styles.postsContainer}>
        <CommentsList />
      </ScrollView>
      <KeyboardAvoidingView
        behavior={
          Platform.OS == 'ios' ? 'padding' : 'height'
        }
      >
        <View style={styles.inputContainer}>
          <TextInput
            label="Коментувати..."
            value={commentText}
            mode="outlined"
            onChangeText={setCommentText}
            right={
              <TextInput.Icon
                size={38}
                color="darkorange"
                icon="arrow-up-thin-circle-outline"
                onPress={handleSendComment}
              />
            }
            outlineStyle={{ borderRadius: 25 }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  post: {
    marginBottom: 16,
    width: '100%',
    height: 240,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
  },
  postsContainer: {
    width: '100%',
    height: 150,
  },
  inputContainer: {
    paddingBottom: 8,
  },
});
