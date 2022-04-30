import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import Colors from '../Colors';
import contactLogo from '../../assets/Contact.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import logo from '../../assets/pawNew.png';

function Contact() {
  return (
    <View
      style={{
        margin: 8,
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND,
      }}>
      <Image
        style={{
          resizeMode: 'contain',
          justifyContent: 'center',
          alignSelf: 'center',
          height: 100,
          margin: 16,
        }}
        source={logo}
      />
      <View style={{margin: 16}}>
        <Text
          style={{fontSize: 26, fontWeight: 'bold', color: Colors.TEXT_COLOR}}>
          Our Mission
        </Text>
        <Text style={{fontSize: 16}}>
          I adopted my cat Merlin in the summer of 2021. During the long
          research and searching process, I identified an issue with the current
          state of Charity websites in the Dublin area.
        </Text>
      </View>

      <View style={{margin: 16}}>
        <Text
          style={{fontSize: 26, fontWeight: 'bold', color: Colors.TEXT_COLOR}}>
          Contact Us
        </Text>
        <View style={styles.detail}>
          <Icon name="email" size={30} color="#4e4e4e" />
          <Text style={styles.detailText}>dubcubhub@gmail.com</Text>
        </View>
        <View style={styles.detail}>
          <Icon name="phone" size={30} color="#4e4e4e" />
          <Text style={styles.detailText}>123456789</Text>
        </View>
        <View style={styles.detail}>
          <Icon name="google-maps" size={30} color="#4e4e4e" />
          <Text style={styles.detailText}>12, Test Road, Test. DT Y571</Text>
        </View>
      </View>
    </View>
  );
}

const styles = {
  detail: {
    display: 'flex',
    flexDirection: 'row',
    fontWeight: '400',
  },
  detailText: {
    color: Colors.TEXT_COLOR,
    fontSize: 18,
    marginLeft: 8,
  },
};

export default Contact;
