import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, DrawerLayoutAndroid, } from 'react-native'
import React, { useState, useRef } from 'react'
import { Card, color } from "@rneui/base";
import { CardImage } from '@rneui/base/dist/Card/Card.Image';
import { Data } from '../../productstore';
import { Button, ListItem } from '@rneui/themed';
import { Menu, Checkbox } from 'react-native-paper';
import HeaderApp from '../../Components/header';
import { AntDesign } from '@expo/vector-icons';

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
    const drawer = useRef(null);
    const navigationView = () => (
        <View style={[styles.container, styles.navigationContainer]}>
            <Text style={styles.paragraph}><AntDesign name="closecircle" size={35} color="black" onPress={() => drawer.current.closeDrawer()} /></Text>
            <View style={{ marginTop: 20 }}>
                <Text onPress={() => navigation.navigate('Wallet')} >
                    Wallet
                </Text>
            </View>
        </View>
    );
    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerPosition='left'
            renderNavigationView={navigationView}>
            <View>
                <HeaderApp onPress={() => drawer.current.openDrawer()} icon='menu' icon2='shopping-cart' onPressRight={() => navigation.navigate('Cart')} />
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
                <ScrollView style={styles.container2}>
                    {Data.map((data, index) => (
                        <View key={index}>
                            <Card containerStyle={{ borderRadius: 8 }} wrapperStyle={{}}>
                                <CardImage
                                    style={{ width: "100%", height: 200, marginBottom: 10 }}
                                    resizeMode="contain"
                                    source={data.image}
                                    onPress={() => handleProductClick(data.id)}
                                />
                                <View>
                                    <Text style={styles.text2}>
                                        {data.title}
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
                                            ${data.price}
                                        </Text>
                                    </View>
                                </View>
                            </Card>
                        </View>
                    ))}

                </ScrollView>
            </View>
        </DrawerLayoutAndroid>
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
})