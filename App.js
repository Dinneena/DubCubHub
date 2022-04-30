import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import Feed from './src/screens/Feed';
import Contact from './src/screens/Contact';
import AddTile from './src/screens/AddTile';
import TileDetail from './src/screens/TileDetail';
import OpenScreen from './src/screens/OpenScreen';
import Maps from './src/screens/Maps';
import Geocoder from 'react-native-geocoding';
Geocoder.init('AIzaSyA9uiBqju3eyVGkTktiqDOFinrGW7syS5k');
const MainStack = createNativeStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen name="Drawer" component={DrawerScreens} />
      <MainStack.Screen
        options={{headerShown: true, title: ''}}
        name="TileDetail"
        component={TileDetail}
      />
      <MainStack.Screen
        options={{headerShown: true, title: ''}}
        name="AddTile"
        component={AddTile}
      />
      <MainStack.Screen name="Maps" component={Maps} />
    </MainStack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function DrawerScreens() {
  return (
    <Drawer.Navigator
      initialRouteName="Dub Cub Hub"
      drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Logout"
              onPress={() => {
                auth()
                  .signOut()
                  .then(() => console.log('User signed out!'));
              }}
            />
          </DrawerContentScrollView>
        );
      }}>
      <Drawer.Screen name="Dub Cub Hub" component={Feed} />
      <Drawer.Screen name="About" component={Contact} />
    </Drawer.Navigator>
  );
}

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  if (!user) {
    return (
      <NavigationContainer>
        <OpenScreen />
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <MainStackScreen />
    </NavigationContainer>
  );
};

export default App;
