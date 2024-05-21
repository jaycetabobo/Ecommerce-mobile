import React, { useState } from "react";
import {
  ImageBackground,
  View,
  Dimensions,
  Text,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Alert
} from "react-native";
import Toast from 'react-native-toast-message';
import { Button } from '@rneui/themed';

export default function Signup({ navigation }) {

  const [userData, setUserData] = useState({
    Firstname: "",
    Lastname: "",
    birthdate: "",
  },
  );

  const handleonChange = () => {

  }
  const handleSubmit = () => {
    // Check if any of the text inputs are empty.
    if (userData.Firstname !== ""
      && userData.Lastname !== ""
      && userData.birthdate !== ""
    ) {
      // Set the user data state variable
      setUserData(userData);

      // Navigate to the `profile.js` screen
      navigation.navigate("Signup2", { userData });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Please fill in all of the text inputs before continuing.',
        autoHide: true,
        visibilityTime: 2000
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
      <View style={{ display: "flex", alignItems: "center", flex: 1, backgroundColor: "white" }}>

        <Text style={{ fontSize: 45, marginTop: 120 }}>Sign up </Text>

        <View style={{ width: "80%" }}>
          <Text style={styles.aboveTextOfTextInput2}>Firstname:</Text>
          <View style={styles.textInputField}>
            <TextInput
              style={{ marginLeft: 10, width: 300 }}
              placeholder='e.g Jonie boy'
              value={userData.Firstname}
              onChangeText={(text) => setUserData({ ...userData, Firstname: text })}
            />

          </View>
        </View>
        <View style={{ width: "80%" }}>
          <Text style={styles.aboveTextOfTextInput2}>Lastname:</Text>
          <View style={styles.textInputField}>
            <TextInput
              style={{ marginLeft: 10, width: 300 }}
              placeholder='e.g Sumalpong'
              value={userData.Lastname}
              onChangeText={(text) => setUserData({ ...userData, Lastname: text })}
            />

          </View>

        </View>
        <View style={{ width: "80%", marginBottom: "5%" }}>
          <Text style={styles.aboveTextOfTextInput2}>Birthdate:</Text>
          <View style={styles.textInputField}>
            <TextInput
              keyboardType="numeric"
              style={{ marginLeft: 10, width: 300 }}
              placeholder='YYYY-MM-DD'
              value={userData.birthdate}
              onChangeText={(text) => setUserData({ ...userData, birthdate: text.trim() })}
            />
          </View>

        </View>
        <Button
          title="Continue"
          loading={false}
          loadingProps={{ size: 'small', color: 'white' }}
          buttonStyle={{
            backgroundColor: 'black',
            borderRadius: 7,
            borderColor: "black",
            borderWidth: 2,
            padding: 0,
            paddingVertical: 5
          }}
          titleStyle={{ color: 'white' }}
          containerStyle={{
          }}
          onPress={handleSubmit}
        />
        <Text style={{ marginTop: "auto", fontSize: 15, marginBottom: 30 }}>
          Do you have an existing account?
          <Text style={{ color: "#38B6FF" }} onPress={() => navigation.navigate('Login')}> Click Here.</Text>
        </Text>
        <Toast />
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  aboveTextOfTextInput: {
    marginLeft: 15,
    marginBottom: 5
  },
  aboveTextOfTextInput2: {
    marginLeft: 15,
    marginTop: 20
  },
  textInputField: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 100,
    paddingLeft: 10,
    paddingBottom: 5,
    paddingTop: 5,
  }
})