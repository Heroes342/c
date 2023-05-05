import React from "react";
import { View, Text, StyleSheet, Image, Button, Linking } from "react-native";
import { ScreenFC } from "../models/ScreenFC";
import { Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { removeBookmark } from "../redux/actions/bookmarkActions";
import { addBookmark } from "../redux/actions/bookmarkActions";
import { BookmarkProps } from "../redux/actions/bookmarkActions";

const DetailScreen: ScreenFC<"Detail"> = ({ route, navigation }) => {
  const { data } = route.params;
  const { bookmarks } = useSelector(
    (state: { bookmarkReducer: BookmarkProps }) => state.bookmarkReducer
  );

  const dispatch = useDispatch();
  var isFavorite = false;
  if (data) {
    isFavorite = bookmarks.some(
      (bookmark) =>
        bookmark.id.value + bookmark.id.name === data.id.value + data.id.name
    );
  }
  const supportedURL = "https://google.com";

  const handlePress = async () => {
    const supported = await Linking.canOpenURL(supportedURL);
    if (supported && data) {
      await Linking.openURL(supportedURL);
      await Linking.openSettings();
      await Linking.openURL(data.email);
      await Linking.openURL(data.phone);
    }
  };

  const handleToggleFavorite = () => {
    if (data) {
      if (isFavorite) {
        dispatch(removeBookmark(data.id.value + data.id.name));
      } else {
        dispatch(addBookmark(data));
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: data?.picture.large }} style={styles.image} />
      <View style={styles.row}>
        <Icon name="user" color="white" type="font-awesome" />
        <Text style={styles.label}>Full name:</Text>
        <Text style={styles.value}>
          {data?.name.first + " " + data?.name.last}
        </Text>
      </View>
      <View style={styles.row}>
        <Icon name="calendar" color="white" type="font-awesome" />
        <Text style={styles.label}>Date of birth:</Text>
        <Text style={styles.value}>
          {data?.dob.date.split("T")[0].split("-").reverse().join("/")}
        </Text>
      </View>
      <View style={styles.row}>
        <Icon name="map-marker" color="white" type="font-awesome" />
        <Text style={styles.label}>Location:</Text>
        <Text style={styles.value}>{data?.location.city}</Text>
      </View>
      <View style={styles.row}>
        <Icon
          name="envelope"
          color="white"
          onPress={handlePress}
          type="font-awesome"
        />
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{data?.email}</Text>
      </View>
      <View style={styles.row}>
        <Icon
          name="phone"
          color="white"
          onPress={handlePress}
          type="font-awesome"
        />
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{data?.phone}</Text>
      </View>
      <View style={styles.row}>
        <Icon name="globe" color="white" type="font-awesome" />
        <Text style={styles.label}>Nationality:</Text>
        <Text style={styles.value}>{data?.nat}</Text>
      </View>
      <View style={styles.row}>
        <Icon
          name="heart"
          color={isFavorite ? "red" : "gray"}
          onPress={handleToggleFavorite}
          type="font-awesome"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#292a39",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#f06616",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 50,
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10,
    fontWeight: "bold",
    marginVertical: 5,
    color: "#e87c3d",
    alignSelf: "flex-start",
  },
  value: {
    fontSize: 18,
    marginVertical: 5,
    color: "#9dafb9",
    alignSelf: "flex-start",
  },
  row: {
    margin: 10,
    flexDirection: "row",
  },
});

export default DetailScreen;
