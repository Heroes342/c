import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { Modal, View, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import RootStackParams from "../models/RootStackParams";
import DetailScreen from "../screens/DetailScreen";
import HomePage from "../screens/HomePage";
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import ProfileScreen from "../screens/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Favorites from "../screens/Favorites";

import { Icon } from "react-native-elements";
import ROUTES from "./routes";
import { useSelector } from "react-redux";
import { BookmarkProps } from "../redux/actions/bookmarkActions";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import { Button } from "react-native-elements";
import {
  AccountProps,
  logout,
  deleteAccount,
} from "../redux/actions/accountActions";
import { useDispatch } from "react-redux";
import InfoScreen from "../screens/InfoScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

const RootStack = createStackNavigator<RootStackParams>();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const MainStack: React.FC = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={ROUTES.Login}
        component={Login}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "#292a39" },
        }}
      />
      <RootStack.Screen
        name={ROUTES.SignUp}
        component={SignUp}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "#292a39" },
        }}
      />
    </RootStack.Navigator>
  );
};

const TabNavigation: React.FC = () => {
  const { bookmarks } = useSelector(
    (state: { bookmarkReducer: BookmarkProps }) => state.bookmarkReducer
  );

  const { navigate } =
    useNavigation<StackNavigationProp<RootStackParams, ROUTES>>();
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.Home}
      screenOptions={{
        headerTintColor: "#f06616",
        headerStyle: { backgroundColor: "#292a39" },
        tabBarActiveTintColor: "#f06616",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name={ROUTES.Home}
        component={HomePage}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" type="material" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.Profile}
        component={DrawerMenu}
        options={{
          headerShown: false,
          headerTintColor: "#f06616",
          headerStyle: { backgroundColor: "#292a39" },
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" type="antdesign" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const DrawerMenu: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { account } = useSelector(
    (state: { accountReducer: AccountProps }) => state.accountReducer
  );
  const dispatch = useDispatch();
  const confirmDelete = () => {
    dispatch(deleteAccount(account));
    setModalVisible(false);
  };
  const CustomDrawerContent = (props: any) => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <Button
          title="Logout"
          buttonStyle={styles.button}
          onPress={() => dispatch(logout())}
        />
        <Button
          title="Delete account"
          buttonStyle={styles.button}
          onPress={() => setModalVisible(true)}
        />
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalView}>
            <Text>Are you sure you want to delete your account?</Text>
            <View style={styles.modalButtons}>
              <Button title="Yes" onPress={() => confirmDelete()} />
              <Button title="No" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </DrawerContentScrollView>
    );
  };
  return (
    <>
      <Drawer.Navigator
        initialRouteName="Profile"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name={ROUTES.Profile}
          component={ProfileScreen}
          options={{ headerShown: true }}
        />
        <Drawer.Screen
          name={ROUTES.EditProfile}
          component={EditProfileScreen}
        />
        <Drawer.Screen name={ROUTES.Info} component={InfoScreen} />
        <Drawer.Screen name={ROUTES.Favorite} component={Favorites} />
      </Drawer.Navigator>
    </>
  );
};

const HomeStack: React.FC = () => {
  const { account } = useSelector(
    (state: { accountReducer: AccountProps }) => state.accountReducer
  );

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name={ROUTES.Home}
          component={account && account.isLogged ? TabNavigation : MainStack}
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: "#292a39" },
          }}
        />
        <RootStack.Screen name={ROUTES.Detail} component={DetailScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  modalButtons: {
    flexDirection: "row",
    marginHorizontal: 10,
  },
  button: {
    width: 100,
    margin: 10,
    height: 40,
    borderColor: "gray",
    borderWidth: 2,
    backgroundColor: "#292a39",
  },
});

export default HomeStack;
