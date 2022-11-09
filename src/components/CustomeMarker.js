import { View, Text, Dimensions, Image, StyleSheet } from "react-native";
import React from "react";
import Ratings from "./Ratings";


export default function CustomeMarker({isOnline, data}) {
    const img = 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80';
  return (
    <View>
        <View style={styles.container}>
      <View>
        <Image resizeMode='cover' style={styles.img} source={{uri: data.imgUrl}} />
        {isOnline&&<View style={styles.online} />}
      </View>
      <View style={styles.textContainter}>
        <Text style={styles.heading}>{data.firstName}</Text>
        <Text style={styles.text}>Customer</Text>
        <Ratings ratings={data.ratings} />
      </View>
      
    </View>
    {/* <View style={styles.point}  /> */}
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width* 0.45,
        height: Dimensions.get('window').height * 0.07,
        backgroundColor: '#000',
        borderRadius: Dimensions.get('window').height * 0.07,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Dimensions.get('window').height * 0.005,
        position: 'relative',
        overflow: 'visible',
    },
    img: {
        width: Dimensions.get('window').height * 0.06,
        height: Dimensions.get('window').height * 0.06,
        borderRadius: Dimensions.get('window').height * 0.07,
    },
    heading: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').width* 0.043,
    },
    text: {
        color: '#fff',
        fontSize: Dimensions.get('window').width* 0.03,
    },
    textContainter: {
        marginLeft: Dimensions.get('window').width* 0.02,
    },
    point: {
        height: 10,
        width: 10,
        backgroundColor: 'red',
        position: 'absolute',
        bottom: -1,
        left: '50%',
        transform: [{ rotate: '45deg'}],
    },
    online: {
      width: 8,
      height: 8,
      backgroundColor: '#38E54D',
      borderRadius: 10,
      position: 'absolute',
      right: 3,
      top: 3,
    }
})