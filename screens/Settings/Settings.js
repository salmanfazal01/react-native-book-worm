import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../../components/CustomButton/CustomButton";

const Settings = ({navigation}) => {
  return (
    <View style={styles.container}>
      <CustomButton
        style={styles.button}
        method={() => navigation.navigate("WelcomeScreen")}>
        <Text style={{ color: "white" }}>Log Out</Text>
      </CustomButton>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2E424D",
  },
  button: {
    width: 200,
    backgroundColor: "transparent",
    borderWidth: 0.5,
    borderColor: "lightgray",
    marginBottom: 10,
  },
});
