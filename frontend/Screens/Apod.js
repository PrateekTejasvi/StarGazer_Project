import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { useRoute } from "@react-navigation/native";

const Apod = () => {
  const { params: heading } = useRoute;
  return (
    <View style={tw`flex-1 flex-row`}>
      <Text>{heading}</Text>
    </View>
  );
};

export default Apod;

const styles = StyleSheet.create({});
