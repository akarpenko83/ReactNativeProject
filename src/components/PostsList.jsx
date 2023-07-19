import {
  FontAwesome5,
  EvilIcons,
} from '@expo/vector-icons';
import {
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { postsSelectors } from '../redux/posts/postsSlice';
import { useNavigation } from '@react-navigation/native';

export default function PostsList() {
  const navigation = useNavigation();

  const postsArray = useSelector(
    postsSelectors.selectPosts,
  );

  const posts = [...postsArray].sort(
    (a, b) => b.data.postDate - a.data.postDate,
  );

  return (
    <>
      {posts.map(post => (
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
                color="gray"
              />
              <Text
                style={{
                  fontSize: 14,
                  color: 'gray',
                }}
              >
                {'  '}
                Comments
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
