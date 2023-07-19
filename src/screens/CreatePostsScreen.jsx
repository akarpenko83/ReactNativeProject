import { Camera } from 'expo-camera';
import React, { useLayoutEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';
import { useDispatch, useSelector } from 'react-redux';
import { postsOperations } from '../redux/posts/postsOperations';
import { useNavigation } from '@react-navigation/native';
import { authSelectors } from '../redux/auth/authSlice';

export default CreatePostsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [photoUri, setPhotoUri] = useState(null);
  const [titleText, setTileText] = useState(null);
  const [locationTitle, setLocationTitle] = useState(null);

  const [location, setLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(
    Camera.Constants.Type.back,
  );

  const currentUserUid = useSelector(
    authSelectors.selectUserUid,
  );

  useLayoutEffect(() => {
    (async () => {
      const { status } =
        await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const handleCreatePost = async () => {
    let { status } =
      await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
    }

    let location = await Location.getCurrentPositionAsync(
      {},
    );
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setLocation(coords);

    const newPost = {
      title: titleText,
      locationTitle: locationTitle,
      uri: photoUri,
      location: location,
      currentUserUid: currentUserUid,
      postDate: Date.now(),
    };

    await dispatch(postsOperations.addPost(newPost));
    await dispatch(
      postsOperations.getPosts(currentUserUid),
    );

    resetForm();

    navigation.navigate('Home', {
      screen: 'PostsScreen',
    });
  };

  const resetForm = () => {
    setLocation(null);
    setTileText(null);
    setPhotoUri(null);
    setLocationTitle(null);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.photo}>
        {photoUri ? (
          <Image
            source={{ uri: photoUri }}
            style={styles.capturedImage}
          />
        ) : (
          <Camera
            style={styles.camera}
            type={type}
            ref={setCameraRef}
          >
            <Image
              style={styles.cameraIcon}
              source={require('../../assets/cameraIcon.png')}
            />

            <View style={styles.photoView}>
              <TouchableOpacity
                style={styles.flipContainer}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  );
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 10,
                    color: 'orange',
                  }}
                >
                  Flip
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  if (cameraRef) {
                    // capturePhoto();
                    const { uri } =
                      await cameraRef.takePictureAsync();
                    await MediaLibrary.createAssetAsync(
                      uri,
                    );
                    setPhotoUri(uri);
                  }
                }}
              >
                <View style={styles.takePhotoOut}>
                  <View
                    style={styles.takePhotoInner}
                  ></View>
                </View>
              </TouchableOpacity>
            </View>
          </Camera>
        )}
      </View>
      {photoUri ? (
        <Text style={styles.text}>Редагувати фото</Text>
      ) : (
        <Text style={styles.text}>Завантажте фото</Text>
      )}
      <KeyboardAvoidingView
        style={styles.description}
        behavior={
          Platform.OS == 'ios' ? 'padding' : 'height'
        }
      >
        <TextInput
          label="Назва..."
          value={titleText}
          onChangeText={setTileText}
          style={styles.input}
        />
        <TextInput
          label="Місцевість..."
          value={locationTitle}
          onChangeText={setLocationTitle}
          left={
            <TextInput.Icon icon="map-marker-plus-outline" />
          }
          style={styles.input}
        />
      </KeyboardAvoidingView>

      <TouchableOpacity
        disabled={!(photoUri && titleText && locationTitle)}
        onPress={() => handleCreatePost()}
        style={[
          styles.publishBtn,
          {
            backgroundColor:
              photoUri && titleText && locationTitle
                ? 'darkorange'
                : 'gray',
          },
        ]}
      >
        <Text style={styles.buttonText}>Опублікувати</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
  },

  text: {
    marginBottom: 22,
    color: '#BDBDBD',
    fontSize: 16,
  },
  input: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 32,
  },
  camera: { flex: 1 },
  photoView: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  flipContainer: {
    alignSelf: 'flex-end',
  },

  button: { alignSelf: 'center' },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: 'white',
    height: 50,
    width: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: 'white',
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  photo: {
    marginBottom: 8,
    position: 'relative',
    width: '100%',
    height: 240,
    backgroundColor: '#E8E8E8',
    borderRadius: 6,
  },
  cameraIcon: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
    height: 60,
    width: 60,
  },
  capturedImage: {
    flex: 1,
  },
  publishBtn: {
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

// ----------------------------------------------------------------
// import { Camera } from 'expo-camera';
// import React, { useEffect, useState, useRef } from 'react';
// import {
//   Image,
//   KeyboardAvoidingView,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { Button, TextInput } from 'react-native-paper';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import * as MediaLibrary from 'expo-media-library';
// import PostsScreen from './PostsScreen';

// export default CreatePostsScreen = () => {
//   const [photoUri, setPhotoUri] = useState(null);
//   const [titleText, setTitleText] = useState('');
//   const [pictureLocation, setPictureLocation] =
//     useState('');
//   const [photoCollection, setPhotoCollection] = useState(
//     [],
//   );

//   const cameraRef = useRef(null);

//   useEffect(() => {
//     (async () => {
//       const { status } =
//         await Camera.requestCameraPermissionsAsync();
//       await MediaLibrary.requestPermissionsAsync();
//     })();
//   }, []);

// const capturePhoto = async () => {
//   if (cameraRef.current) {
//     const { uri } =
//       await cameraRef.current.takePictureAsync();
//     await MediaLibrary.createAssetAsync(uri);

//     const newPost = {
//       title: titleText,
//       location: pictureLocation,
//       uri: uri,
//     };

//     setPhotoCollection([...photoCollection, newPost]);
//     setPhotoUri(uri);
//   }
// };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.photo}>
//         {photoUri ? (
//           <Image
//             source={{ uri: photoUri }}
//             style={styles.capturedImage}
//           />
//         ) : (
//           <Camera
//             style={styles.camera}
//             type={Camera.Constants.Type.back}
//             ref={cameraRef}
//           >
//             <Image
//               style={styles.cameraIcon}
//               source={require('../../assets/cameraIcon.png')}
//             />
//             <View style={styles.photoView}>
//               <TouchableOpacity
//                 style={styles.flipContainer}
//                 onPress={() => {
//                   setType(
//                     type === Camera.Constants.Type.back
//                       ? Camera.Constants.Type.front
//                       : Camera.Constants.Type.back,
//                   );
//                 }}
//               >
//                 <Text style={styles.flipText}>Flip</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.button}
//                 onPress={capturePhoto}
//               >
//                 <View style={styles.takePhotoOut}>
//                   <View style={styles.takePhotoInner} />
//                 </View>
//               </TouchableOpacity>
//             </View>
//           </Camera>
//         )}
//       </View>
//       <Text style={styles.text}>Capture a Photo</Text>
//       <KeyboardAvoidingView
//         style={styles.description}
//         behavior={
//           Platform.OS === 'ios' ? 'padding' : 'height'
//         }
//       >
//         <TextInput
//           label="Title..."
//           value={titleText}
//           onChangeText={setTitleText}
//           style={styles.input}
//         />
//         <TextInput
//           label="Location..."
//           value={pictureLocation}
//           onChangeText={setPictureLocation}
//           left={
//             <TextInput.Icon name="map-marker-plus-outline" />
//           }
//           style={styles.input}
//         />
//       </KeyboardAvoidingView>
//       <Button
//         mode="contained"
//         onPress={() => null}
//         style={styles.publishBtn}
//       >
//         Publish
//       </Button>
//       <PostsScreen photoCollection={photoCollection} />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 16,
//     justifyContent: 'flex-start',
//   },
//   photo: {
//     marginBottom: 8,
//     position: 'relative',
//     width: '100%',
//     height: 240,
//     backgroundColor: '#E8E8E8',
//     borderRadius: 6,
//   },
//   camera: {
//     flex: 1,
//   },
//   cameraIcon: {
//     position: 'absolute',
//     left: '50%',
//     top: '50%',
//     transform: [{ translateX: -30 }, { translateY: -30 }],
//     height: 60,
//     width: 60,
//   },
//   photoView: {
//     flex: 1,
//     backgroundColor: 'transparent',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//   },
//   flipContainer: {
//     alignSelf: 'flex-end',
//   },
//   flipText: {
//     fontSize: 18,
//     marginBottom: 10,
//     color: 'orange',
//   },
//   button: {
//     alignSelf: 'center',
//   },
//   takePhotoOut: {
//     borderWidth: 2,
//     borderColor: 'white',
//     height: 50,
//     width: 50,
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 50,
//   },
//   takePhotoInner: {
//     borderWidth: 2,
//     borderColor: 'white',
//     height: 40,
//     width: 40,
//     backgroundColor: 'white',
//     borderRadius: 50,
//   },
//   capturedImage: {
//     flex: 1,
//   },
//   text: {
//     marginBottom: 22,
//     color: '#BDBDBD',
//     fontSize: 16,
//   },
//   input: {
//     marginBottom: 8,
//   },
//   description: {
//     marginBottom: 32,
//   },
//   publishBtn: {
//     backgroundColor: 'darkorange',
//   },
// });
