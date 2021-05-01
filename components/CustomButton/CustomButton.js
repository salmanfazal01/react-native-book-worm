import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import colors from '../../assets/colors'

const CustomButton = ({ children, title, method, color, type, style, onPress }) => {
  return (
    <TouchableOpacity onPress={method || onPress}>
      <View
        style={{
          width: type == "icon" ? 50 : 100,
          height: 50,
          backgroundColor: color || colors.bgSuccess,
          alignItems: "center",
          justifyContent: "center",
          ...style
        }}>
        {children || <Text style={{ fontWeight: "bold", color: "white" }}>{title}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
