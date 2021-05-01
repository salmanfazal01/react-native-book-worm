import React from "react";
import { StyleSheet, Text, View } from "react-native";

const BookCount = ({ title, count }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18 }}>{title}</Text>
      <Text>{count}</Text>
    </View>
  );
};

export default BookCount;

const styles = StyleSheet.create({});
