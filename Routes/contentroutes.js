import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screen/Content/home';
import ProductList from '../Screen/Content/ProductList';
import Product from '../Screen/Content/Product';
import Review from '../Screen/Content/Review';
import Cart from '../Screen/Content/Cart';
import Checkout from '../Screen/Content/Checkout';
import Login from '../Screen/Authentication/login';
import Profile from '../Screen/Content/Profile';
import Ewallet from '../Screen/Content/Ewallet';
import Ewallet2 from '../Screen/Content/Ewallet2';

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
            <Stack.Screen name="Cart" component={Cart} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Checkout" component={Checkout} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Profile" component={Profile} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Ewallet" component={Ewallet} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Ewallet2" component={Ewallet2} options={{
                headerShown: false,
            }} />
        </Stack.Navigator>
    );
}