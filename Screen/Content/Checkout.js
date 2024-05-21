import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@rneui/base';
import { Button } from '@rneui/themed';
import axios from '../../axios';
import { ToggleButton } from 'react-native-paper';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('window');

export default function Checkout({ navigation, route }) {
    const [payment, setPayment] = useState('');
    const carts = route.params.carts;
    const totalAmount = route.params.totalAmount;
    const userId = route.params.userid;
    const [addressData, setAddressData] = useState('');
    const [ewallet, setEwallet] = React.useState(null);
    const ewalletStore = ewallet ? ewallet : [];

    const getEwallet = async () => {
        await axios.get('ewallets/').then((response) => setEwallet(response.data)
        ).catch((error) => console.log(error))
    }
    useEffect(() => {
        getEwallet()
    }, []);

    const handleCheckout = async () => {
        if (addressData === '') {
            Toast.show({
                type: 'error',
                text1: 'Please input an Address',
                autoHide: true,
                visibilityTime: 3000
            });
            return;
        } else if (payment === '') {
            Toast.show({
                type: 'error',
                text1: 'Please add a Payment',
                autoHide: true,
                visibilityTime: 3000
            });
            return;
        } else if (payment === 'GCash') {
            Toast.show({
                type: 'error',
                text1: 'G Cash Payment is not Available for now. Please Select E Wallet',
                autoHide: true,
                visibilityTime: 3000
            });
            return;
        }

        try {
            const cartIds = carts.map(cart => cart.id);
            const existingEwallet = ewalletStore.find(ewal => ewal.user === userId);
            const numericAmount = parseFloat(totalAmount);


            // Fetch the current stock of each product in the cart
            const stockPromises = carts.map(cartItem =>
                axios.get(`products/${cartItem.product}/`)
            );
            const stockResponses = await Promise.all(stockPromises);

            // Validate stock availability
            for (let i = 0; i < carts.length; i++) {
                const cartItem = carts[i];
                const product = stockResponses[i].data;
                const sizeStockKey = `stock_${cartItem.size.toLowerCase()}_size`; // Construct stock size attribute key
                const currentStock = product[sizeStockKey];

                if (currentStock < cartItem.quantity) {
                    Toast.show({
                        type: 'error',
                        text1: `Insufficient stock for ${cartItem.product_name} (${cartItem.size})`,
                        text2: `Available stock: ${currentStock}, required: ${cartItem.quantity}`,
                        autoHide: true,
                        visibilityTime: 3000
                    });
                } else {
                    if (payment === 'EWallet') {
                        if (!existingEwallet || parseFloat(existingEwallet.balance) < numericAmount) {
                            Toast.show({
                                type: 'error',
                                text1: 'Insufficient E-Wallet Balance',
                                text2: 'Please cash in to proceed',
                                autoHide: true,
                                visibilityTime: 3000
                            });
                            return;
                        }

                        const updatedBalance = parseFloat(existingEwallet.balance) - numericAmount;
                        await axios.patch(`ewallets/${existingEwallet.id}/`, {
                            balance: updatedBalance
                        });

                        Toast.show({
                            type: 'success',
                            text1: 'Your E Wallet balance is deducted by the total amount',
                            autoHide: true,
                            visibilityTime: 2000
                        });
                    }

                    // Deduct the quantity from the stock of each product size
                    const updateStockPromises = carts.map((cartItem, index) => {
                        const product = stockResponses[index].data;
                        const sizeStockKey = `stock_${cartItem.size.toLowerCase()}_size`; // Construct stock size attribute key
                        const currentStock = product[sizeStockKey];
                        const updatedStock = currentStock - cartItem.quantity;

                        // Construct the data object with the updated stock attribute
                        const updatedStockData = { [sizeStockKey]: updatedStock };

                        return axios.patch(`products/${cartItem.product}/`, updatedStockData);
                    });

                    // Update the stock of each product size
                    await Promise.all(updateStockPromises);

                    const response = await axios.post('orders/', {
                        cart: cartIds,
                        user: userId,
                        address: addressData,
                        total_amount: parseFloat(totalAmount),
                    });

                    console.log('Response:', response.data);

                    Toast.show({
                        type: 'success',
                        text1: 'Order Placed Successfully',
                        autoHide: true,
                        visibilityTime: 3000
                    });

                    setTimeout(() => {
                        navigation.navigate('ProductList');
                    }, 3500);

                }
            }


        } catch (error) {
            console.error('Error creating order:', error.response?.data || error.message);

            Toast.show({
                type: 'error',
                text1: 'Order Failed',
                text2: error.response?.data?.message || 'An error occurred while creating the order',
                autoHide: true,
                visibilityTime: 5000
            });
        }
        setPayment('')
        setAddressData('')
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="arrow-back" size={30} color="black" onPress={() => navigation.goBack()} />
            </View>
            <ScrollView>
                <Card containerStyle={{ marginHorizontal: 50 }}>
                    <Card.Title style={styles.cardTitle}>Order Summary</Card.Title>
                    <Card.Divider />
                    <View style={styles.orderList}>
                        {carts.length > 0 ? (
                            carts.map((data, index) => (
                                <View key={index} style={styles.orderContainer}>
                                    <Text>{data.quantity} x </Text>
                                    <View style={styles.orderDetails}>
                                        <Text>{data.product_name}</Text>
                                        <Text>{data.size}</Text>
                                        <Text>₱ {data.price}</Text>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.emptyCartText}>Your cart is empty.</Text>
                        )}
                    </View>
                    <Card.Divider />
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>Total</Text>
                        <Text style={styles.totalTextAmount}>₱ {totalAmount}</Text>
                    </View>
                </Card>
                <View style={styles.shippingContainer}>
                    <Text style={styles.shippingText}>Shipping Address</Text>
                    <View style={styles.addressInputContainer}>
                        <TextInput
                            style={styles.addressInput}
                            placeholder='Address'
                            value={addressData}
                            onChangeText={setAddressData}
                        />
                    </View>
                    <Text style={styles.shippingText}>Make Payment</Text>
                    <ToggleButton.Row onValueChange={setPayment} value={payment}>
                        <ToggleButton
                            icon={() => <Text>💳 E-Wallet</Text>}
                            value="EWallet"
                            style={styles.toggleButton}
                        />
                        <ToggleButton
                            icon={() => <Text>🇬 G-Cash</Text>}
                            value="GCash"
                            style={styles.toggleButton}
                        />
                    </ToggleButton.Row>
                </View>
            </ScrollView>
            <View>
                <Button
                    title="Checkout"
                    buttonStyle={styles.checkoutButton}
                    titleStyle={styles.checkoutButtonText}
                    containerStyle={styles.checkoutButtonContainer}
                    onPress={handleCheckout}
                />
            </View>
            <Toast />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        height: height,
    },
    header: {
        marginHorizontal: 5,
    },
    cardTitle: {
        fontSize: 22,
    },
    orderList: {
        alignItems: 'flex-start',
    },
    orderContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    orderDetails: {
        flexDirection: 'row',
        gap: 10,
    },
    emptyCartText: {
        textAlign: 'center',
        marginVertical: 20,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    totalText: {
        fontSize: 15,
    },
    totalTextAmount: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    shippingContainer: {
        padding: 20,
    },
    shippingText: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    addressInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
    },
    addressInput: {
        marginLeft: 10,
        width: width * 0.8,
    },
    toggleButton: {
        width: 150,
        borderWidth: 2,
        borderColor: 'black',
        marginTop: 10,
    },
    checkoutButton: {
        backgroundColor: 'black',
        borderRadius: 7,
        paddingVertical: 10,
    },
    checkoutButtonText: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    checkoutButtonContainer: {
        margin: 15,
    },
});
