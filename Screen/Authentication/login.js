import React, { useState, useEffect } from "react";
import {
    ImageBackground,
    View,
    Dimensions,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { Button, ButtonGroup, Icon, Avatar, Rating } from '@rneui/themed';
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "./reducer/authSlice";
import { ActivityIndicator } from 'react-native-paper';
import axios from '../../axios';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get("window");

export default function Login({ navigation, route }) {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [attemptCount, setAttemptCount] = useState(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [remainingTime, setRemainingTime] = useState(30);

    useEffect(() => {
        let timer;
        if (attemptCount >= 3) {
            setIsButtonDisabled(true);
            timer = setInterval(() => {
                setRemainingTime(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        setAttemptCount(0);
                        setIsButtonDisabled(false);
                        return 30;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [attemptCount]);

    const handleLoginSubmit = async () => {
        Keyboard.dismiss();
        setIsLoading(true);

        axios.post('auth/token/login', loginData).then(response => {
            if (response.status === 200) {
                dispatch(LOGIN(response.data.auth_token));
                Toast.show({
                    type: 'success',
                    text1: 'Login Successfully',
                    autoHide: true,
                    visibilityTime: 3000
                });
                setIsLoading(false);
            }
            setLoginData({ ...loginData, email: '', password: '' });
        }).catch(() => {
            Toast.show({
                type: 'error',
                text1: 'Login Failed!! please Check your email and password',
                autoHide: true,
                visibilityTime: 3000
            });
            setIsLoading(false);
            setAttemptCount(attemptCount + 1);
        });
    };

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <View style={{ display: "flex", alignItems: "center", marginTop: 50 }}>
                    {isButtonDisabled && (
                        <Text style={{ color: 'red', marginBottom: 20 }}>
                            Too many failed attempts. Please wait {remainingTime} seconds.
                        </Text>
                    )}
                    <Text style={{ fontSize: 40, marginTop: 30, fontWeight: "bold" }}>Login</Text>
                    <View style={{ width: "80%", marginTop: 50 }}>
                        <Text style={{ marginBottom: 5 }}>Email:</Text>
                        <View
                            style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                                borderWidth: 2,
                                borderRadius: 100,
                                paddingLeft: 10,
                                paddingBottom: 5,
                                paddingTop: 5,
                            }}
                        >
                            <Image
                                source={require("../../assets/2.png")}
                                style={{ width: 25, height: 25 }}
                            />
                            <TextInput style={{ marginLeft: 10, width: 300 }} placeholder='Input your email' onChangeText={(text) => setLoginData({ ...loginData, email: text })}>
                            </TextInput>
                        </View>
                    </View>
                    <View style={{ width: "80%", marginTop: 10 }}>
                        <Text style={{ marginBottom: 5 }}>Password:</Text>
                        <View
                            style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                                borderWidth: 2,
                                borderRadius: 100,
                                paddingLeft: 10,
                                paddingBottom: 5,
                                paddingTop: 5,
                                marginBottom: 27
                            }}
                        >
                            <Image
                                source={require("../../assets/3.png")}
                                style={{ width: 25, height: 25 }}
                            />
                            <TextInput style={{ marginLeft: 10, width: 300 }} secureTextEntry={true} placeholder='Input your password' onChangeText={(text) => setLoginData({ ...loginData, password: text })}>

                            </TextInput>
                        </View>
                    </View>
                    <Button
                        title="Login"
                        loading={isLoading}
                        loadingProps={{ size: 'small', color: 'white' }}
                        buttonStyle={{
                            backgroundColor: 'black',
                            borderRadius: 20,
                        }}
                        titleStyle={{ fontWeight: 'bold', marginHorizontal: 20 }}
                        containerStyle={{
                            marginBottom: 20
                        }}
                        onPress={handleLoginSubmit}
                        disabled={isButtonDisabled}
                    />

                    <View
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginTop: 10
                        }}
                    >
                        <Text style={{ fontSize: 15 }}>
                            Or Sign Up using
                        </Text>
                        <View
                            style={{ display: "flex", flexDirection: "row", marginTop: 10 }}
                        >
                            <Image
                                source={require("../../assets/4.png")}
                                style={{ width: 40, height: 40 }}
                            />
                            <Image
                                source={require("../../assets/5.png")}
                                style={{ width: 40, height: 40, marginLeft: 10 }}
                            />
                            <Image
                                source={require("../../assets/6.png")}
                                style={{ width: 40, height: 40, marginLeft: 10 }}
                            />
                        </View>
                    </View>
                    <Text style={{ marginTop: 30, fontSize: 15, marginBottom: 25 }}>
                        Forgot your password?
                        <TouchableOpacity onPress={() => navigation.navigate('Forgotpage1')}>
                            <Text style={{ color: "#38B6FF" }}> Click Here.</Text>
                        </TouchableOpacity>
                    </Text>
                    <TouchableOpacity style={styles.createAccountButton} >
                        <Text style={styles.createAccountButtonText}>Create an Account</Text>
                    </TouchableOpacity>
                </View>
                {/* {isLoading && (
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
                        <Text style={{ fontSize: 20, marginVertical: 20 }}>Logging In</Text>
                    </View>
                )} */}
                <Toast />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    createAccountButton: {
        borderColor: "#EEEE",
        borderWidth: 2,
        width: 250,
        height: 40,
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        borderRadius: 100,
        marginTop: 'auto',
        backgroundColor: '#EEEE',
    },
    createAccountButtonText: {
        fontSize: 15,
    }
});
