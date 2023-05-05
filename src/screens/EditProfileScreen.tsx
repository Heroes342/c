import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, Image } from "react-native";
import { CustomScreenFC } from "../models/ScreenFC";
import { useDispatch, useSelector } from "react-redux";
import { AccountProps } from "../redux/actions/accountActions";
import { Icon } from "react-native-elements";
import { edit } from "../redux/actions/accountActions";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";

const EditProfileScreen: CustomScreenFC<"EditProfile"> = ({ navigation }) => {
  const dispatch = useDispatch();

  const { account } = useSelector(
    (state: { accountReducer: AccountProps }) => state.accountReducer
  );

  const [calendar, setCalendar] = useState(false);
  const [name, setName] = useState(account.name);
  const [password, setPassword] = useState<string>("");
  const [dob, setDob] = useState(account.dob);
  const [city, setCity] = useState(account.city);
  const [email, setEmail] = useState(account.email);
  const [phone, setPhone] = useState(account.phone);
  const [nat, setNat] = useState(account.nat);
  const [image, setImage] = useState<string>(account.image);

  const showPicker = () => {
    setCalendar(true);
  };

  const pickImage = async () => {
    ImagePicker.requestMediaLibraryPermissionsAsync;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.assets) {
      setImage(result.assets[0].uri);
    }
  };

  ImagePicker.requestMediaLibraryPermissionsAsync();

  const handleSubmit = () => {
    dispatch(
      edit({
        email,
        password,
        name,
        city,
        phone,
        nat,
        image,
        dob,
        isLogged: true,
      })
    );
    navigation.navigate("Profile");
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Button title="Choice photo" color="#292a39" onPress={pickImage} />
      <View style={styles.row}>
        <Icon name="user" color="white" type="font-awesome" />
        <Text style={styles.label}>Full name:</Text>
        <TextInput
          style={styles.value}
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.row}>
        <Icon name="calendar" color="white" type="font-awesome" />
        <Text style={styles.label}>Date of birth:</Text>
        <Text style={styles.value}>
          {dob instanceof Date &&
            dob.toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
        </Text>
        <Button title="Choose date" onPress={showPicker} />
        {calendar && (
          <DateTimePicker
            value={dob ? new Date(dob) : new Date()}
            mode="date"
            display="spinner"
            onChange={(event, date) => {
              setDob(date ? date : null);
              setCalendar(false);
            }}
          />
        )}
      </View>
      <View style={styles.row}>
        <Icon name="map-marker" color="white" type="font-awesome" />
        <Text style={styles.label}>Location:</Text>
        <TextInput
          style={styles.value}
          value={city}
          onChangeText={(text) => setCity(text)}
        />
      </View>
      <View style={styles.row}>
        <Icon name="key" color="white" type="font-awesome" />
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.value}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.row}>
        <Icon name="envelope" color="white" type="font-awesome" />
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.value}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.row}>
        <Icon name="phone" color="white" type="font-awesome" />
        <Text style={styles.label}>Phone:</Text>
        <TextInput
          style={styles.value}
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
      </View>
      <View style={styles.row}>
        <Icon name="globe" color="white" type="font-awesome" />
        <Text style={styles.label}>Nationality:</Text>
        <TextInput
          style={styles.value}
          value={nat}
          onChangeText={(text) => setNat(text)}
        />
      </View>
      <Button title="Save changes" onPress={handleSubmit} />
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

export default EditProfileScreen;
