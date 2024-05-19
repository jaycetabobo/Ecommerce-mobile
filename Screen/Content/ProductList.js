import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Alert, Modal, Pressable, RefreshControl } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { Card, color } from "@rneui/base";
import { CardImage } from '@rneui/base/dist/Card/Card.Image';
import { Data } from '../../productstore';
import { Button, ListItem } from '@rneui/themed';
import { Menu, Checkbox } from 'react-native-paper';
import HeaderApp from '../../Components/header';
import { AntDesign } from '@expo/vector-icons';
import axios from '../../axios';
import { imagehttp } from '../../axios';


const { width, height } = Dimensions.get('window')

export default function ProductList({ navigation }) {
    const [checkedMen, setCheckedMen] = useState([false, false]);
    const [checkedWomen, setCheckedWomen] = useState([false, false]);
    const [checkedKids, setCheckedKids] = useState([false, false]);
    const [expanded, setExpanded] = useState(false);
    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const [visible1, setVisible1] = useState(false);
    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);
    const handleProductClick = (id) => {
        navigation.navigate('Product', { id })
    }
    const [data, setData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            axios.get('products/').then((response) => setData(response.data)
            ).catch((error) => console.log(error))
            // console.log(data)
            setRefreshing(false);
        }, 1000);
    }, []);

    useEffect(() => {
        axios.get('products/').then((response) => setData(response.data)
        ).catch((error) => console.log(error))
        // console.log(data)
    }, []);
    const handleProfile = () => {
        navigation.navigate('Profile')
        setModalVisible(!modalVisible)
    }
    const handleEwallet = () => {
        navigation.navigate('Ewallet')
        setModalVisible(!modalVisible)
    }

    return (
        <View>
            <HeaderApp onPress={() => setModalVisible(true)} icon='menu' icon2='shopping-cart' onPressRight={() => navigation.navigate('Cart')} />
            <Modal
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
                        <TouchableOpacity style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 10, marginHorizontal: 80, paddingVertical: 5, marginTop: 10 }} onPress={handleProfile}>
                            <AntDesign name="user" size={28} color="black" />
                            <Text style={styles.text}>Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 10, marginHorizontal: 80, paddingVertical: 5, marginTop: 10 }} onPress={handleEwallet}>
                            <AntDesign name="wallet" size={28} color="black" />
                            <Text style={styles.text}>E-Wallet</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={styles.container1}>
                <TouchableOpacity style={styles.category}>
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={<Text style={styles.text} onPress={openMenu}>Category</Text>}
                        anchorPosition='bottom'
                        contentStyle={{ backgroundColor: 'white', }}
                    >
                        <ListItem>
                            <ListItem.CheckBox
                                iconType="material-community"
                                checkedIcon="checkbox-marked"
                                uncheckedIcon="checkbox-blank-outline"
                                checked={checkedMen[0]}
                                onPress={() => setCheckedMen([!checkedMen[0], checkedMen[1]])}
                            />
                            <Text style={styles.text}>Men</Text>
                        </ListItem>
                        <ListItem>
                            <ListItem.CheckBox
                                iconType="material-community"
                                checkedIcon="checkbox-marked"
                                uncheckedIcon="checkbox-blank-outline"
                                checked={checkedWomen[0]}
                                onPress={() => setCheckedWomen([!checkedWomen[0], checkedWomen[1]])}
                            />
                            <Text style={styles.text}>Women</Text>
                        </ListItem>
                        <ListItem>
                            <ListItem.CheckBox
                                iconType="material-community"
                                checkedIcon="checkbox-marked"
                                uncheckedIcon="checkbox-blank-outline"
                                checked={checkedKids[0]}
                                onPress={() => setCheckedKids([!checkedKids[0], checkedKids[1]])}
                            />
                            <Text style={styles.text}>Kids</Text>
                        </ListItem>
                    </Menu>
                </TouchableOpacity>

                <View style={styles.sortcontainer}>
                    <Text style={styles.text}>
                        Sort by:
                    </Text>
                    <TouchableOpacity style={styles.category}>
                        <Menu
                            visible={visible1}
                            onDismiss={closeMenu1}
                            anchor={<Text style={styles.text} onPress={openMenu1}>Select</Text>}
                            anchorPosition='bottom'
                            contentStyle={{ backgroundColor: 'white' }}
                        >
                            <TouchableOpacity style={{ padding: 10 }}>
                                <Text style={styles.text}>(Price) Highest to Lowest</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ padding: 10 }}>
                                <Text style={styles.text}>(Price) Lowest to Highest</Text>
                            </TouchableOpacity>
                        </Menu>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={styles.container2} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                {data ? (
                    <View>
                        {data.map((data, index) => (
                            <View key={index}>
                                <Card containerStyle={{ borderRadius: 8 }} wrapperStyle={{}}>
                                    <CardImage
                                        style={{ width: "100%", height: 200, marginBottom: 10 }}
                                        resizeMode="contain"
                                        source={{ uri: `${imagehttp}${data.image}` }}
                                        onPress={() => handleProductClick(data.id)}
                                    />
                                    <View>
                                        <Text style={styles.text2}>
                                            {data.product_name}
                                        </Text>
                                        <Text style={styles.text3} numberOfLines={2}>
                                            {data.description}
                                        </Text>
                                        <View style={styles.addcartcontainer}>
                                            <Button
                                                title="Add to Cart"
                                                loading={false}
                                                loadingProps={{ size: 'small', color: 'white' }}
                                                buttonStyle={{
                                                    backgroundColor: 'black',
                                                    borderRadius: 7,
                                                }}
                                                titleStyle={{ fontWeight: 'bold' }}
                                                containerStyle={{
                                                }}
                                                onPress={() => handleProductClick(data.id)}
                                            />
                                            <Text style={styles.text2}>
                                                ₱ {data.price}
                                            </Text>
                                        </View>
                                    </View>
                                </Card>
                            </View>
                        ))
                        }
                    </View>
                ) : (
                    <Text>
                        Loading product data...
                    </Text>
                )}
            </ScrollView>


            {/* <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}>
                    <Text style={styles.textStyle}>Show Modal</Text>
                </Pressable> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container1: {
        display: 'flex',
        flexDirection: 'row',
        gap: 80,
        padding: 15,
        paddingHorizontal: 30
    },
    container2: {
        paddingHorizontal: 20,
        height: height * .83
    },
    sortcontainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    category: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 2,
        borderRadius: 5
    },
    text: {
        fontSize: 18,
        marginHorizontal: 10
    },
    text2: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    text3: {
        fontSize: 15,
        marginVertical: 10
    },
    addcartcontainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    container: {
        flex: 1,
        alignItems: 'right',
        justifyContent: 'right',
        padding: 16,
        marginTop: 30
    },
    navigationContainer: {
        backgroundColor: '#ecf0f1',
    },
    centeredView: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 'auto'
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
        height: '50%',
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