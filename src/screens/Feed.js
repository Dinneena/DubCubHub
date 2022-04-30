import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Colors from '../Colors';
import firestore from '@react-native-firebase/firestore';
import {FAB} from 'react-native-paper';
import storage from '@react-native-firebase/storage';

function Feed({navigation}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const sub = firestore()
      .collection('tiles')
      .onSnapshot(getUpdatedTiles, () => {});

    return () => sub();
  }, []);

  function getUpdatedTiles(querySnapshot) {
    let newData = [];
    querySnapshot.forEach(documentSnapshot => {
      const item = {...documentSnapshot.data(), id: documentSnapshot.id};
      newData.push(item);
    });
    setData([...newData]);
  }

  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND,
      }}>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {
          navigation.navigate('AddTile');
        }}
      />

      <FlatList
        data={data}
        renderItem={data => <Tile data={data} navigation={navigation} />}
        keyExtractor={({id}) => {
          return id;
        }}
      />
    </View>
  );
}

function Tile({data, navigation}) {
  const [image, setImage] = useState();

  useEffect(() => {
    storage()
      .ref(`${data.item.photoId}.png`) //name in storage in firebase console
      .getDownloadURL()
      .then(url => {
        setImage(url);
      })
      .catch(e => console.log('Errors while downloading => ', e));
  }, [data.item.photoId]);

  return (
    <TouchableOpacity
      style={styles.tile}
      onPress={() => {
        navigation.navigate('TileDetail', {
          item: data.item,
          image,
        });
      }}>
      {!image && (
        <ActivityIndicator
          color={Colors.TEXT_COLOR}
          style={{flex: 0.8}}
          size={'large'}
        />
      )}

      {image && (
        <Image
          style={{
            flex: 0.8,
            width: '100%',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            resizeMode: 'cover',
          }}
          source={{uri: image}}
        />
      )}
      <View
        style={{
          flex: 0.2,
          width: '100%',
          padding: 8,
          borderBottomEndRadius: 8,
          borderBottomStartRadius: 8,
          display: 'flex',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'black', fontSize: 26, fontWeight: '200'}}>
          {data.item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tile: {
    backgroundColor: 'white',
    height: 300,
    margin: 15,
    alignItems: 'center',
    borderRadius: 8,
    display: 'flex',
  },
  fab: {
    position: 'absolute',
    zIndex: 2,
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.FAB_COLOR,
  },
});

export default Feed;
