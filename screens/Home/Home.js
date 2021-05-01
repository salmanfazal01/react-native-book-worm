import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BookCount from "../../components/BookCount/BookCount";
import CustomButton from "../../components/CustomButton/CustomButton";
import colors from "../../assets/colors";

export default function Home() {
  const [totalCount, setTotalCount] = useState(0);
  const [readingCount, setReadingCount] = useState(0);
  const [readCount, setReadCount] = useState(0);
  const [addBookVisible, setAddBookVisible] = useState(false);
  const [books, setBooks] = useState([]);
  const [input, setInput] = useState(null);

  const handleAddBookVisible = () => {
    setAddBookVisible(!addBookVisible);
  };

  const handleAddBook = (name) => {
    if (name) {
      setBooks((oldBooks) => [...oldBooks, name]);
      setReadingCount(readingCount + 1);
      setTotalCount(totalCount + 1);
    }
  };

  useEffect(() => {
    setInput(null);
  }, [books]);

  const handleMarkAsRead = (selectedBook, index) => {
    let newList = books.filter((book) => book !== selectedBook);

    setBooks(newList);
    setReadingCount(readingCount - 1);
    setReadCount(readCount + 1);
  };

  const renderItem = (name, index) => (
    <View style={{ height: 50, flexDirection: "row" }}>
      <View style={{ flex: 1, justifyContent: "center", paddingLeft: 5 }}>
        <Text>{name}</Text>
      </View>
      <CustomButton
        color={colors.bgSuccess}
        method={() => handleMarkAsRead(name, index)}>
        <Text style={{ fontWeight: "bold", color: "white" }}>Mark as Read</Text>
      </CustomButton>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView />
      {/* Header */}
      <View
        style={{
          height: 70,
          borderBottomWidth: 0.5,
          borderBottomColor: "deepskyblue",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Text style={{ fontSize: 20 }}>Book Worm</Text>
      </View>

      {/* Body */}
      <View style={{ flex: 1 }}>
        {/* Text Input */}
        {addBookVisible ? (
          <View style={{ height: 50, flexDirection: "row" }}>
            <TextInput
              value={input}
              onChangeText={(text) => setInput(text)}
              style={{ flex: 1, backgroundColor: "#eee", paddingLeft: 5 }}
              placeholder="Enter Book Name"
            />
            <CustomButton
              type="icon"
              color={colors.bgSuccess}
              method={() => handleAddBook(input)}>
              <Ionicons name="ios-checkmark" color="white" size={40} />
            </CustomButton>

            <CustomButton
              type="icon"
              color={colors.bgError}
              method={handleAddBookVisible}>
              <Ionicons name="ios-close" color="white" size={40} />
            </CustomButton>
          </View>
        ) : null}

        <FlatList
          data={books}
          renderItem={({ item }, index) => renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <View style={{ marginTop: 50, alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Not reading any books</Text>
            </View>
          }
        />

        {/* Plus Button */}
        {/* Makes button clickable */}
        <TouchableOpacity
          style={{ position: "absolute", bottom: 20, right: 20 }}
          onPress={handleAddBookVisible}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: "deepskyblue",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Text style={{ color: "white", fontSize: 30 }}>+</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View
        style={{
          height: 70,
          borderTopWidth: 0.5,
          borderTopColor: "deepskyblue",
          flexDirection: "row",
        }}>
        <BookCount title="Total" count={totalCount} />
        <BookCount title="Reading" count={readingCount} />
        <BookCount title="Read" count={readCount} />
      </View>

      <SafeAreaView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
