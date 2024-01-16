import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Card, Icon } from "react-native-elements";
import tw from "twrnc";
import {
  getStorage,
  ref,
  getDownloadURL,
  
  getMetadata,
} from "firebase/storage";


const ImageCard = ({ file_name}) => {
 const [Url, setUrl] = useState('');
  const [Type,setType] = useState('');
  const [Time,setTime] = useState('');
  const storage = getStorage();
  const FileRef = ref(storage, 'APOD/' + `${file_name}`);
  getDownloadURL(FileRef).
        then((url) =>{
            setUrl(url)
        } 
  )
    useEffect(()=>{
        getMetadata(FileRef). 
            then((type)=>{
                setType(type.contentType)
                setTime(type.timeCreated)
            })

    },[])
  
 
  return (
      <View style={tw`flex-1  items-center justify-center`}>
      <TouchableOpacity onPress={() => Linking.openURL(Url)} style={tw.style('pt-4 items-center justify-center')}>
        <Card containerStyle={styles.Card}>
          <Card.Title style={tw.style('font-bold  text-black text-center px-2')}>{file_name}</Card.Title>
          <Image source={{uri:Url}} style={{height:200,width:300}} />
           <Card.FeaturedSubtitle style={tw.style('text-gray-400 text-xs pr-20 text-center px-2 font-bold pt-5')}>Click to open in browser</Card.FeaturedSubtitle>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  Card: {
    height: 400,
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
