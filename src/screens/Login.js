import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {Text, Image, View, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import logo from '../../assets/pawNew.png';
import Colors from '../Colors';

const Login = () => {
  const [errors, setErrors] = useState({});
  const [email, onChangeEmail] = useState();
  const [password, onChangePassword] = useState();
  const [invalid, setInvalid] = useState(false);
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
        Email
      </Text>
      {errors.email && <Text style={styles.errors}>Required field</Text>}
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
      {errors.password && <Text style={styles.errors}>Required field</Text>}

      <TextInput
        style={{margin: 20}}
        onChangeText={text => {
          return onChangePassword(text.trim());
        }}
        value={password}
      />

      {invalid && (
        <Text
          style={{
            color: 'white',
            backgroundColor: '#aa2211',
            margin: 20,
            borderRadius: 20,
            padding: 8,
            textAlign: 'center',
          }}>
          Incorrect password or email
        </Text>
      )}

      <TouchableOpacity
        title={'Submit'}
        style={{
          backgroundColor: Colors.BUTTONS,
          margin: 16,
          padding: 8,
          display: 'flex',
          borderRadius: 10,
        }}
        onPress={() => {
          console.log(email);
          if (email && password) {
            auth()
              .signInWithEmailAndPassword(email, password)
              .then(() => {})
              .catch(error => {
                setInvalid(true);
              });
          } else {
            const newErrors = {
              email: !email,
              password: !password,
            };

            setErrors(newErrors);
          }
        }}>
        <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  errors: {
    color: 'red',
    marginLeft: 10,
  },
};

export default Login;
