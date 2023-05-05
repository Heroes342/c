import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { CustomScreenFC } from "../models/ScreenFC";
import dev from "../../assets/dev.png";

const InfoScreen: CustomScreenFC<"Info"> = () => {
  return (
    <View style={styles.container}>
      <Image source={dev} style={styles.image} />
      <Text style={styles.text}>Name: Kevin</Text>
      <Text style={styles.text}>Surname: Lagona</Text>
      <Text style={styles.text}>Privacy Policy: ...</Text>
    </View>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#292a39",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f06616",
    marginVertical: 10,
  },
});
