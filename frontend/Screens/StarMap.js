import { StyleSheet, Text, View ,SafeAreaView} from "react-native";
import React,{useEffect, useState} from "react";
import tw from "twrnc";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getStorage, ref, listAll } from "firebase/storage";
import StarCard from "./StarCard";


const StarMap = () => {
  const navigation = useNavigation();
 
 const [files, setFiles] = useState([]);
  const [names, setNames] = useState('');
  const storage = getStorage();
  const listRef = ref(storage, 'StarMap/');

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

    <SafeAreaView style={tw`items-center justify-center flex-1`}>
        <View style={tw`flex-1 items-center justify-center`} >
          <View style={{ bottom: 24 }}>
            {files?.map(file => (
              <StarCard key={file} file_name={file.name}/>
            ))}
          </View>
          </View>
    </SafeAreaView>
  );
};

export default StarMap;

const styles = StyleSheet.create({
 
});