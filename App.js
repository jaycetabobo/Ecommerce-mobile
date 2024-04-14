import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderApp from './Components/header';
import ContentRoutes from './Routes/contentroutes';
import { PaperProvider } from 'react-native-paper';
import React, { useRef, useState } from 'react';
import {
  Button,
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function App({ navigation }) {
  const drawer = useRef(null);
  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}><AntDesign name="closecircle" size={35} color="black" onPress={() => drawer.current.closeDrawer()} /></Text>
      <View>
        <Text onPress={() => navigation.navigate('Product')} >
          asd
        </Text>
      </View>
    </View>
  );
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerPosition='left'
            renderNavigationView={navigationView}>
            <HeaderApp onPress={() => drawer.current.openDrawer()} />
            <ContentRoutes />
          </DrawerLayoutAndroid>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'right',
    justifyContent: 'right',
    padding: 16,
    marginTop: 30
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    fontSize: 15,
    textAlign: 'right',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingBottom: 10
  },
});
