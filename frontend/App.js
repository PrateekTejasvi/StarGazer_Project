import { StyleSheet, Text, View } from "react-native";
import Login from "./Screens/Login";
import Home from "./Screens/Home";
import Profile from "./Screens/Profile";
import Register from "./Screens/Register";
import Apod from "./Screens/Apod";
import Select_Date from "./Screens/Select_Date";
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
            options={{ headerShown: true,headerTitle:'Astronomy Picture of the Day!'}}
          />
         <Stack.Screen 
          name="options"
          component={Select_Date}
          options={{headerShown:false}}
          />
           
            <Stack.Screen 
              name="StarMap"
              component={StarMap}
              options={{headerShown:true,headerTitle:'Generate a star map from a given location and time'}}/>
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
