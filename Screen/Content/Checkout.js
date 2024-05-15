import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Card } from "@rneui/base";
import { Data } from '../../productstore';
import { Button } from '@rneui/themed';
import { useSelector } from 'react-redux';
import axios from '../../axios';
import { imagehttp } from '../../axios';
import { ToggleButton } from 'react-native-paper';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('window')

export default function Checkout({ navigation }) {
    const [payment, setPayment] = useState('');
    const cart = useSelector((state) => state.cart.cart);
    const cartID = cart.productID;
    const [data, setData] = useState([]);
    const [addressData, setAddressData] = useState({
        address: '',
        city: ''
    })
    let cartTotal = 0;
    useEffect(() => {
        axios.get('products/').then((response) => setData(response.data)
        ).catch((error) => console.log(error))
    }, []);
    const filteredProducts = data.filter((product) =>
        cart.some((cartItem) => cartItem.productID === product.id)
    );
    const combinedData = filteredProducts.map((product) => {
        const matchingCartItem = cart.find((item) => item.productID === product.id);
        const size = matchingCartItem.size
        const quantity = matchingCartItem?.quantity || 0; // Use optional chaining for quantity
        const productTotal = quantity * product.price;
        cartTotal += productTotal; // Update cart total within the map function

        return { ...product, quantity, productTotal, size }; // Add productTotal to combined data
    });
    const handleCheckout = () => {
        if (addressData.address === '') {
            Toast.show({
                type: 'error',
                text1: 'Please input an Address',
                autoHide: true,
                visibilityTime: 3000
            });
        } else if (addressData.city === '') {
            Toast.show({
                type: 'error',
                text1: 'Please input a City',
                autoHide: true,
                visibilityTime: 3000
            });
        } else if (payment === '') {
            Toast.show({
                type: 'error',
                text1: 'Please add a Payment',
                autoHide: true,
                visibilityTime: 3000
            });
        } else if (payment === 'GCash') {
            Toast.show({
                type: 'error',
                text1: 'G Cash Payment is not Available for now. Please Select E Wallet',
                autoHide: true,
                visibilityTime: 3000
            });
        } else {
            Toast.show({
                type: 'success',
                text1: 'Order Successful!!',
                text2: 'Your E Wallet balance is deducted by the total amount',
                autoHide: true,
                visibilityTime: 5000
            });
            setTimeout(() => {
                navigation.navigate('ProductList')
            }, 5000); // Delay of 3 seconds (adjust as needed)
        }
    }

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
                        {combinedData.length > 0 ? (
                            combinedData.map((data, index) => (
                                <View key={index} style={styles.ordercontainer}>
                                    <Text>{data.quantity} * </Text>
                                    <View style={styles.ordercontainer2}>
                                        <Text>{data.product_name}</Text>
                                        <Text>{data.size}</Text>
                                        <Text>₱ {data.productTotal.toFixed(2)}</Text>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <Text style={{ textAlign: 'center', marginVertical: 20 }}>
                                Your cart is empty.
                            </Text>
                        )}
                    </View>
                    <Card.Divider />
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>
                            Total
                        </Text>
                        <Text style={styles.totalText2}>
                            ₱ {cartTotal.toFixed(2)}
                        </Text>
                    </View>
                </Card>
                <View style={styles.shippingContainer}>
                    <Text style={styles.shippingText}>
                        Shipping Address
                    </Text>
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
                            backgroundColor: 'white',
                            marginTop: 10
                        }}
                    >
                        <TextInput style={{ marginLeft: 10, width: width * .80 }} placeholder='Address' value={addressData.address} onChangeText={(text) => setAddressData({ ...addressData, address: text })} />
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
                        <TextInput style={{ marginLeft: 10, width: width * .80 }} placeholder='City' value={addressData.city} onChangeText={(text) => setAddressData({ ...addressData, city: text })} />
                    </View>
                    <Text style={styles.shippingText}>
                        Make Payment
                    </Text>
                    <ToggleButton.Row onValueChange={value => setPayment(value)} value={payment}>
                        <ToggleButton icon={() => <View><Text>💳 E-Wallet</Text></View>} value="EWallet" style={{ width: 150, borderWidth: 2, borderColor: 'black', marginTop: 10 }} />
                        <ToggleButton icon={() => <View><Text>🇬 G-Cash</Text></View>} value="GCash" style={{ width: 150, borderWidth: 2, borderColor: 'black', marginTop: 10 }} />
                    </ToggleButton.Row>
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
                    onPress={handleCheckout}
                />
            </View>
            <Toast />
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
        width: width * .40,
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