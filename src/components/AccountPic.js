import { View, Text, Image, Dimensions } from "react-native";
import React from "react";

export default function AccountPic({img}) {
    // const service = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZSnjs9zoIjgrnhCHtHWFFpHlIj_hhGPXooVaxjYKYRenyQf3E581_Cg5ZkZQ2XI87DZU&usqp=CAU'
  return (
    <View style={{width: Dimensions.get('window').width* 0.3, height: Dimensions.get('window').height* 0.2, borderRadius: 25, backgroundColor: 'white', marginRight: 10}}>
    <Image source={{uri:img.imgUrl}} style={{width: Dimensions.get('window').width* 0.3,height: Dimensions.get('window').height* 0.2, borderRadius:25}}/>
  </View>)
}
