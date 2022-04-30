import auth from '@react-native-firebase/auth';
import React, {useState, useEffect} from 'react';
import {Text, Image, View, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TextInput} from 'react-native-paper';
import logo from '../../assets/pawNew.png';
import Colors from '../Colors';
import Register from './Register';
import Login from './Login';

const OpenStack = createNativeStackNavigator();

function OpenStackScreen() {
  return (
    <OpenStack.Navigator
      initialRouteName="OpenScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <OpenStack.Screen name="OpenScreen" component={OpenScreen} />
      <OpenStack.Screen name="Login" component={Login} />
      <OpenStack.Screen name="Register" component={Register} />
    </OpenStack.Navigator>
  );
}

const OpenScreen = ({navigation}) => {
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
          marginBottom: 30,
          height: 100,
        }}
        source={logo}
      />
      <Text
        style={{
          color: Colors.TEXT_COLOR,
          fontWeight: '700',
          fontSize: 30,
          padding: 10,
          textAlign: 'center',
        }}>
        Dub Cub Hub
      </Text>

      <TouchableOpacity
        title={'Create New Account'}
        style={{
          backgroundColor: Colors.BUTTONS,
          margin: 16,
          padding: 8,
          display: 'flex',
          borderRadius: 10,
        }}
        onPress={() => {
          navigation.navigate('Register');
        }}>
        <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>
          Create New Account
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        title={'Login'}
        style={{
          backgroundColor: Colors.BUTTONS,
          margin: 16,
          padding: 8,
          display: 'flex',
          borderRadius: 10,
        }}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OpenStackScreen;
