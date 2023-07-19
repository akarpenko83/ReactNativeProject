import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

export default function getHeaderShown(route) {
  const routeName =
    getFocusedRouteNameFromRoute(route) ?? 'PostsScreen';

  switch (routeName) {
    case 'ProfileScreen':
      return false;
    default:
      return true;
  }
}
