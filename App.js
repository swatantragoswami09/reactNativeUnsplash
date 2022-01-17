import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import axios from "axios";
import { useState, useEffect } from "react";

const { height, width } = Dimensions.get("window");

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);

  const loadWallpapers = () => {
    axios
      .get(
        "https://api.unsplash.com/photos/random?count=30&client_id=thc1hEb-BPWhMDp12Wv8ZfYDoO9QzA9_oxLIFEEY8Wo"
      )
      .then((res) => {
        console.log(res.data);
        setImages(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("request completed");
      });
  };

  useEffect(() => {
    loadWallpapers();
  }, []);
  const renderItem = (image) => {
    return (
      <View style={{ height, width }}>
        <Image
          style={{ flex: 1, height: null, width: null }}
          source={{ uri: image.urls.regular }}
          resizeMode="cover"
        />
      </View>
    );
  };
  return (
    <>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            backgroundColor: "black",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="gray" />
        </View>
      ) : (
        <View style={{ flex: 1, backgroundColor: "black" }}>
          <FlatList
            horizontal
            pagingEnabled
            data={images}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
