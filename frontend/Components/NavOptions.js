import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import React, { useEffect } from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-elements";

const NavOptions = ({ perms }) => {
  const navigation = useNavigation();
  console.log(perms);
  return (
    <View
      style={tw.style("flex-1 items-center justify-center", {
        alignSelf: "center",
      })}
    >
      <View
        animation="slideInLeft"
        style={tw`flex-row items-center justify-center pt-10`}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CSc", { choice: "Test", perms: perms })
          }
          style={tw`items-center justify-center`}
        >
          <Card containerStyle={styles.Card}>
            <Card.Title
              style={tw.style("font-bold text-xl text-black text-center", {
                fontSize: 33,
              })}
            >
              Test
            </Card.Title>
            <Card.FeaturedSubtitle
              style={tw.style("text-black  text-xs pr-20 text-center px-2", {
                fontSize: 18,
              })}
            >
              Test1
            </Card.FeaturedSubtitle>
            <Image
              source={require("../assets/constellations.jpg")}
              style={tw.style("h-40 w-64 rounded mx-5", {
                alignSelf: "center",
              })}
            />
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw``}
          onPress={() =>
            navigation.navigate("CSc", { choice: "Test", perms: perms })
          }
        >
          <Card containerStyle={styles.Card}>
            <Card.Title
              style={tw.style("font-bold text-lg text-black text-center", {
                fontSize: 33,
              })}
            >
              Test
            </Card.Title>
            <Card.FeaturedSubtitle
              style={tw.style("text-black text-xs pr-20 text-center px-2", {
                fontSize: 18,
              })}
            >
              Something else here
            </Card.FeaturedSubtitle>
            <Image
              source={require("../assets/constellations.jpg")}
              style={tw.style("h-40 w-64 rounded mx-5", {
                alignSelf: "center",
              })}
            />
          </Card>
        </TouchableOpacity>
      </View>
      <View style={tw`flex-row items-center justify-center pt-5`}>
        <TouchableOpacity
          style={tw`pt-5 items-center`}
          onPress={() =>
            navigation.navigate("CSc", { choice: "BlahBlah", perms: perms })
          }
        >
          <Card containerStyle={styles.Card}>
            <Card.Title
              style={tw.style("font-bold text-lg text-black text-center", {
                fontSize: 33,
              })}
            >
              BlahBlah
            </Card.Title>
            <Card.FeaturedSubtitle
              style={tw.style("text-black text-xs pr-10 text-center px-2", {
                fontSize: 18,
              })}
            >
              Woah{" "}
            </Card.FeaturedSubtitle>
            <Image
              source={require("../assets/constellations.jpg")}
              style={tw.style("h-40 w-64 rounded mx-5 items-center", {
                alignSelf: "center",
              })}
            />
          </Card>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`pt-5 items-center`}
          onPress={() =>
            navigation.navigate("CSc", { choice: "woah", perms: perms })
          }
        >
          <Card containerStyle={styles.Card}>
            <Card.Title
              style={tw.style("font-bold text-lg text-black text-center px-2", {
                fontSize: 33,
              })}
            >
              Woah
            </Card.Title>
            <Card.FeaturedSubtitle
              style={tw.style("text-black text-xs pr-10 text-center px-2", {
                fontSize: 18,
              })}
            >
              ANother something here
            </Card.FeaturedSubtitle>
            <Image
              source={require("../assets/constellations.jpg")}
              style={tw.style(
                "h-40 w-64 rounded mx-20 items-center justify-center",
              )}
            />
          </Card>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default NavOptions;

const styles = StyleSheet.create({
  Card: {
    marginTop: 4,
    alignItems: "center",
    borderRadius: 20,
    elevation: 40,
    borderColor: "#00000",
    justifyContent: "center",
    width: Dimensions.get("window").width / 2.5,
    backgroundColor: "white",
    height: 300,
    opacity: 1,
  },
});
