import { useRoute } from '@react-navigation/native';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';

export default MapScreen = () => {
  const {
    params: { location },
  } = useRoute();
  const coordinates = location.coords;
  console.log(coordinates);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          region={{
            latitude: coordinates.latitude,
            longitude: coordinates.latitude,
            latitudeDelta: 15,
            longitudeDelta: 2,
          }}
          mapType="hybrid"
          minZoomLevel={10}
          onMapReady={() => console.log('Map is ready')}
          onRegionChange={() => null}
        >
          <Marker
            title="I am here"
            coordinate={{
              latitude: coordinates.latitude,
              longitude: coordinates.latitude,
            }}
            description="Hello"
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 1.6,
  },
});
