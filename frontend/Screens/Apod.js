import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Apod = () => {
  const navigation = useNavigation();
  return (
    <View style={tw`flex-1 flex-row justify-center pt-5`}>
      <View style={{alignItems:'flex-start'}}>
      <TouchableOpacity style={tw.style('px-4')} onPress={()=>navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={25}/>
      </TouchableOpacity>
      </View>
      <View style={tw`flex-row`}>
        <Text style={tw.style('font-bold text-xl items-center justify-center')}>Astronomy picture of the day!</Text> 
      </View>
    </View>
  );
};

export default Apod;

const styles = StyleSheet.create({});
