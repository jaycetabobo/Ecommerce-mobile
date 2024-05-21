import React from "react";
import {
  ImageBackground,
  View,
  Dimensions,
  Text,
  Image,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet
} from "react-native";
import { useState, useEffect } from "react";
import { Entypo } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { REGISTER } from "./reducer/authSlice";
import { ActivityIndicator } from 'react-native-paper';
import axios from '../../axios';
import Toast from 'react-native-toast-message';
import { Button } from '@rneui/themed';

export default function Signup2({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [retypeSecureTextEntry, setRetypeSecureTextEntry] = useState(true);
  const [icon, setIcon] = useState('eye-with-line');
  const [errorMessage, setErrorMessage] = useState("");

  const handleShowHidePassword = () => {
    setSecureTextEntry(!secureTextEntry);
    setIcon(secureTextEntry ? 'eye' : 'eye-with-line');
    setRetypeSecureTextEntry(!retypeSecureTextEntry);
  };

  const [signedUp, setSignedUp] = useState(false);

  const userData = route.params.userData;

  const [userData2, setUserData2] = useState({
    first_name: userData.Firstname,
    last_name: userData.Lastname,
    birthdate: userData.birthdate,
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  },
  );
  const usernames = userData2.username;
  const emails = userData2.email;
  const passwords = userData2.password;
  const confirmPasswords = userData2.confirm_password;
  const [errorMessageWeak, setErrorMessageWeak] = useState("");
  const [errorMessageModerate, setErrorMessageModerate] = useState("");
  const [errorMessageStrong, setErrorMessageStrong] = useState("");

  const [errorMessageConfirm, setErrorMessageConfirm] = useState("");
  const regexTest = emails.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  const regexPassword = userData2.password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})");

  useEffect(() => {
    if (passwords.length > 0 && passwords.length <= 8) {
      setErrorMessageWeak("WEAK");
      setErrorMessageStrong("");
      setErrorMessageModerate("");
    } else if (passwords.length >= 8 && passwords.length <= 15) {
      setErrorMessageModerate("MODERATE");
      setErrorMessageWeak("");
      setErrorMessageStrong("");
    } else if (passwords.length >= 15) {
      setErrorMessageStrong("STRONG");
      setErrorMessageModerate("");
      setErrorMessageWeak("");
    } else {
      setErrorMessageStrong("");
      setErrorMessageModerate("");
      setErrorMessageWeak("");
    }
  }, [userData2.password]);

  useEffect(() => {
    if (confirmPasswords === passwords) {
      setErrorMessageConfirm("");
    } else {
      setErrorMessageConfirm("Re-type Password didn't match to the Password.");
    }
  }, [confirmPasswords]);

  useEffect(() => {
    if (regexTest) {
      setErrorMessage("");
    } else if (emails.length === 0) {
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter a valid email address.");
    }
  }, [emails]);

  const handlePasswordChange = (text) => {
    setUserData2({ ...userData2, password: text })
  }

  const handleEmailChange = (text) => {
    setUserData2({ ...userData2, email: text.trim() })
  };

  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    setIsLoading(true);
    // if (confirmPasswords === passwords && regexTest && usernames !== "") {
    //   // Set the user data state variable
    //   setUserData2(userData2);

    //   dispatch(REGISTER([...users, userData2]))
    //   setSignedUp(true);
    //   Alert.alert('Account created successfully!', null, [
    //     { text: 'OK', onPress: () => navigation.navigate("landingpage") },
    //   ], {
    //     titleStyle: {
    //       color: 'yellow',
    //       fontWeight: 'bold',

    //     },
    //   });
    // } else if (confirmPasswords === "" || passwords === "" || emails === "" || usernames === "") {
    //   Alert.alert('Unfilled Inputs!!! Please Try Again.');
    // }
    if (regexPassword) {
      axios.post('auth/users/', userData2).then((response) => {
        Toast.show({
          type: 'success',
          text1: 'Account created successfully!',
          autoHide: true,
          visibilityTime: 2000
        });
        setUserData2({
          ...userData2,
          first_name: '',
          last_name: '',
          birthdate: '',
          username: '',
          email: '',
          password: '',
          confirm_password: ''
        })
        setTimeout(() => {
          navigation.navigate('Login');
        }, 2000); // Delay of 3 seconds (adjust as needed)
        setIsLoading(false);
      }).catch((error) => {
        Toast.show({
          type: 'error',
          text1: 'The email Inputted is already registered or The Email and Password is too similar.',
          autoHide: true,
          visibilityTime: 2000
        });
        setIsLoading(false);
      })
    } else if (userData2.confirm_password !== userData2.password) {
      Toast.show({
        type: 'error',
        text1: 'Please Make sure that the password and confirm password is match',
        autoHide: true,
        visibilityTime: 2000
      });
      setIsLoading(false);
    } else if (!regexTest) {
      Toast.show({
        type: 'error',
        text1: 'Please Make sure that the email is correct',
        autoHide: true,
        visibilityTime: 2000
      });
      setIsLoading(false);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Password must contain at least 8 characters, one uppercase letter,',
        text2: 'one lowercase letter, one digit, and one special character.',
        autoHide: true,
        visibilityTime: 2000
      });
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
      <View style={{ display: "flex", alignItems: "center", flex: 1, backgroundColor: 'white' }}>

        <Text style={{ fontSize: 45, marginTop: 120 }}>Sign up</Text>
        <View style={{ width: "80%", marginTop: 30 }}>
          <Text style={styles.aboveTextOfTextInput}>Username:</Text>
          <View style={styles.textInputField}>
            <TextInput style={{ marginLeft: 10, width: 300 }} placeholder='Username'
              value={userData2.username}
              onChangeText={(text) => setUserData2({ ...userData2, username: text.trim() })}
            >
            </TextInput>
          </View>
          <Text style={styles.aboveTextOfTextInput2}>Email:</Text>
          <View style={styles.textInputField}>
            <TextInput style={{ marginLeft: 10, width: 300 }} placeholder='Email'
              value={userData2.email}
              onChangeText={handleEmailChange}
            >
            </TextInput>
          </View>
          {errorMessage && (
            <Text style={{ color: "red", fontSize: 15, marginTop: 5, marginLeft: 12 }}>
              {errorMessage}
            </Text>
          )}


        </View>

        <View style={{ width: "80%" }}>
          <Text style={styles.aboveTextOfTextInput2}>Password:</Text>
          <View style={styles.textInputField}>
            <TextInput secureTextEntry={secureTextEntry} placeholder='Password' style={{ marginLeft: 10, width: '85%' }}
              value={userData2.password}
              onChangeText={handlePasswordChange}
            >
            </TextInput>
            <Entypo name={icon} size={24} color="black" style={{ width: 100 }} onPress={handleShowHidePassword}

            />

          </View>
          <View>
            {errorMessageWeak && (
              <Text style={{ color: "red", fontSize: 15, marginTop: 5, marginRight: 240, marginLeft: 20, width: 300 }}>
                {errorMessageWeak}
              </Text>
            )}
            {errorMessageModerate && (
              <Text style={{ color: "orange", fontSize: 15, marginTop: 5, marginRight: 240, marginLeft: 20, width: 300 }}>
                {errorMessageModerate}
              </Text>
            )}
            {errorMessageStrong && (
              <Text style={{ color: "green", fontSize: 15, marginTop: 5, marginRight: 240, marginLeft: 20, width: 300 }}>
                {errorMessageStrong}
              </Text>
            )}
          </View>
          <Text style={styles.aboveTextOfTextInput2}>Re-type Password:</Text>
          <View style={styles.textInputField}>
            <TextInput style={{ marginLeft: 10, width: 300 }} secureTextEntry={retypeSecureTextEntry} placeholder='Re-type Password'
              value={userData2.confirm_password}
              onChangeText={(text) => setUserData2({ ...userData2, confirm_password: text })}
            >
            </TextInput>

          </View>
          <View>
            {errorMessageConfirm && (
              <Text style={{ color: "red", fontSize: 15, marginLeft: 20 }}>
                {errorMessageConfirm}
              </Text>
            )}
          </View>
        </View>
        <Button
          title="Signup"
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
            marginTop: 20
          }}
          onPress={handleSubmit}
        />
        <Text style={{ marginTop: 30, fontSize: 15 }}>
          Do you have an existing account?
          <Text style={{ color: "#38B6FF" }} onPress={() => navigation.navigate('Login')}> Click Here.</Text>
        </Text>
        {isLoading && (
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            opacity: 0.9,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <ActivityIndicator size="large" color='black' />
            <Text style={{ fontSize: 20, marginVertical: 20 }}>Registering...</Text>
          </View>
        )}
        <Toast />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  aboveTextOfTextInput: {
    marginLeft: 15
  },
  aboveTextOfTextInput2: {
    marginLeft: 15,
    marginTop: 10
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