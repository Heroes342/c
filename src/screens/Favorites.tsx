import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Modal, TouchableOpacity } from "react-native";
import { CustomScreenFC } from "../models/ScreenFC";
import { useSelector } from "react-redux";
import { Data } from "../models/Data";
import Card from "../components/Card";
import { Icon } from "react-native-elements";
import {
  BookmarkProps,
  removeAllBookmark,
  removeBookmark,
} from "../redux/actions/bookmarkActions";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";

const Favorites: CustomScreenFC<"Favorite"> = ({ navigation }) => {
  const { bookmarks } = useSelector(
    (state: { bookmarkReducer: BookmarkProps }) => state.bookmarkReducer
  );
  const [modalVisible, setModalVisible] = useState(
    new Array(bookmarks.length).fill(false)
  );
  useEffect(() => {
    const newModalVisible = new Array(bookmarks.length).fill(false);
    setModalVisible(newModalVisible);
  }, [bookmarks]);

  const dispatch = useDispatch();

  const showModal = (index: number) => {
    const newModalVisible = [...modalVisible];
    newModalVisible[index] = true;
    setModalVisible(newModalVisible);
  };

  const hideModal = (index: number) => {
    const newModalVisible = [...modalVisible];
    newModalVisible[index] = false;
    setModalVisible(newModalVisible);
  };

  const deletePerson = (item: Data, index: number) => {
    dispatch(removeBookmark(item.id.value + item.id.name));
    hideModal(index);
  };
  return (
    <View
      style={{
        backgroundColor: "#292a39",
        paddingHorizontal: 20,
        flex: 1,
      }}
    >
      {bookmarks.length > 0 ? (
        <View>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              paddingVertical: 20,
            }}
          ></View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {bookmarks?.map((item: Data, index: number) => {
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                  }}
                  onPress={() => {
                    navigation.navigate("Detail", {
                      id:
                        item.id.value + item.id.name
                          ? (item.id.value + item.id.name).toString()
                          : "",
                      data: item,
                    });
                  }}
                  onLongPress={() => showModal(index)}
                >
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible[index]}
                    onRequestClose={() => hideModal(index)}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0,0,0,0.5)",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "white",
                          padding: 20,
                          borderRadius: 10,
                          width: "80%",
                        }}
                      >
                        <Text style={{ fontSize: 16, color: "#f06616" }}>
                          Do you want to delete this person from the favourite?
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                            marginTop: 10,
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              backgroundColor: "red",
                              padding: 10,
                              borderRadius: 5,
                            }}
                            onPress={() => {
                              deletePerson(item, index);
                            }}
                          >
                            <Text style={{ color: "white", fontSize: 14 }}>
                              Yes
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              backgroundColor: "green",
                              padding: 10,
                              borderRadius: 5,
                            }}
                            onPress={() => hideModal(index)}
                          >
                            <Text style={{ color: "white", fontSize: 14 }}>
                              No
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Modal>
                  <Card item={item} index={index} key={index} disabled />
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "space-around",
                      padding: 10,
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Icon
                        name="user"
                        color="white"
                        type="font-awesome"
                        style={{ margin: 10 }}
                      />
                      <Text style={{ color: "white", fontSize: 16 }}>
                        {item.name.first} {item.name.last}
                      </Text>
                    </View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Icon
                        name="phone"
                        color="white"
                        type="font-awesome"
                        style={{ margin: 10 }}
                      />
                      <Text style={{ color: "white", fontSize: 16 }}>
                        {item.phone}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: "#f06616", fontSize: 20 }}>
            No favorites...
          </Text>
        </View>
      )}
    </View>
  );
};

export default Favorites;
