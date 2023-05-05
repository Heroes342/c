import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Linking } from "react-native";
import { CustomScreenFC } from "../models/ScreenFC";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "react-native-elements";
import { AccountProps} from "../redux/actions/accountActions";

const ProfileScreen: CustomScreenFC<"Profile"> = ({ navigation }) => {

  const dispatch = useDispatch();

  const { account } = useSelector(
    (state: { accountReducer: AccountProps }) => state.accountReducer
  );

  const [image, setImage] = useState<string>(account.image);

  useEffect(() => {
    setImage(account.image);
  }, [account.image])
  
  const supportedURL = "https://google.com";

  const handlePress = async () => {
    const supported = await Linking.canOpenURL(supportedURL);
    if (supported) {
      await Linking.openURL(supportedURL);
      await Linking.openSettings();
      await Linking.openURL(account.email);
      await Linking.openURL(account.phone);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.row}>
        <Icon name="user" color="white" type="font-awesome" />
        <Text style={styles.label}>Full name:</Text>
        <Text style={styles.value}>
          {account.name}
        </Text>
      </View>
      {account.dob instanceof Date && (<View style={styles.row}>
        <Icon name="calendar" color="white" type="font-awesome" />
        <Text style={styles.label}>Date of birth:</Text>
        <Text style={styles.value}>
          {account.dob.toLocaleDateString()}
        </Text>
      </View>)}
      
      <View style={styles.row}>
        <Icon name="map-marker" color="white" type="font-awesome" />
        <Text style={styles.label}>Location:</Text>
        <Text style={styles.value}>{account.city}</Text>
      </View>
      <View style={styles.row}>
        <Icon name="envelope" color="white" onPress={handlePress} type="font-awesome" />
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{account.email}</Text>
      </View>
      <View style={styles.row}>
        <Icon name="phone" color="white" onPress={handlePress} type="font-awesome" />
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{account.phone}</Text>
      </View>
      <View style={styles.row}>
        <Icon name="globe" color="white" type="font-awesome" />
        <Text style={styles.label}>Nationality:</Text>
        <Text style={styles.value}>{account.nat}</Text>
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


export default ProfileScreen;
