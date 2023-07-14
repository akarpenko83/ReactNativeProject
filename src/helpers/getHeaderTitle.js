import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

export default function getHeaderTitle(route) {
  const routeName =
    getFocusedRouteNameFromRoute(route) ?? 'PostsScreen';

  switch (routeName) {
    case 'PostsScreen':
      return 'Публікації';
    case 'ProfileScreen':
      return 'Профіль';
    case 'CreatePostsScreen':
      return 'Додати пост';
  }
}
