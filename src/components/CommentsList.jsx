import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { useSelector } from 'react-redux';
import { commentsSelectors } from '../redux/comments/commentsSlice';
import { format } from 'date-fns';

export default function CommentsList() {
  const commentsArray = useSelector(
    commentsSelectors.selectComments,
  );

  const comments = [...commentsArray].sort(
    (a, b) => b.data.date - a.data.date,
  );

  return (
    <>
      {comments.map(comment => (
        <View style={styles.container} key={comment.id}>
          <View style={styles.row}>
            <Image
              source={require('../../assets/avatar.jpg')}
              style={styles.avatar}
            />

            <View style={styles.textContainer}>
              <Text style={styles.text}>
                {comment.data.commentText}
              </Text>
              <Text style={styles.date}>
                {format(
                  new Date(comment.data.date),
                  "dd MMMM yyyy'|' HH:mm:ss",
                )}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    padding: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.07)',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  text: {
    marginBottom: 8,
  },
  date: {
    alignSelf: 'flex-end',
    fontSize: 10,
    color: 'rgba(189, 189, 189, 1)',
  },
});
