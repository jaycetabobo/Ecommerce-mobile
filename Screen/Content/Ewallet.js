import { StyleSheet, Text, View, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { Card } from "@rneui/base";
import React, { useState, useEffect, useCallback } from 'react';
import HeaderApp from '../../Components/header';
import { AntDesign } from '@expo/vector-icons';
import { PricingCard } from '@rneui/themed';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from "react-redux";
import axios from '../../axios';

export default function Ewallet({ navigation }) {
    const { width, height } = Dimensions.get('window')
    const [balance, setBalance] = useState(null);
    const Tokens = useSelector((state) => state.auth.logInToken);
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState(null);
    const userdata = data ? data.id : '';
    const userName = data ? data.first_name + data.last_name : [];
    const buynow = (amount) => {
        navigation.navigate('Ewallet2', { amount, userdata, userName });
    };
    const filteredbalance = balance ? balance.filter(bal => bal.user === userdata) : [];

    useEffect(() => {
        axios.get('auth/users/me/', {
            headers: {
                'Authorization': `Token ${Tokens}`
            }
        }).then((response) => {
            setData(response.data);
        }).catch((error) => {
            console.error(error);
        });
        console.log(Tokens);
    }, [Tokens]);

    useEffect(() => {
        axios.get('ewallets/').then((response) => setBalance(response.data))
            .catch((error) => console.log(error));
        // console.log(data)
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            axios.get('ewallets/').then((response) => setBalance(response.data))
                .catch((error) => console.log(error));
            // console.log(data)
            setRefreshing(false);
        }, 1000);
    }, []);

    return (
        <View>
            <HeaderApp onPress={() => navigation.goBack()} icon='arrow-back' icon2='shopping-cart' onPressRight={() => navigation.navigate('Cart')} />
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            } style={{ height: height * .95 }}>
                <Card containerStyle={{}} wrapperStyle={{}}>
                    <Card.Title style={styles.bannerText}>E - Wallet</Card.Title>
                    <Card.Divider />
                    {filteredbalance.length > 0 ? (
                        <View
                            style={{
                                position: "relative",
                                alignItems: "center"
                            }}
                        >
                            <AntDesign name="wallet" size={130} color="black" />
                            <Text style={styles.text}>Balance:</Text>
                            <Text style={styles.text}>{filteredbalance[0].balance}</Text>
                        </View>
                    ) : (
                        <Text>loading balance</Text>
                    )}
                </Card>
                <View style={styles.pricetitle}>
                    <Text style={styles.priceTitleText}>
                        ~ Cash In Money ~
                    </Text>
                </View>
                <PricingCard
                    color='black'
                    title="Extra Small Spender"
                    titleStyle={{ fontSize: 20 }}
                    price="₱ 100"
                    button={{ title: '  Buy Now', icon: 'flight-takeoff', onPress: () => buynow('100') }}
                />
                <PricingCard
                    color='black'
                    title="Small Spender"
                    titleStyle={{ fontSize: 20 }}
                    price="₱ 500"
                    button={{ title: '  Buy Now', icon: 'flight-takeoff', onPress: () => buynow('500') }}
                />
                <PricingCard
                    color='black'
                    title="Medium Spender"
                    titleStyle={{ fontSize: 20 }}
                    price="₱ 1000"
                    button={{ title: '  Buy now', icon: 'flight-takeoff', onPress: () => buynow('1000') }}
                />
                <PricingCard
                    color='black'
                    title="Big Spender"
                    titleStyle={{ fontSize: 20 }}
                    price="₱ 2000"
                    button={{ title: '  Buy now', icon: 'flight-takeoff', onPress: () => buynow('2000') }}
                />
            </ScrollView>
            <Toast />
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        marginTop: 10,
        fontSize: 18
    },
    bannerText: {
        fontSize: 20
    },
    pricetitle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    priceTitleText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '90%'
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingTop: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: '70%',
        width: '90%'
    },
    button: {
        borderRadius: 20,
        padding: 8,
        paddingHorizontal: 12,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: 'black',
    },
    buttonClose: {
        backgroundColor: 'black',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
