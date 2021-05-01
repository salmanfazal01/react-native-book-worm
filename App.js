import React, { useEffect } from "react";
import { View } from "react-native";
import HomeScreen from "./screens/Home/Home";
import WelcomeScreen from "./screens/Welcome/Welcome";
import SettingsScreen from "./screens/Settings/Settings";
import LoginScreen from "./screens/Auth/Login";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import CustomDrawer from "./components/CustomDrawer/CustomDrawer";
import colors from "./assets/colors";
import firebase from "firebase/app";
import { firebaseConfig } from "./config/config";

/*
npm i react-navigation
npm i react-navigation-stack
npm i react-navigation-drawer
npm i react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
*/

const App = () => {
  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
  }, []);

  return <AppContainer />;
};

const LoginStackNavigator = createStackNavigator(
  {
    WelcomeScreen: {
      screen: WelcomeScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {
        title: "Sign Up",
      },
    },
  },
  {
    mode: "modal",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.bgMain,
      },
    },
  }
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        title: "Home",
        drawerIcon: () => <Ionicons name="ios-home" size={24} />,
      },
    },
    SettingsScreen: {
      screen: SettingsScreen,
      navigationOptions: {
        title: "Settings",
        drawerIcon: () => <Ionicons name="ios-settings" size={24} />,
      },
    },
  },
  {
    contentComponent: CustomDrawer,
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  LoginStackNavigator,
  AppDrawerNavigator,
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default App;
