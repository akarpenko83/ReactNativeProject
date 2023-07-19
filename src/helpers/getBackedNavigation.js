const {
  getFocusedRouteNameFromRoute,
} = require('@react-navigation/native');

export default function getBackedNavigation(
  route,
  navigation,
) {
  const routeName =
    getFocusedRouteNameFromRoute(route) ??
    'CreatePostsScreen';

  switch (routeName) {
    case 'CreatePostsScreen':
      () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home', {
              screen: 'PostsScreen',
            });
          }}
        >
          <Image
            style={styles.logoutBtn}
            source={require('../../assets/arrow-left.png')}
          />
        </TouchableOpacity>
      );
      break;
    default:
      return null;
  }
}
