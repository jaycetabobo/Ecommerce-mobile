import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { Card } from "@rneui/base";
import { AntDesign } from '@expo/vector-icons';
import HeaderApp from '../../Components/header';
import Toast from 'react-native-toast-message';
import axios from 'axios';  // Make sure to import axios or any other HTTP client you're using

export default function Ewallet2({ navigation, route }) {
    const [card, setCard] = React.useState({
        cardId: '',
        name: '',
        pin: ''
    });
    const [ewallet, setEwallet] = React.useState(null);
    const ewalletStore = ewallet ? ewallet : [];
    const price = route.params.amount;
    const userid = route.params.userdata;
    const username = route.params.userName;

    const getEwallet = async () => {
        await axios.get('ewallets/').then((response) => setEwallet(response.data)
        ).catch((error) => console.log(error))
    }
    useEffect(() => {
        getEwallet()
    }, []);

    const handleconfirm = (amount) => {
        if (card.cardId === '' || card.name === '' || card.pin === '') {
            Toast.show({
                type: 'error',
                text1: 'Please fill all fields',
                autoHide: true,
                visibilityTime: 3000
            });
            return; // Early exit if size is not selected
        }

        const existingEwallet = ewalletStore.find(
            (ewal) => ewal.user === userid
        );

        const numericAmount = parseFloat(amount); // Ensure the amount is a number

        if (existingEwallet) {
            const updatedBalance = parseFloat(existingEwallet.balance) + numericAmount; // Ensure balance is a number
            // Patch existing cart item quantity
            axios.patch(`ewallets/${existingEwallet.id}/`, {
                balance: updatedBalance
            })
                .then((response) => {
                    Toast.show({
                        type: 'success',
                        text1: 'Amount added to your balance',
                        autoHide: true,
                        visibilityTime: 3000
                    });
                    getEwallet();
                    setTimeout(() => {
                        navigation.navigate('Ewallet');
                    }, 4000); // Delay of 3 seconds (adjust as needed)
                })
                .catch((error) => {
                    console.error('Error patching cart item:', error);
                    // Handle error appropriately, e.g., display an error message to the user
                });
        } else {
            // Create new cart item if no existing match
            axios.post('ewallets/', {
                name: username,
                balance: numericAmount,
                user: userid
            })
                .then((response) => {
                    Toast.show({
                        type: 'success',
                        text1: 'New e-wallet created and amount added',
                        autoHide: true,
                        visibilityTime: 3000
                    });
                    getEwallet();
                    setTimeout(() => {
                        navigation.navigate('Ewallet');
                    }, 4000); // Delay of 3 seconds (adjust as needed)
                })
                .catch((error) => {
                    console.error('Error creating cart item:', error);
                    // Handle error appropriately, e.g., display an error message to the user
                });
        }
    };

    return (
        <View>
            <HeaderApp onPress={() => navigation.goBack()} icon='arrow-back' />
            <Card containerStyle={{ borderRadius: 15 }} wrapperStyle={{}}>
                <View style={{ position: "relative", alignItems: "center" }}>
                    <View style={{ width: "70%", marginTop: 10 }}>
                        <View style={styles.inputContainer}>
                            <AntDesign name="creditcard" size={24} color="black" />
                            <TextInput
                                style={styles.textInput}
                                placeholder='Card ID'
                                value={card.cardId}
                                onChangeText={(text) => setCard({ ...card, cardId: text })}
                                keyboardType='numeric'
                            />
                        </View>
                    </View>
                    <Card.Divider />
                    <View style={{ width: "70%" }}>
                        <View style={styles.inputContainer}>
                            <AntDesign name="profile" size={24} color="black" />
                            <TextInput
                                style={styles.textInput}
                                placeholder='Name'
                                value={card.name}
                                onChangeText={(text) => setCard({ ...card, name: text })}
                            />
                        </View>
                    </View>
                    <Card.Divider />
                    <View style={{ width: "70%" }}>
                        <View style={styles.inputContainer}>
                            <AntDesign name="lock" size={24} color="black" />
                            <TextInput
                                style={styles.textInput}
                                placeholder='Pin'
                                value={card.pin}
                                onChangeText={(text) => setCard({ ...card, pin: text })}
                                keyboardType='numeric'
                            />
                        </View>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => handleconfirm(price)}>
                            <Text style={styles.textStyle}>Confirm</Text>
                        </Pressable>
                    </View>
                </View>
            </Card>
            <Toast />
        </View>
    );
}

const styles = StyleSheet.create({
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
    inputContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        borderWidth: 2,
        borderRadius: 100,
        paddingLeft: 10,
        paddingBottom: 5,
        paddingTop: 5,
    },
    textInput: {
        marginLeft: 10,
        width: 300
    },
});
