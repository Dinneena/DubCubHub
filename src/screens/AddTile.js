import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Colors from '../Colors';
import {TextInput, RadioButton} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';
import uuid from 'react-native-uuid';
import {Picker} from '@react-native-picker/picker';

function AddTile({navigation}) {
  const [errors, setErrors] = useState({});
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [ageType, setAgeType] = useState('Months');
  const [gender, setGender] = useState('Female');
  const [description, setDescription] = useState();
  const [ownerName, setOwnerName] = useState();
  const [number, setNumber] = useState();
  const [address, setAddress] = useState();
  const [image, setImage] = useState();
  const photoId = useRef();
  useEffect(() => {
    photoId.current = uuid.v4();
  }, []);

  function isDataReady() {
    return (
      name &&
      age &&
      gender &&
      description &&
      ownerName &&
      number &&
      address &&
      image
    );
  }

  return (
    <ScrollView
      style={{
        backgroundColor: Colors.APP_BACKGROUND,
        height: '100%',
        margin: 16,
      }}>
      {/* Header */}
      <Text style={styles.catagoryTitles}>Cat Details</Text>

      {/* Cat Name */}
      <Text style={styles.catagories}>Name</Text>
      {errors.name === true && <Text style={styles.error}>Required field</Text>}
      <TextInput
        style={{
          margin: 10,
        }}
        autoCapitalize="none"
        onChangeText={text => {
          setName(text);
        }}
        value={name}
      />

      {/* Cat Age */}
      <Text style={styles.catagories}>Age</Text>
      {errors.age === true && <Text style={styles.error}>Required field</Text>}
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <TextInput
          keyboardType="numeric"
          style={{margin: 10, flex: 1}}
          onChangeText={text => {
            setAge(text);
          }}
          value={age}
        />

        <Picker
          style={{margin: 10, flex: 1}}
          selectedValue={ageType}
          onValueChange={(itemValue, itemIndex) => setAgeType(itemValue)}>
          <Picker.Item label="Years" value="Years" />
          <Picker.Item label="Months" value="Months" />
        </Picker>
      </View>

      {/* Cat Gender */}
      <Text style={styles.catagories}>Gender</Text>
      {errors.gender === true && (
        <Text style={styles.error}>Required field</Text>
      )}

      <RadioButton.Group
        onValueChange={gender => setGender(gender)}
        value={gender}>
        <RadioButton.Item
          label="Female"
          value="Female"
          status={gender === 'Female' ? 'checked' : 'unchecked'}
          onValueChange={() => setGender('Female')}
        />
        <RadioButton.Item
          label="Male"
          value="Male"
          status={gender === 'Male' ? 'checked' : 'unchecked'}
          onValueChange={() => setGender('Male')}
        />
      </RadioButton.Group>

      {/* Cat Description */}
      <Text style={styles.catagories}>Description</Text>
      {errors.description === true && (
        <Text style={styles.error}>Required field</Text>
      )}
      <TextInput
        style={{margin: 10}}
        onChangeText={text => {
          setDescription(text);
        }}
        multiline={true}
        value={description}
      />

      {/* Submitter Title */}
      <Text style={styles.catagoryTitles}>Contact Details</Text>

      {/* Submitter Name */}
      <Text style={styles.catagories}>Name</Text>
      {errors.ownerName === true && (
        <Text style={styles.error}>Required field</Text>
      )}
      <TextInput
        style={{margin: 10}}
        onChangeText={text => {
          setOwnerName(text);
        }}
        value={ownerName}
      />

      {/* Submitter Number */}
      <Text style={styles.catagories}>Number</Text>
      {errors.number === true && (
        <Text style={styles.error}>Required field</Text>
      )}
      <TextInput
        keyboardType="numeric"
        style={{margin: 10}}
        onChangeText={text => {
          setNumber(text.replace(/[^0-9]/g, ''));
        }}
        value={number}
      />

      {/* Submitter Address */}
      <Text style={styles.catagories}>Address</Text>
      {errors.address === true && (
        <Text style={styles.error}>Required field</Text>
      )}
      <TextInput
        style={{margin: 10}}
        onChangeText={text => {
          setAddress(text);
        }}
        multiline={true}
        value={address}
      />

      {/* Submit Image */}
      <Image
        style={{width: 200, height: 50, resizeMode: 'contain'}}
        source={{uri: image}}
      />

      {errors.image === true && (
        <Text style={styles.error}>Photo is required</Text>
      )}

      <TouchableOpacity
        style={{
          backgroundColor: Colors.BUTTONS,
          margin: 16,
          padding: 8,
          display: 'flex',
          borderRadius: 10,
        }}
        onPress={async () => {
          try {
            const result = await launchImageLibrary({});
            const filePath = result.assets[0].uri;
            const reference = storage().ref(`${photoId.current}.png`);

            if (filePath) {
              try {
                await reference.putFile(filePath);
                setImage(filePath);
              } catch (e) {
                console.log(e);
              }
            }
          } catch (e) {
            console.log(e);
          }
        }}>
        <Text
          style={{
            color: Colors.BUTTON_TEXT,
            textAlign: 'center',
            fontSize: 20,
          }}>
          Upload Picture
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: isDataReady() ? Colors.BUTTONS : 'gray',
          margin: 16,
          padding: 8,
          display: 'flex',
          borderRadius: 10,
        }}
        onPress={async () => {
          if (isDataReady()) {
            firestore()
              .collection('tiles')
              .add({
                name: name,
                age: `${age} ${ageType}`,
                gender: gender,
                description: description,
                ownerName: ownerName,
                number: number,
                address: address,
                userId: auth().currentUser.uid,
                photoId: photoId.current,
              })
              .then(() => {
                navigation.goBack();
              });
          } else {
            const newErrors = {
              name: !name,
              age: !age,
              description: !description,
              ownerName: !ownerName,
              number: !number,
              address: !address,
              image: !image,
            };

            console.log(newErrors);

            setErrors(newErrors);
          }
        }}>
        <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>
          Add Tile
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  catagories: {
    color: Colors.TEXT_COLOR,
    fontWeight: '700',
    fontSize: 20,
    padding: 10,
    marginTop: 30,
  },
  catagoryTitles: {
    color: Colors.TEXT_COLOR,
    fontWeight: '700',
    fontSize: 25,
    padding: 10,
    marginTop: 25,
  },
  error: {
    color: 'red',
    marginLeft: 10,
  },
});

export default AddTile;
