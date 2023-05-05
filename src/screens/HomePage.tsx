import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, FlatList, StyleSheet, SafeAreaView, Text } from "react-native";
import Card from "../components/Card";
import { CustomScreenFC, ScreenFC } from "../models/ScreenFC";
import { Data } from "../models/Data";

const HomePage: CustomScreenFC<"Home"> = ({ navigation }) => {
  const [people, setPeople] = useState<Array<Data>>([]);

  useEffect(() => {
    getData();
    const interval = setInterval(() => {
      getData();
    }, 120000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const getData = async () => {
    const response = await fetch("https://randomuser.me/api/?results=24&seed=contactgram&nat=us,fr,gb&exc=login,registered&noinfo");
    const data = await response.json();
    const peopleMap = new Map<string, Data>();
    data.results.forEach((person: Data) => {
      if (!peopleMap.has(person.id.value)) {
        peopleMap.set(person.id.value, person);
      }
    });
    setPeople(Array.from(peopleMap.values()));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <StatusBar style="auto" />
      {people.length > 1 ? (
        <FlatList
          style={styles.cardContainer}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          data={people}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Card
              item={item}
              index={index}
              onPress={() => {
                navigation.navigate("Detail", {
                  id:
                    item.id.value + item.id.name
                      ? (item.id.value + item.id.name).toString()
                      : "",
                  data: item,
                });
              }}
            />
          )}
        />
      ) : (
        <View style={styles.cardContainer}>
          <Text>No result</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: "#292a39",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    paddingVertical: 10,
    alignContent: "center",
    marginBottom: 0,
    marginHorizontal: "5%",
  },
});

export default HomePage;
