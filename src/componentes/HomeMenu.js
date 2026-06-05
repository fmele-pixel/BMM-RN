import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/home/home";
import Profile from "../screens/Profile/Profile";

import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function HomeMenu() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown:false
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons
              name="home"
              size={size}
              color={color}
            />
          )
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons
              name="person"
              size={size}
              color={color}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}