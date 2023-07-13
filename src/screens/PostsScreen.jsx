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
    // flex: 1,
    flexWrap: 'wrap',
    height: 30,
    justifyContent: 'center',
    alignContent: 'space-between',
  },
});
//----------------
// import React from 'react';
// import {
//   Image,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const PostsScreen = ({ photoCollection }) => {
//   const {
//     params: { email, name },
//   } = useRoute();

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.post}>
//         <Image
//           source={require('../../assets/avatar.jpg')}
//           style={styles.avatar}
//         />
//         <View>
//           <Text style={styles.name}>{name}</Text>
//           <Text>{email}</Text>
//         </View>
//       </View>
//       <View style={styles.collectionContainer}>
//         {photoCollection ? (
//           photoCollection.map((photo, index) => (
//             <View key={index} style={styles.post}>
//               <Image
//                 source={{ uri: photo.uri }}
//                 style={styles.thumbnail}
//               />
//               <View>
//                 <Text style={styles.title}>
//                   {photo.titlePhoto}
//                 </Text>
//                 <Text style={styles.location}>
//                   {photo.location}
//                 </Text>
//               </View>
//             </View>
//           ))
//         ) : (
//           <Text style={styles.emptyText}>
//             No photos captured yet.
//           </Text>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     display: 'flex',
//     justifyContent: 'flex-start',
//     flexDirection: 'column',
//     paddingHorizontal: 16,
//   },

//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 20,
//     textAlign: 'center',
//   },

//   logoutBtn: {
//     marginRight: 10,
//     width: 24,
//     height: 24,
//   },
//   post: {
//     flexDirection: 'row',
//     paddingVertical: 8,

//     alignItems: 'center',
//     width: '100%',
//   },
//   avatar: {
//     borderRadius: 16,
//     marginRight: 10,
//     width: 60,
//     height: 60,
//   },
//   name: {
//     fontWeight: 'bold',
//     color: 'black',
//     fontSize: 16,
//   },
//   collectionContainer: {
//     flex: 1,
//     paddingHorizontal: 16,
//     justifyContent: 'flex-start',
//   },
//   post: {
//     flexDirection: 'row',
//     paddingVertical: 8,
//     alignItems: 'center',
//   },
//   thumbnail: {
//     width: 60,
//     height: 60,
//     marginRight: 10,
//     borderRadius: 30,
//   },
//   titlePhoto: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   location: {
//     fontSize: 14,
//     color: '#BDBDBD',
//   },
//   emptyText: {
//     fontSize: 16,
//     marginTop: 16,
//   },
// });

// export default PostsScreen;
