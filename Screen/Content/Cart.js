import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, RefreshControl } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Card, Button } from '@rneui/themed';
import { useSelector } from 'react-redux';
import axios from '../../axios';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('window');

export default function Cart({ navigation }) {
    const [productData, setData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [carts, setCarts] = useState(null);
    const Tokens = useSelector((state) => state.auth.logInToken);
    const userid = userData ? userData.id : '';
    const [refreshing, setRefreshing] = useState(false);
    let cartTotal = 0;

    useEffect(() => {
        axios.get('auth/users/me/', {
            headers: { 'Authorization': `Token ${Tokens}` }
        }).then(response => setUserData(response.data))
            .catch(error => console.log(error));
    }, [Tokens]);

    useEffect(() => {
        axios.get('products/')
            .then(response => setData(response.data))
            .catch(error => console.log(error));
    }, []);

    const getCarts = () => {
        axios.get('carts/')
            .then(response => setCarts(response.data))
            .catch(error => console.log(error));
    };

    useEffect(() => {
        getCarts();
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            getCarts();
            setRefreshing(false);
        }, 1000);
    }, []);

    const handleDelete = (cartId) => {
        axios.delete(`carts/${cartId}/`)
            .then(() => {
                getCarts();
            })
            .catch(error => console.log(error));
    };

    const handleIncrement = (cartItem, size, productItem) => {
        let stock;
        if (size === 'Small') {
            stock = productItem.stock_small_size;
        } else if (size === 'Medium') {
            stock = productItem.stock_medium_size;
        } else if (size === 'Large') {
            stock = productItem.stock_large_size;
        }
        if (cartItem.quantity < stock) {
            const updatedQuantity = cartItem.quantity + 1;
            updateCartQuantity(cartItem.id, updatedQuantity);
        } else {
            Toast.show({
                type: 'error',
                text1: `stock limit of ${size} is reached`,
                autoHide: true,
                visibilityTime: 3000
            });
        }
    };

    const handleDecrement = (cartItem, size, productItem) => {
        let stock;
        if (size === 'Small') {
            stock = productItem.stock_small_size;
        } else if (size === 'Medium') {
            stock = productItem.stock_medium_size;
        } else if (size === 'Large') {
            stock = productItem.stock_large_size;
        }
        if (cartItem.quantity > 1) {
            const updatedQuantity = cartItem.quantity - 1;
            updateCartQuantity(cartItem.id, updatedQuantity);
        } else {
            Toast.show({
                type: 'error',
                text1: `stock limit of ${size} is reached`,
                autoHide: true,
                visibilityTime: 3000
            });
        }
    };

    const updateCartQuantity = (cartId, quantity) => {
        axios.patch(`carts/${cartId}/`, { quantity })
            .then(() => {
                getCarts();
            })
            .catch(error => console.log(error));
    };

    const filteredCarts = carts ? carts.filter(cart => cart.user === userid) : [];

    const handleCheckoutCart = (carts, totalAmount) => {
        navigation.navigate('Checkout', { carts, totalAmount, userid });
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <Ionicons name="arrow-back" size={30} color="black" onPress={() => navigation.goBack()} />
                <View style={{ alignItems: 'center' }}>
                    <AntDesign name="shoppingcart" size={40} color="black" />
                    <Text style={styles.containerHeaderText}>Your Shopping Carts</Text>
                </View>
            </View>
            <ScrollView style={styles.container2} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                {filteredCarts.length > 0 ? (
                    filteredCarts.map((data, index) => (
                        <View key={index}>
                            {productData ? (
                                productData
                                    .filter(product => product.id === data.product)
                                    .map((productData) => {
                                        cartTotal += data.quantity * productData.price;
                                        return (
                                            <View style={styles.cart} key={productData.id}>
                                                <View>
                                                    <Card containerStyle={{ width: 150, margin: 0, borderRadius: 10 }} wrapperStyle={{}}>
                                                        {/* Uncomment the following lines if you want to show the product image */}
                                                        {/* <Card.Image
                                                          style={{ height: 100 }}
                                                          resizeMode="contain"
                                                          source={{ uri: `${imagehttp}${data.image}` }}
                                                        /> */}
                                                    </Card>
                                                </View>
                                                <View style={styles.cartTextContainer}>
                                                    <Text style={styles.cartText}>{productData.product_name}</Text>
                                                    <Text style={styles.cartText}>Size: {data.size}</Text>
                                                    <View style={styles.counterContainer}>
                                                        <Text>Quantity:</Text>
                                                        <AntDesign
                                                            name="minuscircle"
                                                            size={24}
                                                            color="black"
                                                            onPress={() => handleDecrement(data, data.size, productData)}
                                                            style={{ marginLeft: 10 }}
                                                        />
                                                        <Text style={styles.counterText}>{data.quantity}</Text>
                                                        <AntDesign
                                                            name="pluscircle"
                                                            size={24}
                                                            color="black"
                                                            onPress={() => handleIncrement(data, data.size, productData)}
                                                        />
                                                    </View>
                                                    <Text style={styles.priceText}>Price: ₱ {productData.price}</Text>
                                                    <Button
                                                        title="Delete"
                                                        onPress={() => handleDelete(data.id)}
                                                        buttonStyle={{
                                                            backgroundColor: 'black',
                                                            borderRadius: 7,
                                                            marginTop: 10,
                                                            marginBottom: 15
                                                        }}
                                                        titleStyle={{ fontWeight: 'bold' }}
                                                    />
                                                </View>
                                            </View>
                                        );
                                    })
                            ) : (
                                <Text>Loading product data...</Text>
                            )}
                        </View>
                    ))
                ) : (
                    <Text style={{ textAlign: 'center', marginVertical: 20 }}>Your cart is empty.</Text>
                )}
            </ScrollView>
            <View style={styles.containerHeader}>
                <View style={styles.checkout}>
                    <Text style={styles.checkoutText}>Checkout</Text>
                    <Text style={styles.checkoutText}>₱ {cartTotal.toFixed(2)}</Text>
                </View>
                <Button
                    title="Go to Checkout"
                    loading={false}
                    buttonStyle={{ backgroundColor: 'black', borderRadius: 7 }}
                    titleStyle={{ fontWeight: 'bold' }}
                    containerStyle={{ marginBottom: 15 }}
                    onPress={() => handleCheckoutCart(filteredCarts, cartTotal)} // Fix here
                />
            </View>
            <Toast />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        backgroundColor: 'white',
        height: height,
    },
    containerHeader: {
        backgroundColor: '#EEEEEE',
        paddingHorizontal: 10,
    },
    containerHeaderText: {
        marginVertical: 10,
        marginBottom: 20,
        fontSize: 20,
    },
    container2: {
        padding: 10,
    },
    cart: {
        flexDirection: 'row',
        marginTop: 15,
    },
    cartTextContainer: {
        width: width * 0.55,
        paddingHorizontal: 15,
        marginTop: 10,
    },
    cartText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    counterText: {
        marginHorizontal: 10,
    },
    priceText: {
        marginTop: 10,
        fontSize: 15,
    },
    checkout: {
        flexDirection: 'row',
        marginVertical: 10,
        marginBottom: 15,
        alignItems: 'center',
        gap: 180,
    },
    checkoutText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
