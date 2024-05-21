import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, ScrollView, Dimensions, RefreshControl } from 'react-native'
import { Card } from "@rneui/base";
import React, { useState, useEffect } from 'react'
import HeaderApp from '../../Components/header';
import axios from '../../axios';
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from '../Authentication/reducer/authSlice';

const { width, height } = Dimensions.get('window')
export default function Profile({ navigation }) {
    const Tokens = useSelector((state) => state.auth.logInToken)
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    const [order, setOrder] = React.useState(null);
    const userId = data ? data.id : '';

    const orders = order ? order.filter(orderItem => orderItem.user === userId) : [];
    const [refreshing, setRefreshing] = React.useState(false);


    const getOrder = async () => {
        await axios.get('orders/').then((response) => setOrder(response.data)
        ).catch((error) => console.log(error))
    }
    useEffect(() => {
        getOrder()
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            getOrder()
            setRefreshing(false);
        }, 1000);
    }, []);

    useEffect(() => {
        axios.get('auth/users/me/', {
            headers: {
                'Authorization': `Token ${Tokens}`
            }
        }).then((response) => {
            setData(response.data)
        }
        ).catch(

        )
        console.log(Tokens)
    }, [Tokens]);
    const handleLogoutSubmit = async () => {
        // console.log(orders)
        dispatch(LOGOUT())
        axios.post('auth/token/logout/', {
            headers: {
                'Authorization': `Token ${Tokens}`
            }
        })
    }


    return (
        <View style={styles.container}>
            <HeaderApp onPress={() => navigation.goBack()} icon='arrow-back' icon2='shopping-cart' onPressRight={() => navigation.navigate('Cart')} />
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                {data ? (
                    <Card containerStyle={{ borderRadius: 15 }} wrapperStyle={{}}>
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
                                source={require("../../assets/customer.png")}
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
                <Card containerStyle={{ borderRadius: 15 }} wrapperStyle={{}}>
                    <Card.Title style={styles.profileBanner}>Orders</Card.Title>
                    <Card.Divider />
                    {orders.map((order, index) =>
                        <View key={index}>
                            <Text style={styles.profileText}>Order ID: {order.id}</Text>
                            <Text style={styles.profileText}>Address: {order.address}</Text>
                            <Text style={styles.profileText}>Total Amount: {order.total_amount}</Text>
                            <Card.Divider style={{ marginTop: 20 }} />
                        </View>
                    )}

                </Card>
                <View style={{ marginVertical: 20, marginBottom: 0, alignItems: 'center' }}>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={handleLogoutSubmit}
                    >
                        <Text style={styles.textStyle}>Logout</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height
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