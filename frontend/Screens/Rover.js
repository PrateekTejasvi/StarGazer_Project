import { StyleSheet, Text, View,ScrollView } from "react-native";
import React,{useEffect,useState} from "react";
import tw from "twrnc";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";
import ImageCard from "./ImageCard";
const Rover = () => {
  const navigation = useNavigation();
  const [files, setFiles] = useState([]);
  const [names, setNames] = useState('');

  const storage = getStorage();
  const listRef = ref(storage, '/APOD');
  let no_files = false;
  if (files.length === 0) {
    no_files = true
  }

  useEffect(() => {
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          console.log(folderRef)
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
    <View style={tw`flex-1 flex-row justify-center pt-5`}>
      <View style={{alignItems:'flex-start'}}>
      <TouchableOpacity style={tw.style('px-4')} onPress={()=>navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={25}/>
      </TouchableOpacity>
      </View>
      <View style={tw`flex-row`}>
        <Text style={tw.style('font-bold text-xl items-center justify-center')}>From The various cameras of the mars rovers</Text> 
      </View>
      <View style={tw.style('bg-white h-full')}>
        <ScrollView showsHorizontalScrollIndicator={false} style={tw`pt-5 z-50 `} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <View style={{ bottom: 24 }}>
            {no_files &&
              <View style={tw`items-center justify-center`}>
                <Text style={tw`font-bold text-xl text-center`}>
                  No files found
                </Text>
                <View style={tw`items-center justify-center pt-50 px-10`}>
                  <Text style={tw`font-bold text-xl text-center`}>
                    Click the + to upload your reports
                  </Text>
                </View>
              </View>
            }
            {files?.map(file => (
              <ImageCard key={file} file_name={file.name} file_type={file.type} />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Rover;

const styles = StyleSheet.create({});
