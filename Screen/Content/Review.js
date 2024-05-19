import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import HeaderApp from '../../Components/header';
import { Card } from "@rneui/base";
import { CardImage } from '@rneui/base/dist/Card/Card.Image';
import { Divider } from '@rneui/themed';
import { Data } from '../../productstore';
import Toast from 'react-native-toast-message'
import axios from '../../axios';
import { imagehttp } from '../../axios';

export default function Review({ route, navigation }) {
    const [data, setData] = useState();
    const productId = route.params.productid;
    const userId = route.params.userid
    const productSize = route.params.size;
    // const matchProduct = Data.filter(data => data.id === productId);
    const [reviewData, setReviewData] = useState({
        productQuality: '',
        performance: '',
        bestFeatures: '',
        comment: ''
    })
    useEffect(() => {
        axios.get(`products/${productId}`).then((response) => setData(response.data)
        ).catch((error) => console.log(error))
    }, []);
    const handleSubmit = () => {

        if (reviewData.productQuality === '') {
            Toast.show({
                type: 'error',
                text1: 'Missing Product Quality',
                autoHide: true,
                visibilityTime: 3000
            });
        } else if (reviewData.performance === '') {
            Toast.show({
                type: 'error',
                text1: 'Missing Performance',
                autoHide: true,
                visibilityTime: 3000
            });
        } else if (reviewData.bestFeatures === '') {
            Toast.show({
                type: 'error',
                text1: 'Missing bestFeatures',
                autoHide: true,
                visibilityTime: 3000
            });
        } else if (reviewData.comment === '') {
            Toast.show({
                type: 'error',
                text1: 'Missing comment',
                autoHide: true,
                visibilityTime: 3000
            });
        } else {
            axios.post('reviews/', {
                review: reviewData.comment,
                variation: productSize,
                productQuality: reviewData.productQuality,
                performance: reviewData.performance,
                bestFeatures: reviewData.bestFeatures,
                product: productId,
                user: userId
            })
                .then((response) => {
                    Toast.show({
                        type: 'success',
                        text1: 'Review Posted !!',
                        autoHide: true,
                        visibilityTime: 3000
                    });
                    setReviewData({
                        ...reviewData, productQuality: '',
                        performance: '',
                        bestFeatures: '',
                        comment: ''
                    })
                })
                .catch((error) => {
                    console.error('Error creating cart item:', error);
                    // Handle error appropriately, e.g., display an error message to the user
                });
        }

    }


    return (
        <View>
            <HeaderApp onPress={() => navigation.goBack()} icon='arrow-back' text='Submit' onPressRight={() => handleSubmit()} />
            {data ? (
                <View>
                    <View style={styles.container}>
                        <Card containerStyle={{ width: '20%', margin: 0 }} wrapperStyle={{}}>
                            <CardImage
                                style={{ height: 30, }}
                                resizeMode="contain"
                                source={{ uri: `${imagehttp}${data.image}` }}
                            />

                        </Card>
                        <View>
                            <Text style={styles.containerText} numberOfLines={1}>
                                {data.product_name}
                            </Text>
                            <Text style={styles.containerText2}>
                                Variation: {productSize}
                            </Text>
                        </View>
                    </View>
                    <Divider />
                    <View style={styles.container2}>
                        {/* <TouchableOpacity style={styles.reviewImage}>
                            <Text>
                                upload image
                            </Text>
                        </TouchableOpacity> */}
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
            ) : (
                <Text>
                    Loading product data...
                </Text>
            )}
            <Toast />
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