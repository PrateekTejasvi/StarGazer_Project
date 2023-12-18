import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Text,
  ImageBackground,
} from "react-native";
import React from "react";
import NavOptions from "../Components/NavOptions";
import tw from "twrnc";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Icon } from "react-native-elements";

const Home = () => {
  const navigation = useNavigation();

  const {
    params: { email },
  } = useRoute();
  let perms = email.slice(email.indexOf("@") + 1);
  console.log(perms);

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
            <Text style={tw.style("font-bold text-black", { fontSize: 30 })}>
              Home{" "}
            </Text>
          </View>
          <View style={{ paddingLeft: 10, flex: 1 }}>
            <NavOptions perms={perms} />
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
