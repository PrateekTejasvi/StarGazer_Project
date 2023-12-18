import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import { Icon, Card } from "react-native-elements";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import FileCard from "./FileCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Animated from "react-native-animatable";
const CardOptions = () => {
  let isSuccess = false;
  const {
    params: { choice, perms },
  } = useRoute();
  const navigation = useNavigation();
  let slice = perms.slice(perms.indexOf(".") - 4, perms.indexOf("."));

  let isDisabled = false;

  const [files, setFiles] = useState([]);
  const [names, setNames] = useState("");

  const storage = getStorage();
  const listRef = ref(storage, `${choice}/`);

  useEffect(() => {
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          console.log(folderRef);
        });
        setFiles(res.items);
        res.prefixes.forEach((itemsRef) => {
          setNames(itemsRef.name);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    const storage = getStorage();
    const storageRef = ref(storage, `${choice}/` + result.name);
    const metadata = {
      contentType: result.mimeType,
    };
    const uploadTask = uploadBytesResumable(storageRef, result.file, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        isSuccess = true;
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        isSuccess = false;
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          toast.success("success", { theme: "dark", position: "bottom-right" });
          navigation.navigate(`${choice}`);
        });
      },
    );
  };
  let no_files = false;
  if (files.length === 0) {
    no_files = true;
  }
  const notify = () => toast.success("success", { position: "bottom-right" });

  return (
    <SafeAreaView style={tw`flex-1 items-center`}>
      <ToastContainer />
      <Animated.View
        iterationCount={1}
        delay={150}
        animation="slideInUp"
        style={tw.style("flex-row pt-5", {
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: Dimensions.get("window").width / 1.1,
        })}
      >
        <TouchableOpacity
          onPress={pickDocument}
          disabled={isDisabled}
          style={{ opacity: !isDisabled ? 1 : 0.8 }}
        >
          <Icon
            size={55}
            name="pluscircle"
            style={tw.style("px-5", { position: "relative" })}
            type="antdesign"
          />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={{ flex: 1, bottom: 45 }}
        iterationCount={1}
        delay={200}
        animation="slideInUp"
      >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={tw`pt-5 z-50 `}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View style={{ bottom: 24 }}>
            {no_files && (
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
            )}
            {files?.map((file) => (
              <FileCard
                key={file}
                choice={choice}
                file_name={file.name}
                file_type={file.type}
              />
            ))}
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

export default CardOptions;

const styles = StyleSheet.create({
  Card: {
    marginTop: 4,
    alignItems: "center",
    borderRadius: 20,
    elevation: 40,
    borderColor: "#BDBDBD",
    justifyContent: "center",
    width: Dimensions.get("window").width / 2,
    backgroundColor: "#0000",
    height: 200,
  },
});
