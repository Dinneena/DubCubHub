import React from 'react';
import auth from '@react-native-firebase/auth';
import {Text, View, TouchableOpacity} from 'react-native';
import Colors from '../Colors';

function Account({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: Colors.APP_BACKGROUND}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            backgroundColor: Colors.APP_HEADER,
            flex: 1,
            color: Colors.TEXT_COLOR,
            fontWeight: '700',
            fontSize: 30,
            padding: 10,
          }}>
          User Account
        </Text>
      </View>
      <View>
        <Text
          style={{
            padding: 16,
            fontSize: 18,
            fontWeight: 'bold',
            color: Colors.TEXT_COLOR,
          }}>
          Email :{auth().currentUser.email}
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.BUTTONS,
            margin: 8,
            padding: 8,
            display: 'flex',
            borderRadius: 10,
          }}
          onPress={() => {
            auth()
              .signOut()
              .then(() => console.log('User signed out!'));
          }}>
          <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Account;
