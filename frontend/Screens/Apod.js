import { StyleSheet, Text, View ,SafeAreaView} from "react-native";
import React,{useEffect, useState} from "react";
import tw from "twrnc";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getStorage, ref, listAll } from "firebase/storage";
import ImageCard from "./ImageCard";
import ExpCard from "../Components/ExpCard";
import { Card } from "react-native-elements";

const Apod = () => {
  const navigation = useNavigation();
 
 const [files, setFiles] = useState([]);
  const [names, setNames] = useState('');
  const [data,SetData] = useState([]);
  var formdata = new FormData();
 // formdata.append("selected_date",`${date}`)
  var requestOptions = {
      method: 'GET',
      redirect: 'follow'
};
useEffect(() => {
fetch("http://localhost:5000/request/APOD", requestOptions)
.then(response => response.json())  
.then((p) => SetData(p))
.catch(error => console.log('error', error));


},[])
  const storage = getStorage();
  const listRef = ref(storage, 'APOD/');

  useEffect(() => {
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
        })
        setFiles(res.items)
        res.prefixes.forEach((itemsRef) => {
          setNames(itemsRef.name);
        })

      }).catch((error) => {
        console.log(error)

      })
  }, [])


  return (
    <SafeAreaView style={tw`items-center justify-center`}>
        <View style={tw`flex-1 items-center justify-center`} >
          <View style={{ bottom: 24 }}>
            {files?.map(file => (
              <ImageCard key={file} file_name={file.name}/>
            ))}
          </View>
          <View style={{bottom:10}}>
            {files?.map(file => (
              <ExpCard key={file} file_name={file.name}/>
            ))}  
          </View>
          </View>
    </SafeAreaView>
  );
};

export default Apod;

const styles = StyleSheet.create({
 
});

/*
    <View style={tw`flex-1 flex-row pt-5`}>
      <View style={tw.style('justify-center')}>
      <TouchableOpacity style={tw.style('px-4')} onPress={()=>navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={25}/>
      </TouchableOpacity>
      <View style={tw`flex-row`}>
        <Text style={tw.style('font-bold text-xl items-center justify-center')}>Astronomy picture of the day!</Text> 
      </View>
      </View>
        <View style={tw`flex-1 items-center justify-center`} >
          <View style={{ bottom: 24 }}>
            {files?.map(file => (
              <ImageCard key={file} file_name={file.name}/>
            ))}
          </View>
          </View>
      </View>
*/