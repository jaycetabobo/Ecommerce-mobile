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
import { Provider } from "react-redux";
import store from './store';
import { useSelector } from "react-redux";
import AuthRoutes from './Routes/authRoutes';

export default function App({ navigation }) {
  // const drawer = useRef(null);
  // const navigationView = () => (
  //   <View style={[styles.container, styles.navigationContainer]}>
  //     <Text style={styles.paragraph}><AntDesign name="closecircle" size={35} color="black" onPress={() => drawer.current.closeDrawer()} /></Text>
  //     <View>
  //       <Text onPress={() => navigation.navigate('Product')} >
  //         asd
  //       </Text>
  //     </View>
  //   </View>
  // );
  const RootNavigation = () => {
    const Tokens = useSelector((state) => state.auth.logInToken)
    return (
      <NavigationContainer>
        {/* <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerPosition='left'
            renderNavigationView={navigationView}>
            <HeaderApp onPress={() => drawer.current.openDrawer()} />
          </DrawerLayoutAndroid> */}
        {Tokens === null ? <AuthRoutes /> : <ContentRoutes />}
        <StatusBar style="auto" />
      </NavigationContainer>
    );
  };

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PaperProvider>
          <RootNavigation />
        </PaperProvider>
      </Provider>
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
