import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { Card, Icon } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const handleLogin = () => {
    const encodeuser = encodeURIComponent(username);
    const encodepass = encodeURIComponent(password);
    const url = `http://localhost:5000/login/user?username=${encodeuser}&password=${encodepass}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((r) => r.json())
      .then((data) => console.log(data));
  };
  return (
    <SafeAreaView style={tw.style("items-center justify-center bg-black")}>
      <View style={tw`items-center justify-center `}>
        <Image
          style={tw`h-50 w-100`}
          source={require("../assets/constellations.jpg")}
        />

        <Text
          style={tw.style("text-xl text-black font-bold text-center pt-5 ", {
            fontSize: 40,
          })}
        >
          Login
        </Text>
      </View>
      <View style={tw`items-center pt-10`}>
        <Card containerStyle={styles.Login}>
          <View style={tw`items-center`}>
            <View style={tw`flex-row p-10`}>
              <Icon
                name="user"
                type="antdesign"
                size={25}
                color="black"
                style={tw`pt-2 pr-2`}
              />

              <TextInput
                style={tw.style("p-3 pt-1", {
                  borderBottomWidth: 0.3,
                  width: 300,
                  borderBottomColor: "gray",
                  fontSize: 20,
                  outline: "none",
                })}
                placeholder="Username"
                autoCapitalize="none"
                autoCorrect={false}
                type="email"
                value={username}
                onChangeText={(text) => setUsername(text)}
              />
            </View>

            <View style={tw`flex-row`}>
              <Ionicons
                name="ios-lock-closed"
                size={25}
                color="black"
                style={tw`pt-2 pr-2`}
              />
              <TextInput
                style={tw.style("p-3  pt-1", {
                  borderBottomWidth: 0.3,
                  width: 300,
                  borderBottomColor: "gray",
                  fontSize: 20,
                  outline: "none",
                })}
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                type="pasword"
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>

            <View style={tw`pt-2`}>
              <TouchableOpacity
                style={tw.style("p-3 my-10 items-center bg-black rounded ", {
                  width: 250,
                  backgroundColor: "black",
                })}
                onPress={handleLogin}
              >
                <Text style={tw.style("font-bold text-xl text-white")}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  Login: {
    height: 440,
    width: 520,
    borderRadius: 30,
    shadowOffset: { width: 0, height: 40 },
    elevation: 40,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#BDBDBD",
    borderWidth: 0.5,
    paddingBottom: 10,
  },
});
