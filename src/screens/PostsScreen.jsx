import { View } from 'react-native';
import { Appbar } from 'react-native-paper';

export default PostsScreen = () => {
  const _goBack = () => console.log('Went back');

  return (
    <View>
      <Appbar.Header mode="center-aligned">
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Публікації" />
      </Appbar.Header>
    </View>
  );
};
