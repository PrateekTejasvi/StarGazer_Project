import {
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Card, Icon } from "react-native-elements";
import tw from "twrnc";
import Ionicons from "react-native-vector-icons/Ionicons";


const ExpCard = ({file_name}) => {
    let title = file_name.replace('.jpg','')
    const [exp,setExp] = useState("");
    const [date,setDate] = useState("");
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
};
useEffect(() => {
fetch("http://localhost:5000/request/APOD/getExp", requestOptions)
.then(response => response.text())  
.then((p) => setExp(p))
.catch(error => console.log('error', error));



},[])
useEffect(() => {
fetch("http://localhost:5000/request/APOD/date", requestOptions)
.then(response => response.text())  
.then((p) => setDate(p))
.catch(error => console.log('error', error));


},[])

  return (
          <SafeAreaView style={tw.style("items-center justify-center")}>
        <View style={tw`items-center pt-3`}>
          <Card containerStyle={styles.Login}>
            <View style={tw`items-center`}>
               <Card.FeaturedTitle style={tw`font-bold text-xl text-black`}>
                   {title}
               </Card.FeaturedTitle>
               <Card.FeaturedSubtitle style={tw`font-bold text-gray-400`}>
                   {date}
               </Card.FeaturedSubtitle>
               <View style={tw`items-center justify-center`}>
                   <Text style={tw`font-bold text-black`}>
                       {exp}
                   </Text>
                   
               </View>
            </View>
          </Card>
        </View>
      </SafeAreaView>
  )
}

export default ExpCard

const styles = StyleSheet.create({
    expCard: {
    height: 450,
    width: 700,
    borderRadius: 40,
    shadowOffset: { width: 0, height: 40 },
    elevation: 40,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    borderColor: "#BDBDBD",
    borderWidth: 0.5,
    paddingBottom: 10,
  },
})