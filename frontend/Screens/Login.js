import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";

const Login = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={tw.style("font-bold text-black text-xl")}>Login</Text>
    </View>
  );
};

export default Login;
