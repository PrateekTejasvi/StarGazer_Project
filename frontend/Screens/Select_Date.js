import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import tw from "twrnc";
import { Card, Icon } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';
const Select_Date = () => {
  let [date, setDate] = useState("");
  let [location,setLocation] = useState("")
  const navigation = useNavigation();
  const query = () => {
    var formdata = new FormData();
    formdata.append("location", "Bangalore");
    formdata.append("when", "2024-01-02 23:23");

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    try {

    fetch("http://localhost:5000/request/StarMap", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    }
    finally{
      navigation.navigate("StarMap")
    }

  }

  return (
    <SafeAreaView style={tw.style("items-center justify-center")}>
      <View style={tw`items-center justify-center`}>
        <Image
          style={tw`h-60 w-100`}
          source={require("../assets/constellations.jpg")}
        />
        <Text
          style={tw.style("text-xl text-black font-bold text-center pt-5 ", {
            fontSize: 40,
          })}
        >
          Select Options
        </Text>
      </View>
      <View style={tw`items-center pt-3`}>
        <Card containerStyle={styles.Login}>
          <View style={tw`items-center`}>
            <View style={tw`flex-row p-10`}>
              <Icon
                name="calendar"
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
                placeholder="YYYY-MM-DD HH:MM:SS"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(text) => setDate(text)}
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


            <View style={tw`pt-2`}>
              <TouchableOpacity
                style={tw.style("p-3 my-10 items-center bg-black rounded ", {
                  width: 250,
                  backgroundColor: "black",
                })}
                onPress={query}
              >
                <Text style={tw.style("font-bold text-xl text-white")}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </Card>
      </View>
    </SafeAreaView>

  );
}


export default Select_Date



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