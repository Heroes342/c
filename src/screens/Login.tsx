import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { ScreenFC } from "../models/ScreenFC";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/accountActions";

const Login: ScreenFC<"Login"> = ({ navigation }) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accedi</Text>
      <TextInput
        style={styles.input}
        placeholder="email"
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="password"
        onChangeText={(value) => setPassword(value)}
      />
      <Button
        title="Accedi"
        color="blue"
        onPress={() => {
          email &&
            password &&
            dispatch(
              login({
                email,
                password,
                name: "",
                city: "",
                phone: "",
                nat: "",
                image: "",
                dob: null,
                isLogged: true,
              })
            );
        }}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>Non hai un account?</Text>
        <Button
          title="Registrati"
          onPress={() => navigation.navigate("SignUp")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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

export default Login;
