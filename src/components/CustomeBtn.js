import { Text, Pressable, StyleSheet, useWindowDimensions } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function CustomeBtn({text,onPress}) {
    const {width, height} = useWindowDimensions();
  return (
    <Pressable onPress={onPress}>
        <LinearGradient  style={{width: width * 0.4, height: height*0.06,...styles.btn }}
      colors={['#B615DE', '#D428A8']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
            <Text style={{...styles.text}}>{text}</Text>
        </LinearGradient>
    </Pressable>
  );
}
const styles = StyleSheet.create({
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    text: {
        color: '#fff',
        fontSize: 18,
    }
})