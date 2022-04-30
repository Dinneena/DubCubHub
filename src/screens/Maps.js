import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import {ActivityIndicator} from 'react-native-paper';

function Maps(props) {
  const {address} = props.route.params;

  const [location, setLocation] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    Geocoder.from(address)
      .then(json => {
        const location = json.results[0].geometry.location;
        setLocation(location);
      })
      .catch(() => {
        setLocation({lat: 53.35, lng: -6.266});
        setError(true);
      });
  }, []);

  return (
    <View style={{flex: 1}}>
      {error && (
        <Text
          style={{
            backgroundColor: 'red',
            color: 'white',
            fontSize: 16,
            textAlign: 'center',
          }}>
          Address not found
        </Text>
      )}
      {!location && <ActivityIndicator />}
      {location && (
        <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{latitude: location.lat, longitude: location.lng}}
          />
        </MapView>
      )}
    </View>
  );
}

export default Maps;
