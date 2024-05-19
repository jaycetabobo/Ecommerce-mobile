import { StyleSheet, Text, View, ScrollView, Dimensions, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Card } from "@rneui/base";
import { CardImage } from '@rneui/base/dist/Card/Card.Image';
import { Data, ProductReview } from '../../productstore';
import { Button, ButtonGroup, Icon, Avatar, Rating } from '@rneui/themed';
import { ToggleButton } from 'react-native-paper';
import HeaderApp from '../../Components/header';
import Toast from 'react-native-toast-message';
import axios from '../../axios';
import { imagehttp } from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { CART } from './reducer/cartSlice';

const { width, height } = Dimensions.get('window')

export default function Product({ route, navigation }) {
    const [userData, setUserData] = useState(null);
    const [data, setData] = useState(null);
    const [dataReview, setDataReview] = useState(null);
    const [carts, setCarts] = useState(null)
    const productId = route.params.id;
    const userID = userData ? userData.id : '';
    // const matchProduct = data.filter(data => data.id === productId);
    const matchReview = dataReview ? dataReview.filter(review => review.product.id === productId) : [];
    const [valueSize, setValueSize] = useState('');
    // const dispatch = useDispatch()
    const Tokens = useSelector((state) => state.auth.logInToken)
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            axios.get('reviews/').then((response) => setDataReview(response.data)
            ).catch((error) => console.log(error))
            // console.log(data)
            setRefreshing(false);
        }, 1000);
    }, []);
    const getCarts = async () => {
        await axios.get('carts/').then((response) => setCarts(response.data)
        ).catch((error) => console.log(error))
    }
    useEffect(() => {
        getCarts()
    }, []);

    useEffect(() => {
        axios.get('auth/users/me/', {
            headers: {
                'Authorization': `Token ${Tokens}`
            }
        }).then((response) => {
            setUserData(response.data)
        }
        ).catch((error) =>
            console.log(error)

        )
    }, [Tokens]);


    useEffect(() => {
        axios.get(`products/${productId}`).then((response) => setData(response.data)
        ).catch((error) => console.log(error))
    }, []);

    useEffect(() => {
        axios.get('reviews/').then((response) => setDataReview(response.data)
        ).catch((error) => console.log(error))
    }, []);



    const handleReviewClick = (userid, productid, size) => {
        if (valueSize === '') {
            Toast.show({
                type: 'error',
                text1: 'Please select a Size for the Product',
                autoHide: true,
                visibilityTime: 3000
            });
        } else {
            navigation.navigate('Review', { userid, productid, size })
        }
        setValueSize('')
    }

    const handleAddToCart = (userId, size, carts) => {
        getCarts()
        if (valueSize === '') {
            Toast.show({
                type: 'error',
                text1: 'Please select a Size for the Product',
                autoHide: true,
                visibilityTime: 3000
            });
            return; // Early exit if size is not selected
        }


        const existingCartItem = carts.find(
            cart => cart.product === productId && cart.size === size && cart.user === userID
        );


        if (existingCartItem) {
            // Determine the stock based on the selected size
            let stock;
            if (size === 'Small') {
                stock = data.stock_small_size;
            } else if (size === 'Medium') {
                stock = data.stock_medium_size;
            } else if (size === 'Large') {
                stock = data.stock_large_size;
            }

            // Check if the quantity in cart is less than stock
            if (existingCartItem.quantity < stock) {
                // Patch existing cart item quantity
                axios.patch(`carts/${existingCartItem.id}/`, {
                    quantity: existingCartItem.quantity + 1
                })
                    .then((response) => {
                        Toast.show({
                            type: 'success',
                            text1: 'Product Quantity Updated Successfully',
                            autoHide: true,
                            visibilityTime: 3000
                        });

                    })
                    .catch((error) => {
                        console.error('Error patching cart item:', error);
                        // Handle error appropriately, e.g., display an error message to the user
                    });
            } else {
                Toast.show({
                    type: 'error',
                    text1: `stock limit of ${size} is reached`,
                    autoHide: true,
                    visibilityTime: 3000
                });
            }
        } else {
            // Create new cart item if no existing match
            // Here, you should also check if the stock for the selected size is 0
            let stock;
            if (size === 'Small') {
                stock = data.stock_small_size;
            } else if (size === 'Medium') {
                stock = data.stock_medium_size;
            } else if (size === 'Large') {
                stock = data.stock_large_size;
            }

            if (stock === 0) {
                Toast.show({
                    type: 'error',
                    text1: `The stock for ${size} is currently unavailable`,
                    autoHide: true,
                    visibilityTime: 3000
                });
                return; // Early exit if stock is 0
            }

            axios.post('carts/', {
                size: size,
                quantity: 1,
                user: userId,
                product: productId
            })
                .then((response) => {
                    Toast.show({
                        type: 'success',
                        text1: 'Product Added Successfully',
                        autoHide: true,
                        visibilityTime: 3000
                    });
                })
                .catch((error) => {
                    Toast.show({
                        type: 'error',
                        text1: 'Please select a size',
                        autoHide: true,
                        visibilityTime: 3000
                    });
                });

        }

        setValueSize('');
    };

    return (
        <View>
            <HeaderApp onPress={() => navigation.navigate('ProductList')} icon='arrow-back' icon2='shopping-cart' onPressRight={() => navigation.navigate('Cart')} />
            {data ? (
                <View style={styles.container}>
                    <View >
                        <ScrollView style={{ height: "85%" }} refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }>
                            <Card containerStyle={{ borderRadius: 20, margin: 50, marginTop: 20, marginBottom: 40 }} wrapperStyle={{}}>
                                <CardImage
                                    style={{ width: "100%", height: 200, marginBottom: 10 }}
                                    resizeMode="contain"
                                    source={{ uri: `${imagehttp}${data.images}` }}
                                />
                            </Card>
                            <View>
                                <Text style={styles.text1}>
                                    {data.product_name}
                                </Text>
                                <Text style={styles.text2}>
                                    ₱ {data.price}
                                </Text>
                                <Text style={styles.text3} >
                                    {data.description}
                                </Text>
                                {/* <Text style={styles.text4}>Color:</Text>
                                <ToggleButton.Row onValueChange={value => setValueColor(value)} value={valueColor}>
                                    <ToggleButton icon="circle" value="Black" iconColor='black' style={{ width: 80 }} />
                                    <ToggleButton icon="circle" value="White" iconColor='white' style={{ width: 80 }} />
                                    <ToggleButton icon="circle" value="Green" iconColor='green' style={{ width: 80 }} />
                                    <ToggleButton icon="circle" value="Blue" iconColor='blue' style={{ width: 80 }} />
                                </ToggleButton.Row> */}
                                <Text style={styles.text4}>Size:</Text>
                                <ToggleButton.Row onValueChange={value => setValueSize(value)} value={valueSize}>
                                    <ToggleButton icon={() => <View><Text>Small</Text></View>} value="Small" style={{ width: 80 }} />
                                    <ToggleButton icon={() => <View><Text>Medium</Text></View>} value="Medium" style={{ width: 80 }} />
                                    <ToggleButton icon={() => <View><Text>Large</Text></View>} value="Large" style={{ width: 80 }} />
                                </ToggleButton.Row>
                            </View>
                            <View style={styles.seller}>
                                <Text style={styles.sellerText}>Seller: {data.user.first_name} {data.user.last_name}</Text>
                                {/* <Button
                                    title="View Seller"
                                    loading={false}
                                    loadingProps={{ size: 'small', color: 'white' }}
                                    buttonStyle={{
                                        backgroundColor: 'white',
                                        borderRadius: 7,
                                        borderColor: "black",
                                        borderWidth: 2,
                                        padding: 0,
                                        paddingVertical: 5
                                    }}
                                    titleStyle={{ color: "black" }}
                                    containerStyle={{
                                    }}
                                    onPress={() => console.log(cart)}
                                /> */}
                            </View>

                            {dataReview ? (
                                <View style={styles.reviewContainer}>
                                    <Text style={styles.reviewTextBanner}>
                                        Product Reviews
                                    </Text>
                                    {matchReview.length > 0 ? (
                                        matchReview.map((review, index) => (
                                            <View key={index} style={styles.reviewComment}>
                                                <Text style={styles.reviewCommentText}>
                                                    Customer: {review.user.first_name} {review.user.last_name}
                                                </Text>
                                                {/* <Rating
                                        fractions={0}
                                        imageSize={70}
                                        minValue={0}
                                        onFinishRating={(newRating) => {
                                            setRating(newRating);
                                            console.log("New rating:", newRating)
                                        }
                                        }
                                        onStartRating={() => console.log("onStartRating()")}
                                        ratingBackgroundColor="#FFF"
                                        ratingColor="#FF0"
                                        ratingCount={5}
                                        ratingImage="star"
                                        ratingTextColor="#222"
                                        reviews={[
                                            "Terrible",
                                            "Bad",
                                            "Okay",
                                            "Good",
                                            "Great"
                                        ]}
                                        showRating
                                        startingValue={rating}
                                        style={{}}
                                        type="star"
                                    /> */}
                                                <Text >
                                                    Variation: {review.variation}
                                                </Text>
                                                <Card containerStyle={{ width: '50%', margin: 0, marginTop: 10 }} wrapperStyle={{}}>
                                                    <CardImage
                                                        style={{ height: 90, marginBottom: 10, }}
                                                        resizeMode="contain"
                                                        source={{ uri: `${imagehttp}${data.image}` }}
                                                    />
                                                </Card>
                                                <Text style={styles.reviewCommentText2} >
                                                    Product Quality: {review.productQuality}
                                                </Text>
                                                <Text style={styles.reviewCommentText2}>
                                                    Performance: {review.performance}
                                                </Text>
                                                <Text style={styles.reviewCommentText2}>
                                                    Best Features: {review.bestFeatures}
                                                </Text>
                                                <Text style={styles.reviewCommentText2}>
                                                    Comments:
                                                </Text>
                                                <Text>
                                                    {review.review}
                                                </Text>
                                                <Text style={styles.reviewCommentText2}>
                                                    {review.date} {review.time}
                                                </Text>
                                            </View>
                                        ))
                                    ) : (
                                        <Text >No reviews available for this product.</Text>
                                    )}
                                </View>
                            ) : (
                                <Text>
                                    Loading review data...
                                </Text>
                            )}
                        </ScrollView>
                        {userData ? (
                            <View style={styles.addcartcontainer}>
                                <Button
                                    title="Add Review"
                                    loading={false}
                                    loadingProps={{ size: 'small', color: 'white' }}
                                    buttonStyle={{
                                        backgroundColor: 'white',
                                        borderRadius: 7,
                                        borderColor: "black",
                                        borderWidth: 2,
                                        padding: 0,
                                        paddingVertical: 5
                                    }}
                                    titleStyle={{ color: 'black' }}
                                    containerStyle={{
                                    }}
                                    onPress={() => handleReviewClick(userData.id, data.id, valueSize)}
                                />
                                {carts ? (
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
                                        onPress={() => handleAddToCart(userData.id, valueSize, [carts])}
                                    />
                                ) : (
                                    <Text>
                                        Loading cart data...
                                    </Text>
                                )}
                            </View>
                        ) : (
                            <Text>
                                Loading user data...
                            </Text>
                        )}
                    </View >

                </View >
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
        padding: 20,
        paddingTop: 0
    },
    text1: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingBottom: 10
    },
    text2: {
        fontSize: 18,
        marginBottom: 10
    },
    text3: {
        fontSize: 15,
    },
    text4: {
        fontSize: 18,
        marginTop: 10
    },
    addcartcontainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    seller: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: 'white',
        paddingVertical: 10,
        borderRadius: 10,
        gap: 60
    },
    sellerText: {
        fontSize: 20,
        marginLeft: 10
    },
    reviewContainer: {
        marginVertical: 10
    },
    reviewTextBanner: {
        fontSize: 20,
        marginBottom: 10
    },
    reviewComment: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 20,
        marginTop: 20
    },
    reviewCommentText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10
    },
    reviewCommentText2: {
        marginTop: 10,
        fontWeight: 'bold',
    }

})