import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screen/Authentication/login';

const Stack = createStackNavigator();

export default function AuthRoutes() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{
                headerShown: false,
            }} />
        </Stack.Navigator>
    );
}