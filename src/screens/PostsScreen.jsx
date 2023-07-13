import { useRoute } from '@react-navigation/native';
import {
  FontAwesome5,
  EvilIcons,
} from '@expo/vector-icons';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default PostsScreen = ({ navigation }) => {
  const {
    params: { email, name, newPost },
  } = useRoute();

  const commentsPress = () => {
    navigation.navigate('CommentsScreen');
  };
  const mapScreenPress = () => {
    navigation.navigate('MapScreen', {
      location: newPost.location,
    });
  };

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

      {newPost && (
        <View>
          <View style={styles.photo}>
            <Image
              source={{ uri: newPost.uri }}
              style={styles.capturedImage}
            />
          </View>
          <Text style={styles.locationTitle}>
            {newPost.title}
          </Text>
          <View style={styles.description}>
            <TouchableOpacity
              style={{
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
              onPress={() => {
                commentsPress();
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
                mapScreenPress();
              }}
            >
              <EvilIcons
                name="location"
                size={20}
                color="black"
              />
              <Text>{newPost.locationTitle}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
