import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screen/home/home";
import Comentarios from "../screen/comentario/comentario";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Comentario"
                component={Comentarios}
                options={{ title: "Comentarios" }}
            />
        </Stack.Navigator>
    );
}
