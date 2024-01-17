import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import React,{useState} from "react";
import NavOptions from "../Components/NavOptions";
import tw from "twrnc";
import { NavigationContainer, useNavigation, useRoute } from "@react-navigation/native";
import { auth} from "../firebase";

const Home = () => {
  const navigation = useNavigation()
  const [out,setOut] = useState(false);
  const Logout = () => {
    auth.signOut()
    .catch(error => {
      console.log(error)
    })
    setOut(true)
  
  }
  if(out){
    navigation.replace("Login")
  }
  return (
    <>
      <SafeAreaView style={tw.style("flex-1 bg-white")}>
        <ImageBackground
          source={"../assets/background.jpeg"}
          resizeMode="cover"
          style={styles.image}
        >
          <View
            style={tw.style("bg-white flex-row items-center justify-center")}
          >
            <Text
              style={tw.style("font-bold text-black pt-5", { fontSize: 30 })}
            >
              Explore!
            </Text>
          </View>
          <View style={{ paddingLeft: 10, flex: 1 }}>
            <NavOptions />
          </View>
        </ImageBackground>

              <View style={tw`pt-2 px-2 items-center justify-center`}>
                <TouchableOpacity
                  style={tw.style("p-3 my-10 items-center bg-black rounded ", {
                    width: 250,
                    backgroundColor: "black",
                  })}
                  onPress={Logout}
                >
                  <Text style={tw.style("font-bold text-xl text-white")}>
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
      </SafeAreaView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
