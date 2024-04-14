import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import HeaderApp from '../../Components/header';
import { Card } from "@rneui/base";
import { CardImage } from '@rneui/base/dist/Card/Card.Image';
import { Divider } from '@rneui/themed';
import { Data } from '../../productstore';

export default function Review({ route, navigation }) {
    const productId = route.params.id;
    const productColor = route.params.color;
    const productSize = route.params.size;
    const matchProduct = Data.filter(data => data.id === productId);
    const [reviewData, setReviewData] = useState({
        productQuality: '',
        performance: '',
        bestFeatures: '',
        comment: ''
    })
    return (
        <View>
            <HeaderApp onPress={() => navigation.goBack()} icon='arrow-back' text='Submit' onPressRight={() => { }} />
            {matchProduct.map((data, index) => (
                <View key={index}>
                    <View style={styles.container}>
                        <Card containerStyle={{ width: '20%', margin: 0 }} wrapperStyle={{}}>
                            <CardImage
                                style={{ height: 30, }}
                                resizeMode="contain"
                                source={data.image}
                            />

                        </Card>
                        <View>
                            <Text style={styles.containerText} numberOfLines={1}>
                                {data.title}
                            </Text>
                            <Text style={styles.containerText2}>
                                Variation: {productColor} - {productSize}
                            </Text>
                        </View>
                    </View>
                    <Divider />
                    <View style={styles.container2}>
                        <TouchableOpacity style={styles.reviewImage}>
                            <Text>
                                upload image
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.inputContainer}>
                            <View style={styles.inputContainer2}>
                                <Text>Product Quality:</Text>
                                <TextInput
                                    placeholder='Type Here'
                                    style={styles.input}
                                    onChangeText={(text) => setReviewData({ ...reviewData, productQuality: text })}
                                    value={reviewData.productQuality}
                                />
                            </View>
                            <View style={styles.inputContainer2}>
                                <Text>Performance:</Text>
                                <TextInput
                                    placeholder='Type Here'
                                    style={styles.input}
                                    onChangeText={(text) => setReviewData({ ...reviewData, performance: text })}
                                    value={reviewData.performance}
                                />
                            </View>
                            <View style={styles.inputContainer2}>
                                <Text>Best Features:</Text>
                                <TextInput
                                    placeholder='Type Here'
                                    style={styles.input}
                                    onChangeText={(text) => setReviewData({ ...reviewData, bestFeatures: text })}
                                    value={reviewData.bestFeatures}
                                />
                            </View>
                            <Divider />
                            <View style={styles.inputContainerComment}>
                                <Text>Comment:</Text>
                                <TextInput
                                    style={styles.input2}
                                    onChangeText={(text) => setReviewData({ ...reviewData, comment: text })}
                                    value={reviewData.comment}
                                    multiline
                                    numberOfLines={8}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    containerText: {
        marginLeft: 10,
        width: "80%",
        fontWeight: 'bold'
    },
    containerText2: {
        marginLeft: 10,
        marginTop: 5,
        width: "80%",
    },
    container2: {
        padding: 10,
    },
    reviewImage: {
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'flex-start',
        height: 80,
        width: 150,
        margin: 15
    },
    inputContainer: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10
    },
    inputContainer2: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputContainerComment: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    input: {
        marginLeft: 5,
        width: '70%'
    },
    input2: {
        marginLeft: 5,
        width: '95%'
    },
})