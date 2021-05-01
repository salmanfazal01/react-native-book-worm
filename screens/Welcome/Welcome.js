import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import CustomButton from "../../components/CustomButton/CustomButton";

const Welcome = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#2E424D" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Ionicons name="ios-bookmarks" size={150} color="#bada55" />
        <Text style={{ fontSize: 50, fontWeight: "100", color: "white" }}>
          Book Worm
        </Text>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <CustomButton
          style={{
            width: 200,
            backgroundColor: "transparent",
            borderWidth: 0.5,
            borderColor: "lightgray",
            marginBottom: 10,
          }}
          method={() => navigation.navigate("LoginScreen")}>
          <Text style={{ color: "white" }}>Log In</Text>
        </CustomButton>
      </View>
    </View>
  );
};

export default Welcome;
