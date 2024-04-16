import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import React, { useState } from 'react'; // Import useState for counter state
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Data } from '../../productstore';
import { Card } from "@rneui/base";
import { CardImage } from '@rneui/base/dist/Card/Card.Image';
import { Button } from '@rneui/themed';

const { width, height } = Dimensions.get('window');

export default function Cart({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <Ionicons name="arrow-back" size={30} color="black" onPress={() => navigation.navigate('ProductList')} />
                <View style={{ alignItems: 'center' }}>
                    <AntDesign name="shoppingcart" size={40} color="black" />
                    <Text style={styles.containerHeaderText}>Your Shopping Carts</Text>
                </View>
            </View>
            <ScrollView style={styles.container2}>
                {Data.map((data, index) => (
                    <View style={styles.cart} key={index}>
                        <View>
                            <Card containerStyle={{ width: 150, margin: 0, borderRadius: 10 }} wrapperStyle={{}}>
                                <CardImage
                                    style={{ height: 100 }}
                                    resizeMode="contain"
                                    source={data.image}
                                />
                            </Card>
                        </View>
                        <View style={styles.cartTextContainer}>
                            <Text style={styles.cartText}>{data.title}</Text>
                            {/* Counter and price section */}
                            <View style={styles.counterContainer}>
                                <Text>
                                    Quantity:
                                </Text>
                                <AntDesign
                                    name="minuscircle"
                                    size={24}
                                    color="black"
                                    // Handle decrement button press
                                    onPress={() => { /* Handle decrement logic here */ }}
                                    style={{ marginLeft: 10 }}
                                />
                                {/* Add state variable for counter */}
                                <Text style={styles.counterText}>1</Text>
                                <AntDesign
                                    name="pluscircle"
                                    size={24}
                                    color="black"
                                    // Handle increment button press
                                    onPress={() => { /* Handle increment logic here */ }}
                                />
                            </View>
                            <Text style={styles.priceText}>
                                Price: ₱ {data.price}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.containerHeader}>
                <View style={styles.checkout}>
                    <Text style={styles.checkoutText}>Checkout</Text>
                    <Text style={styles.checkoutText}>₱ 10000.00</Text>
                </View>
                <Button
                    title="Go to Checkout"
                    loading={false}
                    loadingProps={{ size: 'small', color: 'white' }}
                    buttonStyle={{
                        backgroundColor: 'black',
                        borderRadius: 7,
                    }}
                    titleStyle={{ fontWeight: 'bold' }}
                    containerStyle={{
                        marginBottom: 15
                    }}
                    onPress={() => navigation.navigate('Checkout')}
                />
            </View>
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
        fontWeight: 'bold'
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
        gap: 180
    },
    checkoutText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
});
