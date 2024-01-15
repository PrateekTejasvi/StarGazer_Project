import { StyleSheet, Text, View } from "react-native";
import Login from "./Screens/Login";
import Home from "./Screens/Home";
import Profile from "./Screens/Profile";
import Register from "./Screens/Register";
import Apod from "./Screens/Apod";
import Rover from "./Screens/Rover";
import Exp from "./Screens/Exp";
import StarMap from "./Screens/StarMap";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Apod"
            component={Apod}
            options={{ headerShown: false}}
          />
          <Stack.Screen 
            name = "Rover"
            component={Rover}
            options={
              {headerShown:false
            
            
            }}
            />
            <Stack.Screen 
              name ="Exp"
              component={Exp}
              options={{headerShown:false}}/>
            <Stack.Screen 
              name="StarMap"
              component={StarMap}
              options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    alignContent:'center'
  },
});
