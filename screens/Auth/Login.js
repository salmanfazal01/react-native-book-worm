import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import CustomButton from "../../components/CustomButton/CustomButton";
import colors from "../../assets/colors";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const Login = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {}, []);

  const onSignIn = async () => {
    if (email && password) {
      setIsLoading(true);
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        if (response) {
          console.log(response)
          setIsLoading(false);
          navigation.navigate("HomeScreen");
        }
      } catch (error) {
        console.log(error)
        setIsLoading(false);
        switch (error.code) {
          case "auth/user-not-found":
            alert("A user with that email does not exist. Try signing Up");
            break;
          case "auth/invalid-email":
            alert("Please enter an email address");
        }
      }
    }
  };

  const onSignUp = async () => {
    if (email && password) {
      setIsLoading(true);
      try {
        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        if (response) {
          setIsLoading(false);
          const user = await firebase
            .database()
            .ref("users")
            .child(response.user.uid)
            .set({ email: response.user.email, uid: response.user.uid });

          navigation.navigate("HomeScreen");
          //automatically signs in the user
        }
      } catch (error) {
        setIsLoading(false);
        if (error.code == "auth/email-already-in-use") {
          alert("User already exists. Try logging in");
        }
        console.log(error);
      }
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              elevation: 1000,
            },
          ]}>
          <ActivityIndicator size="large" color={colors.logoColor} />
        </View>
      ) : null}
      <View style={{ flex: 1, justifyContent: "center" }}>
        <TextInput
          style={styles.textInput}
          placeholder={"abc@example.com"}
          placeholderTextColor={colors.bgTextInputDark}
          keyboardType="email-address"
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="enter password"
          placeholderTextColor={colors.bgTextInputDark}
          secureTextEntry
          onChangeText={(password) => setPassword(password)}
        />
        <View style={{ alignItems: "center" }}>
          <CustomButton
            onPress={onSignIn}
            style={{ ...styles.loginButton, borderColor: colors.bgPrimary }}>
            <Text style={{ color: "white" }}>Login</Text>
          </CustomButton>
          <CustomButton
            onPress={onSignUp}
            style={{ ...styles.loginButton, borderColor: colors.bgError }}>
            <Text style={{ color: "white" }}>Sign Up</Text>
          </CustomButton>
        </View>
      </View>
      <View style={{ flex: 1 }}></View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain,
  },
  textInput: {
    height: 50,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    marginHorizontal: 40,
    marginBottom: 10,
    color: colors.txtWhite,
    paddingHorizontal: 10,
  },
  loginButton: {
    borderWidth: 0.5,
    backgroundColor: "transparent",
    marginTop: 10,
    width: 200,
  },
});
