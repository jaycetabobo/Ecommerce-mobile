import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React from 'react'
import { Card } from "@rneui/base";
import { AntDesign } from '@expo/vector-icons';
import HeaderApp from '../../Components/header';
import Toast from 'react-native-toast-message';

export default function Ewallet2({ navigation, route }) {
    const [card, setCard] = React.useState({
        cardId: '',
        name: '',
        pin: ''
    })
    const price = route.params.amount
    const handleconfirm = (amount) => {
        if (card.cardId === '') {
            Toast.show({
                type: 'error',
                text1: 'No Card ID Entered',
                autoHide: true,
                visibilityTime: 3000
            });
        } else if (card.name === '') {
            Toast.show({
                type: 'error',
                text1: 'No Name Entered',
                autoHide: true,
                visibilityTime: 3000
            });
        } else if (card.pin === '') {
            Toast.show({
                type: 'error',
                text1: 'No Pin Entered',
                autoHide: true,
                visibilityTime: 3000
            });
        } else {
            Toast.show({
                type: 'success',
                text1: 'Successfully buy',
                autoHide: true,
                visibilityTime: 3000
            });
            setTimeout(() => {

            }, 4000); // Delay of 3 seconds (adjust as needed)
        }
    }
    return (
        <View >
            <HeaderApp onPress={() => navigation.goBack()} icon='arrow-back' />
            <Card containerStyle={{ borderRadius: 15 }} wrapperStyle={{}}>
                <View
                    style={{
                        position: "relative",
                        alignItems: "center"
                    }}
                >
                    <View style={{ width: "70%", marginTop: 10 }}>
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
                    <Card.Divider />
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
                            <AntDesign name="profile" size={24} color="black" />
                            <TextInput style={{ marginLeft: 10, width: 300 }} placeholder='Name' value={card.name} onChangeText={(text) => setCard({ ...card, name: text })}>
                            </TextInput>
                        </View>
                    </View>
                    <Card.Divider />
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
                            <AntDesign name="lock" size={24} color="black" />
                            <TextInput style={{ marginLeft: 10, width: 300 }} placeholder='Pin' value={card.pin} onChangeText={(text) => setCard({ ...card, pin: text })} keyboardType='numeric'>
                            </TextInput>
                        </View>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={handleconfirm}>
                            <Text style={styles.textStyle}>Confirm</Text>
                        </Pressable>
                    </View>
                    <Text>
                        {price}
                    </Text>
                </View>
            </Card>
            <Toast />
        </View>
    )
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
})