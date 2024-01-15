import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  ImageBackground,
} from "react-native";
import React from "react";
import NavOptions from "../Components/NavOptions";
import tw from "twrnc";
import { useNavigation, useRoute } from "@react-navigation/native";

const Home = () => {
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
