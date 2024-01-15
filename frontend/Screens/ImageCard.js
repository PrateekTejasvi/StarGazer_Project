import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Card, Icon } from "react-native-elements";
import tw from "twrnc";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  getMetadata,
} from "firebase/storage";


const ImageCard = ({ file_name}) => {
  const [Url, setUrl] = useState("");
  const [Type, setType] = useState("");
  const [Time, setTime] = useState("");
  const storage = getStorage();
  const FileRef = ref(storage, '/APOD' + 'APOD.jpg');
  getDownloadURL(FileRef).then((url) => {
    setUrl(url);
  });
  useEffect(() => {
    getMetadata(FileRef).then((type) => {
      setType(type.contentType);
      setTime(type.timeCreated);
    });
  }, []);
  console.log(Type);
  let isPDF = false;
  if (Type === "application/pdf") {
    isPDF = true;
  }
  return (
    <View style={tw`flex-1  items-center justify-center`}>
      <TouchableOpacity
        onPress={() => Linking.openURL(Url)}
        style={tw.style("pt-4 items-center justify-center")}
      >
        <Card containerStyle={styles.Card}>
          <Card.Title
            style={tw.style("font-bold  text-black text-center px-2")}
          >
            {file_name}
          </Card.Title>
          <Card.FeaturedSubtitle
            style={tw.style(
              "text-gray-400 text-xs pr-20 text-center px-2 font-bold",
            )}
          >
            {Type}
          </Card.FeaturedSubtitle>
          <Card.FeaturedSubtitle
            style={tw.style(
              "text-gray-400 text-xs pr-20 text-center px-2 font-bold",
            )}
          >
            {Time}
          </Card.FeaturedSubtitle>
          <Image
            source={isPDF ? require("../assets/pdf.png") : { uri: Url }}
            style={tw.style("h-35 w-40 rounded mx-5 items-cente", {
              alignSelf: "center",
            })}
          />
          <Icon
            name="addfile"
            type="antdesign"
            size={35}
            color="#FF8F00"
            style={tw`pt-5`}
          />
          <Card.FeaturedSubtitle
            style={tw.style(
              "text-gray-400 text-xs pr-20 text-center px-2 font-bold pt-5",
            )}
          >
            Click to open in browser
          </Card.FeaturedSubtitle>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  Card: {
    marginTop: 4,
    alignItems: "center",
    borderRadius: 20,
    elevation: 40,
    borderColor: "#BDBDBD",
    justifyContent: "center",
    width: Dimensions.get("window").width / 2.4,
    backgroundColor: "#00000",
    alignItems: "center",
    justifyContent: "center",
  },
});
