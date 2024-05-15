import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native'
import { Card } from "@rneui/base";
import React, { useState, useEffect } from 'react'
import HeaderApp from '../../Components/header';
import axios from '../../axios';
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from '../Authentication/reducer/authSlice';

export default function Profile({ navigation }) {
    const Tokens = useSelector((state) => state.auth.logInToken)
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    useEffect(() => {
        axios.get('auth/users/me/', {
            headers: {
                'Authorization': `Token ${Tokens}`
            }
        }).then((response) => setData(response.data)
        ).catch(

        )
        console.log(Tokens)
    }, [Tokens]);
    const handleLogoutSubmit = async () => {
        dispatch(LOGOUT())
    }


    return (
        <View style={styles.container}>
            <HeaderApp onPress={() => navigation.goBack()} icon='arrow-back' icon2='shopping-cart' onPressRight={() => navigation.navigate('Cart')} />
            {data ? (
                <Card containerStyle={{}} wrapperStyle={{}}>
                    <Card.Title style={styles.profileBanner}>Profile</Card.Title>
                    <Card.Divider />
                    <View
                        style={{
                            position: "relative",
                            alignItems: "center"
                        }}
                    >
                        <Image
                            style={{ width: "100%", height: 100 }}
                            resizeMode="contain"
                            source={require("../../assets/2.png")}
                        />
                        <Text style={styles.profileText}>{data.first_name} {data.last_name}</Text>
                        <Text></Text>
                    </View>
                    <Card.Divider />
                    <Text style={styles.profileText}>Username: {data.username}</Text>
                    <Text style={styles.profileText}>Email: {data.email}</Text>
                    <Text style={styles.profileText}>Birthdate: {data.birthdate}</Text>
                </Card>
            ) : (
                <Text>
                    Loading user data...
                </Text>
            )}
            <View style={{ marginVertical: 20, alignItems: 'center' }}>
                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={handleLogoutSubmit}
                >
                    <Text style={styles.textStyle}>Logout</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    profileText: {
        marginTop: 10,
        fontSize: 15
    },
    profileBanner: {
        fontSize: 20
    },
    buttonOpen: {
        backgroundColor: 'black',
    },
    buttonClose: {
        backgroundColor: 'black',
        padding: 20,
        paddingVertical: 10,
        borderRadius: 20
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})