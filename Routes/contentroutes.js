import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screen/Content/home';
import ProductList from '../Screen/Content/ProductList';
import Product from '../Screen/Content/Product';
import Review from '../Screen/Content/Review';

const Stack = createStackNavigator();

export default function ContentRoutes() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="ProductList" component={ProductList} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Product" component={Product} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Review" component={Review} options={{
                headerShown: false,
            }} />
        </Stack.Navigator>
    );
}