import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default CreatePostsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.photo}>
        <Image
          style={styles.cameraIcon}
          source={require('../../assets/cameraIcon.png')}
        />
      </View>
      <Text style={styles.text}>Завантажте фото</Text>
      <KeyboardAvoidingView
        style={styles.description}
        behavior={
          Platform.OS == 'ios' ? 'padding' : 'height'
        }
      >
        <TextInput
          label="Назва..."
          value={null}
          onChangeText={null}
          style={styles.input}
        />
        <TextInput
          label="Місцевість..."
          value={null}
          onChangeText={null}
          left={
            <TextInput.Icon icon="map-marker-plus-outline" />
          }
          style={styles.input}
        />
      </KeyboardAvoidingView>
      <Button
        disabled={true}
        mode="contained"
        buttonColor="darkorange"
        onPress={() => null}
        style={styles.publishBtn}
      >
        Опублікувати
      </Button>
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
});
