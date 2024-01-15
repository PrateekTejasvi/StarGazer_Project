import { StyleSheet, Text, View ,SafeAreaView,} from 'react-native'
import React,{useLayoutEffect,useState} from 'react'
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Icon,Input} from 'react-native-elements';


const Profile = () => {
   const [email,setEmail] = useState(""); 
   const [password,setPassword] = useState("");
   const [location,setLocation] = useSTate("");
     const navigation = useNavigation();
    useLayoutEffect(() => {
      navigation.setOptions({
          headerBackTitle:"Home",
      });
  },[navigation]);
  const register = () => { 
    console.log("this is a test")
  }
  return (
    <SafeAreaView>
    
      <View style={styles.inputContainer}>
                <Input placeholder='Full Name' autoFocus type='text' value={name} onChangeText={(text)=>setName(text)} />
                <Input placeholder="Email" type='email' value={email} onChangeText={(text) => setEmail(text)} autoCapitalize={false} />
                <Input placeholder="Phone No:" type="number" value={Phone }onChangeText={(text)=>SetPhone(text)} />
                <Input placeholder="Password" type="password" value={password} secureTextEntry onChangeText={(text)=>setPassword(text)} onSubmitEditing={register} autoCapitalize={false} />
            </View>
            <TouchableOpacity style={{padding:2,wdith:30,marginTop:4}} onPress={() => {Linking.openURL('https://google.com/')}}> 
            <Text>Privacy Policy</Text>
            </TouchableOpacity>
            
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'left',
    justifyContent: 'center',
    
    backgroundColor: 'white',
 
},
inputContainer:{
    width:300, 

},
text :{
    paddingTop:10,
    paddingBottom:10,
    color:'white', 
    fontWeight:'bold',
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
    fontSize:17
},

}) 