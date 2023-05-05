import React from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import { Data } from "../models/Data";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import { BookmarkProps } from "../redux/actions/bookmarkActions";

interface Props {
  item: Data;
  index: number;
  disabled?: boolean;
  onPress?: () => void;
}
const Card = ({ item, index, disabled, onPress }: Props) => {
  const { bookmarks } = useSelector(
    (state: { bookmarkReducer: BookmarkProps }) => state.bookmarkReducer
  );
  const isFavorite = bookmarks.some(
    (bookmark) => bookmark.id.value+bookmark.id.name === item.id.value+item.id.name
  );

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      key={item.id.value + item.id.name}
      onPress={onPress}
      disabled={disabled && !onPress}
    >
      <View style={styles.cardContainer}>
        <Image
          source={{
            uri: item.picture.large,
          }}
          style={styles.image}
        />
        <Icon
          name="heart"
          type="font-awesome"
          color={isFavorite ? "red" : "gray"} 
          size={20}
          containerStyle={styles.iconContainer} 
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: "space-between",
    width: 90,
    backgroundColor: "white",
    borderRadius: 100,
    alignItems: "center"
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 80,
    margin: 5
  },
  iconContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    zIndex: 1
  }
});
export default Card;
