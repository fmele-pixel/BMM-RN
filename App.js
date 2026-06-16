import Register from './src/screen/register/register';
import Login from './src/screen/login/login';
import HomeMenu from './src/componentes/HomeMenu';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator()
export default function App() {

  return (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Register" component={Register}/>
      <Stack.Screen name="HomeMenu" component={HomeMenu}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}
