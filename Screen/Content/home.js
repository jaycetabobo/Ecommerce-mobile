import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button } from '@rneui/themed';

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.textbanner}>BuynaBai: Your One-Stop Shop for Confidence.</Text>
            <Text style={styles.text}>BuynaBai positions itself as an online store prioritizing both ease and comfort, offering a wide selection, user-friendly platform, fast delivery, and potentially curated products for a specific niche, aiming to become your trusted source for convenient and comfortable shopping.</Text>
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