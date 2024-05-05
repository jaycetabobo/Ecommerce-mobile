import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button } from '@rneui/themed';

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.textbanner}>BuynaBai: Your one-stop-shop for ultimate comfort.</Text>
            <Text style={styles.text}>Welcome to our premier destination, where comfort reigns supreme and convenience is paramount. Dive into a world of plush cushions, soft fabrics, and ergonomic designs, meticulously curated to elevate every aspect of your life. From cozy home essentials to activewear and outdoor gear, we offer a diverse range of products tailored to meet your comfort needs. Experience the difference at our one-stop shop, where comfort isn't just a luxury—it's a way of life.</Text>
            <View style={styles.button}>
                <Button
                    title="Discover Our Products"
                    loading={false}
                    loadingProps={{ size: 'small', color: 'white' }}
                    buttonStyle={{
                        backgroundColor: 'black',
                        borderRadius: 7,
                    }}
                    titleStyle={{ fontWeight: 'bold', fontSize: 18 }}
                    containerStyle={{
                    }}
                    onPress={() => { navigation.navigate("ProductList") }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        marginBottom: "50%"
    },
    textbanner: {
        fontWeight: 'bold',
        fontSize: 40
    },
    text: {
        fontSize: 20,
        marginTop: 20
    },
    button: {
        width: "70%",
        marginTop: 20
    }
})