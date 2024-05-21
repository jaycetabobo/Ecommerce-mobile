import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screen/Authentication/login';
import Signup from '../Screen/Authentication/signup';
import Signup2 from '../Screen/Authentication/signup2';

const Stack = createStackNavigator();

export default function AuthRoutes() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Signup" component={Signup} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Signup2" component={Signup2} options={{
                headerShown: false,
            }} />
        </Stack.Navigator>
    );
}