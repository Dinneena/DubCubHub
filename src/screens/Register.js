import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {Text, Image, View, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import logo from '../../assets/pawNew.png';
import Colors from '../Colors';

const Register = () => {
  const [email, onChangeEmail] = useState();
  const [password, onChangePassword] = useState();
  return (
    <View
      style={{
        justifyContent: 'center',
        backgroundColor: Colors.APP_BACKGROUND,
        height: '100%',
      }}>
      <Image
        style={{
          resizeMode: 'contain',
          justifyContent: 'center',
          alignSelf: 'center',
          marginBottom: 50,
          height: 100,
        }}
        source={logo}
      />
      <Text
        style={{
          color: Colors.TEXT_COLOR,
          fontWeight: '700',
          fontSize: 20,
          padding: 10,
        }}>
        Create New Account
      </Text>
      <Text
        style={{
          color: Colors.TEXT_COLOR,
          fontWeight: '700',
          fontSize: 20,
          padding: 10,
        }}>
        Email
      </Text>
      <TextInput
        style={{
          margin: 20,
        }}
        autoCapitalize="none"
        onChangeText={text => {
          return onChangeEmail(text.trim());
        }}
        value={email}
      />
      <Text
        style={{
          color: Colors.TEXT_COLOR,
          fontWeight: '700',
          fontSize: 20,
          padding: 10,
        }}>
        Password
      </Text>
      <TextInput
        style={{margin: 20}}
        onChangeText={text => {
          return onChangePassword(text.trim());
        }}
        value={password}
      />
      <TouchableOpacity
        style={{
          backgroundColor: Colors.BUTTONS,
          margin: 16,
          padding: 8,
          display: 'flex',
          borderRadius: 10,
        }}
        onPress={() => {
          auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              console.log('User account created & signed in!');
            })
            .catch(error => {
              if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
              }

              if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
              }

              console.error(error);
            });
        }}>
        <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
