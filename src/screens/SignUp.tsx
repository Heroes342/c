import { Button, Text, TextInput, View, StyleSheet,Image } from "react-native";
import { ScreenFC } from "../models/ScreenFC";
import { useDispatch } from "react-redux";
import { signUp } from "../redux/actions/accountActions";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from "expo-image-picker";
import React, { useState, useMemo } from "react";

const SignUp: ScreenFC<"SignUp"> = ({ navigation }) => {
  const [email, setEmail] = useState<string>();
  const [calendar, setCalendar] = useState(false)
  const [password, setPassword] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [nat, setNat] = useState<string>();
  const [dob, setDob] = useState<Date | null>();
  const [name, setName] = useState<string>();
  const [city, setCity] = useState<string>();
  const [image, setImage] = useState<string>()

  const dispatch = useDispatch();

  const datePicker = useMemo(() => {
    return (
      <DateTimePicker
          value={dob ? new Date(dob) : new Date()}
          mode="date"
          display="spinner"
          onChange={(event, date) => {setDob(date ? date : null); setCalendar(!calendar)}}
        />
    );
  }, [dob, calendar]);

  const showPicker = () => {
    setCalendar(true);
  };

  const pickImage = async () => {
    ImagePicker.requestMediaLibraryPermissionsAsync
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

  ImagePicker.requestMediaLibraryPermissionsAsync()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrati</Text>
      <Image source={{ uri: image }} style={styles.image} />
      <Button title="Choice photo" color="#292a39" onPress={pickImage} />
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        onChangeText={(value) => setName(value)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(value) => setPassword(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        onChangeText={(value) => setPhone(value)}
      />
      <Text>Date of birth: {dob instanceof Date && dob.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" })}</Text>
        <Button title="Choose date" onPress={showPicker} />
        {calendar && datePicker}
      <TextInput
        style={styles.input}
        placeholder="City"
        onChangeText={(value) => setCity(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nationality"
        onChangeText={(value) => setNat(value)}
      />
      <Button
        title="Registrati"
        color="red"
        onPress={() => {
          if (email && password && name && city && phone && nat && dob && image) {
            dispatch(
              signUp({
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
          }
        }}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>Hai un account?</Text>
        <Button title="Accedi" onPress={() => navigation.navigate("Login")} />
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 50,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  datePicker: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
});
