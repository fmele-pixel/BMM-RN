import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from "@expo/vector-icons/AntDesign";
import HomeStack from "../navigation/HomeStack";
import NuevoPosteo from "../screen/newpost/newpost";
import Profile from "../screen/Profile/Profile";

const Tab = createBottomTabNavigator();

export default function HomeMenu() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Inicio"
        component={HomeStack}
        options={{
          tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
        }}
      />

      <Tab.Screen
        name="Crear"
        component={NuevoPosteo}
        options={{
          tabBarIcon: () => <AntDesign name="pluscircleo" size={24} color="black" />,
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarIcon: () => <AntDesign name="user" size={24} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
}