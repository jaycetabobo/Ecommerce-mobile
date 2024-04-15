import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Card } from "@rneui/base";
import { Data } from '../../productstore';
import { Button } from '@rneui/themed';

const { width, height } = Dimensions.get('window')

export default function Checkout({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="arrow-back" size={30} color="black" onPress={() => navigation.goBack()} />
            </View>
            <ScrollView>
                <Card containerStyle={{ marginHorizontal: 50 }} wrapperStyle={{}}>
                    <Card.Title style={styles.cardTitle}>Order Summary</Card.Title>
                    <Card.Divider />
                    <View
                        style={{
                            position: "relative",
                            alignItems: "start"
                        }}
                    >
                        {Data.map((data, index) => (
                            <View key={index} style={styles.ordercontainer}>
                                <Text>{index + 1}. </Text>
                                <View style={styles.ordercontainer2}>
                                    <Text>{data.title}</Text>
                                    <Text>${data.price}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    <Card.Divider />
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>
                            Total
                        </Text>
                        <Text style={styles.totalText2}>
                            $1000
                        </Text>
                    </View>
                </Card>
                <View style={styles.shippingContainer}>
                    <Text style={styles.shippingText}>
                        Shipping Address
                    </Text>
                    <View style={styles.shippingInput}>
                        <View
                            style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                                borderWidth: 1,
                                borderRadius: 10,
                                paddingLeft: 10,
                                paddingBottom: 5,
                                paddingTop: 5,
                                backgroundColor: 'white'
                            }}
                        >
                            <TextInput style={{ marginLeft: 10, width: width * .36 }} placeholder='First Name' />
                        </View>
                        <View
                            style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                                borderWidth: 1,
                                borderRadius: 10,
                                paddingLeft: 10,
                                paddingBottom: 5,
                                paddingTop: 5,
                                backgroundColor: 'white'
                            }}
                        >
                            <TextInput style={{ marginLeft: 10, width: width * .36 }} placeholder='Last Name' />
                        </View>
                    </View>
                    <View
                        style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            borderWidth: 1,
                            borderRadius: 10,
                            paddingLeft: 10,
                            paddingBottom: 5,
                            paddingTop: 5,
                            marginBottom: 10,
                            backgroundColor: 'white'
                        }}
                    >
                        <TextInput style={{ marginLeft: 10, width: width * .80 }} placeholder='Address' />
                    </View>
                    <View
                        style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            borderWidth: 1,
                            borderRadius: 10,
                            paddingLeft: 10,
                            paddingBottom: 5,
                            paddingTop: 5,
                            marginBottom: 10,
                            backgroundColor: 'white'
                        }}
                    >
                        <TextInput style={{ marginLeft: 10, width: width * .80 }} placeholder='City' />
                    </View>
                    <Text style={styles.shippingText}>
                        Make Payment
                    </Text>
                    <Button
                        title="💳  E-Wallet"
                        loading={false}
                        loadingProps={{ size: 'small', color: 'white' }}
                        buttonStyle={{
                            backgroundColor: 'white',
                            borderRadius: 7,
                            borderColor: "black",
                            borderWidth: 1,
                            padding: 0,
                            paddingVertical: 5,
                            marginTop: 10,
                        }}
                        titleStyle={{ color: "black", fontSize: 20, fontWeight: 'bold' }}
                        containerStyle={{
                            width: 140
                        }}
                    // onPress={() => { navigation.navigate("ProductList") }}
                    />
                </View>
            </ScrollView>
            <View>
                <Button
                    title="Checkout"
                    loading={false}
                    loadingProps={{ size: 'small', color: 'white' }}
                    buttonStyle={{
                        backgroundColor: 'black',
                        borderRadius: 7,
                        paddingVertical: 10,
                    }}
                    titleStyle={{ fontWeight: 'bold', fontSize: 20 }}
                    containerStyle={{
                        margin: 15,
                    }}
                    onPress={() => navigation.navigate('Checkout')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        height: height,
    },
    header: {
        marginHorizontal: 5
    },
    cardTitle: {
        fontSize: 22
    },
    ordercontainer: {
        flexDirection: 'row',
        width: width * .55,
        marginBottom: 10
    },
    ordercontainer2: {
        flexDirection: 'row',
        gap: 10
    },
    totalContainer: {
        flexDirection: 'row',
        gap: 130,
    },
    totalText: {
        fontSize: 15,
        marginLeft: 10
    },
    totalText2: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    shippingContainer: {
        padding: 20
    },
    shippingText: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    shippingInput: {
        flexDirection: 'row',
        gap: 10,
        marginVertical: 10,
    }
})