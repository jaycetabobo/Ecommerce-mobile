import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button } from '@rneui/themed';

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.textbanner}>EXPERIENCE THE HEIGHT OF FASHION WITH OUR EXQUISITE DESIGNER PIECES.</Text>
            <Text style={styles.text}>Where style, sophistication, exclusivity is the forefront of our collection. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat quaerat nostrum quia nam earum, libero, expedita impedit delectus provident quo eveniet.</Text>
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