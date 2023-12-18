import {
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Card, Icon } from "react-native-elements";
import tw from "twrnc";
import {
  setPersistence,
  GoogleAuthProvider,
  browserSessionPersistence,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home", { email: user.email });
      }
    });

    return unsubscribe;
  }, []);
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      const provider = new GoogleAuthProvider();
      return signInWithEmailAndPassword(auth, email, password);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
        toast.success("Logged in", { position: "bottom-right", theme: "dark" });
      })
      .catch((error) =>
        toast.error("Wrong Credentials", {
          position: "top-right",
          theme: "dark",
        }),
      );
  };

  return (
    <SafeAreaView style={tw.style("items-center justify-center bg-black")}>
      <View style={tw`items-center justify-center`}>
        <Image
          style={tw`h-60 w-100`}
          source={require("../assets/constellations.jpg")}
        />
        <Text
          style={tw.style("text-xl text-white font-bold text-center pt-5 ", {
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
                value={email}
                onChangeText={(text) => setEmail(text)}
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
}

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
/*
 onAuthStateChanged(auth2, (user) => {
    let perms = user.email.slice(email.indexOf('@') + 1);
    
    console.log(perms)
    if(perms === "gmail.com"){
      setAccess(perms)
      console.log(access)
    }
    else if (perms === "unsc.com"){
      setAccess('unsc') 

    }
    else if(perms === "ls.com"){
      setAccess('ls') 

    }
    else if(perms === "unhrc.com"){
      setAccess('unhrc')
    }
    else if(perms==="disec.com"){
      setAccess('disec')
    }
  });
*/
