import {
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Card, Icon } from "react-native-elements";
import tw from "twrnc";
import { auth } from "../firebase";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");


  const navigation = useNavigation();
  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.update({
        
        });
        var formdata = new FormData();
        formdata.append("email",email)
        formdata.append("password",password)
        var locationForm = new FormData();
        formdata.append("location",location)
        var requestOpts = {
          method :'POST',
          body :formdata,
          redirect:'follow'
        }
        var requestOptsLoctation = {
          method : 'POST',
          body:locationForm,
          redirect:'follow'
        }
      fetch("http://localhost:5000/register", requestOpts)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
      fetch("http://locahost:5000/location",requestOptsLoctation)

      })
      .catch((error) => alert(error.message));
      
  };
  return (
    <SafeAreaView style={tw.style("flex-1 bg-white")}>
      <Animatable.View style={tw`items-center justify-center flex-1`}>
        <Animatable.Image
          style={tw.style("items-center justify-center h-60 w-60 pt-10", {
            top: 10,
          })}
          source={require("../assets/background.jpeg")}
          iterationCount={1}
          animation="slideInUp"
        />
        <Animatable.Text
          animation="slideInUp"
          iterationCount={1}
          style={tw.style("text-xl text-black font-bold text-center pt-10 ", {
            fontSize: 40,
          })}
        >
          Register
        </Animatable.Text>
      </Animatable.View>
      <Animatable.View
        animation="slideInUp"
        iterationCount={1}
        delay={500}
        style={tw`items-center pt-20`}
      >
        <Card containerStyle={styles.Login}>
          <View style={tw`items-center`}>
            <View style={tw`flex-row p-3 pb-4`}>
              <MaterialIcons
                name="mail"
                size={25}
                color="black"
                style={tw`pt-2 pr-2`}
              />

              <TextInput
                style={tw.style("p-3 pt-1 pb-4", {
                  borderBottomWidth: 0.3,
                  width: 300,
                  borderBottomColor: "gray",
                  fontSize: 20,
                })}
                placeholder="Email"
                autoCapitalize="none"
                autoCorrect={false}
                type="email"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>

            <View style={tw`flex-row p-3 pb-4`}>
              <Ionicons
                name="ios-lock-closed"
                size={25}
                color="black"
                style={tw`pt-2 pr-2`}
              />
              <TextInput
                style={tw.style("p-3 pt-2", {
                  borderBottomWidth: 0.3,
                  width: 300,
                  borderBottomColor: "gray",
                  fontSize: 20,
                })}
                placeholder="Password"
                autoCorrect={false}
                secureTextEntry={true}
                type="pasword"
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            <View style={tw`flex-row p-3 pb-4`}>
              <FontAwesome
                name="location-arrow"
                size={25}
                color="black"
                style={tw`pt-2 pr-2`}
              />
              <TextInput
                style={tw.style("p-3  pt-2", {
                  borderBottomWidth: 0.3,
                  width: 300,
                  borderBottomColor: "gray",
                  fontSize: 20,
                })}
                placeholder="Location-City"
                autoCapitalize="none"
                autoCorrect={false}
                value={location}
                onChangeText={(text) => setLocation(text)}
              />
            </View>
            <Animatable.View
              animation="fadeInUp"
              iterationCount={1}
              delay={650}
            >
              <TouchableOpacity
                style={tw.style("p-3 my-10 items-center bg-black rounded", {
                  width: 250,
                  backgroundColor: "black",
                })}
                onPress={register}
              >
                <Text style={tw.style("font-bold text-xl text-white")}>
                  Register
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>
          <View style={tw`flex-row items-center justify-center pt-5`}>
            <Text style={tw`font-bold text-xs text-gray-400 text-center pb-3`}>
              Existing User?
            </Text>
            <TouchableOpacity
              style={tw`px-2`}
              onPress={() => navigation.navigate("Login")}
            >
              <Text
                style={tw.style("font-extrabold text-center text-black pb-3")}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      </Animatable.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Login: {
    height: 500,
    width: 520,
    borderRadius: 30,
    shadowOffset: { width: 0, height: 40 },
    elevation: 40,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#BDBDBD",
    borderWidth: 0.8,
  },
});
/*
            <Input placeholder='Email'
                placeholderTextColor={"black"} 
                autoFocus={true} autoCapitalize='none' 
                type="email" value={email} onChangeText={(text) => setEmail(text)} />
                <Input placeholder='Password' placeholderTextColor={"black"}
                 autoCapitalize='none' type="Pasword" 
                 secureTextEntry 
                 value={password} onChangeText={(text) => setPassword(text)} />
*/
