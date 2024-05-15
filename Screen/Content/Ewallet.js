import { StyleSheet, Text, View, ScrollView, Alert, Modal, Pressable, Image, TextInput } from 'react-native'
import { Card } from "@rneui/base";
import React, { useState } from 'react'
import HeaderApp from '../../Components/header';
import { AntDesign } from '@expo/vector-icons';
import { PricingCard } from '@rneui/themed';
import Toast from 'react-native-toast-message';

export default function Ewallet({ navigation }) {
    const [balance, setBalance] = useState('0');
    const buynow = (amount) => {
        navigation.navigate('Ewallet2', { amount })
    }
    return (
        <ScrollView >
            <HeaderApp onPress={() => navigation.goBack()} icon='arrow-back' icon2='shopping-cart' onPressRight={() => navigation.navigate('Cart')} />
            {/* <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ alignItems: 'flex-end', marginRight: 20 }}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>X</Text>
                            </Pressable>
                        </View>
                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            <View style={{ width: "70%" }}>
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
                                    <AntDesign name="creditcard" size={24} color="black" />
                                    <TextInput style={{ marginLeft: 10, width: 300 }} placeholder='Card ID' value={card.cardId} onChangeText={(text) => setCard({ ...card, cardId: text })} keyboardType='numeric'>
                                    </TextInput>
                                </View>
                            </View>
                            <View style={{ width: "70%", marginTop: 15 }}>
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
                                    <AntDesign name="profile" size={24} color="black" />
                                    <TextInput style={{ marginLeft: 10, width: 300 }} placeholder='Name' value={card.name} onChangeText={(text) => setCard({ ...card, name: text })}>
                                    </TextInput>
                                </View>
                            </View>
                            <View style={{ width: "70%", marginTop: 15 }}>
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
                                    <AntDesign name="lock" size={24} color="black" />
                                    <TextInput style={{ marginLeft: 10, width: 300 }} placeholder='Pin' value={card.pin} onChangeText={(text) => setCard({ ...card, pin: text })} keyboardType='numeric'>
                                    </TextInput>
                                </View>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={handleconfirm}>
                                    <Text style={styles.textStyle}>Confirm</Text>
                                </Pressable>
                            </View>

                        </View>

                    </View>
                </View>
            </Modal> */}
            <Card containerStyle={{}} wrapperStyle={{}}>
                <Card.Title style={styles.bannerText}>E - Wallet</Card.Title>
                <Card.Divider />
                <View
                    style={{
                        position: "relative",
                        alignItems: "center"
                    }}
                >
                    <AntDesign name="wallet" size={130} color="black" />
                    <Text style={styles.text}>Balance:</Text>
                    <Text style={styles.text}>{balance}</Text>
                </View>
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
            <Toast />
        </ScrollView >
    )
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
})