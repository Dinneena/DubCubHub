import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Colors from '../Colors';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {FAB} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ADMIN = 'Lo76RlFkmGf3NoJm4mR65Sqc4XS2';

function TileDetail({route, navigation}) {
  const {
    id,
    name,
    description,
    age,
    gender,
    ownerName,
    number,
    address,
    userId,
  } = route.params.item;
  const {image} = route.params;

  const isOwner = userId === auth().currentUser.uid;
  const isAdmin = auth().currentUser.uid === ADMIN;

  return (
    <View
      style={{
        backgroundColor: Colors.APP_BACKGROUND,
        height: '100%',
        display: 'flex',
      }}>
      <Image
        style={{
          width: '100%',
          resizeMode: 'cover',
          flex: 2,
          backgroundColor: 'green',
        }}
        source={{uri: image}}
      />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={{flex: 1, margin: 16}}>
        <Text style={styles.nameDetail}>{name}</Text>

        <Text style={styles.heading}>Age:</Text>
        <Text style={styles.detail}>{age}</Text>

        <Text style={styles.heading}>Gender:</Text>
        <Text style={styles.detail}>{gender}</Text>

        <Text style={styles.heading}>Description:</Text>
        <Text style={styles.detail}>{description}</Text>

        <Text style={styles.heading}>Contact Name:</Text>
        <Text style={styles.detail}>{ownerName}</Text>

        <Text style={styles.heading}>Contact Number:</Text>
        <Text style={styles.detail}>{number}</Text>

        <Text style={styles.heading}>Address:</Text>
        <Text style={styles.detail}>{address}</Text>

        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: Colors.BUTTONS,
            marginVertical: 4,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 8,
            marginBottom: 64,
            borderRadius: 10,
            flexDirection: 'row',
          }}
          onPress={() => {
            navigation.navigate('Maps', {
              address,
            });
          }}>
          <Text style={{color: Colors.BUTTON_TEXT, fontSize: 18}}>
            View in Maps
          </Text>
          <Icon name="google-maps" size={30} color="#ffffff" />
        </TouchableOpacity>
      </ScrollView>
      {(isOwner || isAdmin) && (
        <FAB
          style={styles.fab}
          icon="delete"
          onPress={() => {
            firestore()
              .collection('tiles')
              .doc(id)
              .delete()
              .then(() => {
                navigation.goBack();
              });
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: Colors.TEXT_COLOR,
    fontWeight: '700',
    fontSize: 20,
  },
  detail: {
    color: Colors.TEXT_COLOR,
    fontWeight: '300',
    fontSize: 16,
  },
  nameDetail: {
    color: Colors.TEXT_COLOR,
    fontWeight: '700',
    fontSize: 30,
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

export default TileDetail;
