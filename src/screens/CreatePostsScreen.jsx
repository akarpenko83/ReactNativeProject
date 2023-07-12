import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default CreatePostsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>CreatePostsScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
