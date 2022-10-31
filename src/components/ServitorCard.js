import { View, Text, Dimensions, Image, StyleSheet, Pressable } from "react-native";
import React, {useEffect} from "react";
import Ratings from "./Ratings";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from '@react-native-masked-view/masked-view';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import {firestore} from '../config/firebase';


export default function ServitorCard({isOnline, req,index,navigation}) {
   
    const viewRequest = async ()=>{
    //   await deleteDoc(doc(firestore, "Request Form", req.docId));
    navigation.navigate('Request',{
        data: req
    });
    
    }
    
    const img = 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80';
   
    return (
        <View>
      
      <View style={styles.container}>
      <View >
        <Image resizeMode='cover' style={styles.img} source={{uri: req.imgUrl}} />
        {isOnline&&<View style={styles.online} />}
      </View>
      
      <View style={styles.textContainter}>
        <View style={styles.textRow} key={index}>
            <Text style={styles.heading}>{req.firstName}</Text>
            <MaskedView  maskElement={<Text style={{backgroundColor: 'transparent',...styles.text}}>{req.reqStatus}</Text>}>
                <LinearGradient
                    colors={['#B615DE', '#D428A8']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <Text style={{backgroundColor: 'transparent',...styles.text,opacity: 0}}>{req.reqStatus}</Text>
                </LinearGradient>
        </MaskedView>
        </View>
        <Text style={styles.text}>Customer</Text>
        <Ratings ratings={0} />
      
      </View>

      <Pressable onPress={viewRequest} style={styles.btnPos}>
        <LinearGradient  
                style={{
                        ...styles.btn 
                    }}
                colors={['#B615DE', '#D428A8']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text style={{...styles.btnText}}>{'View'}</Text>
            </LinearGradient>
            
      </Pressable>
  
    </View>
  
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width* 0.93,
        height: Dimensions.get('window').height * 0.2,
        backgroundColor: '#131313',
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Dimensions.get('window').height * 0.03,
        position: 'relative',
        overflow: 'visible',
        alignSelf: 'center',
        marginBottom:25
    },
    img: {
        width: Dimensions.get('window').height * 0.13,
        height: Dimensions.get('window').height * 0.13,
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
    },
    textRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width* 0.5
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        width: Dimensions.get('window').width* 0.3,
        height: Dimensions.get('window').height* 0.05,
    },
    btnPos: {
        position: 'absolute',
        right: Dimensions.get('window').width* 0.03,
        bottom: Dimensions.get('window').height* 0.02,
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
    }
})