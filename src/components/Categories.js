import { View, Text, Pressable, Dimensions, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Categories({catIndex, setCatIndex, onPress}) {
    const categories = ['All', 'Plumber', 'Electrician', 'Designer'];
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
      {
        categories.map((item,index)=>{
            return <Pressable onPress={()=>{setCatIndex(index);onPress(item)}} key={index}>
                {catIndex===index?<LinearGradient  
                    style={{
                            ...styles.btn
                        }}
                    colors={['#B615DE', '#D428A8']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <Text style={{color: '#fff',...styles.text}}>{item}</Text>
                </LinearGradient>:
                <View style={{
                ...styles.btn
            }}><Text style={{color: '#fff',...styles.text}}>{item}</Text></View>}
            </Pressable>
        })
      }
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width * 0.93,
        alignSelf: 'center',
        marginVertical: Dimensions.get('window').height*0.03,
    },
    btn: {
        paddingHorizontal: Dimensions.get('window').width * 0.03, 
        paddingVertical: Dimensions.get('window').height*0.005,
        marginLeft: Dimensions.get('window').width * 0.02,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
    }
})