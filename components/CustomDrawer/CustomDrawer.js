import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerItems } from "react-navigation-drawer";

const CustomDrawer = (props) => {
  return (
    <ScrollView>
      <SafeAreaView />

      <View
        style={{
          height: 170,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#2E424D",
          paddingTop: Platform.OS == "android" ? 20 : 0,
        }}>
        <Ionicons name="ios-bookmarks" size={100} color={"#bada55"} />
        <Text style={{ fontSize: 24, color: "white" }}>Book Worm</Text>
      </View>

      <DrawerItems {...props} />
    </ScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({});
