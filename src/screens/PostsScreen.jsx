import { useRoute } from '@react-navigation/native';

import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';

export default PostsScreen = () => {
  const {
    params: { email, name },
  } = useRoute();

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
});
