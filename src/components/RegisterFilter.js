import { View, Text, Pressable,StyleSheet, Dimensions } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from '@react-native-masked-view/masked-view';

export default function RegisterFilter({index, setIndex}) {

  return (
    <View style={styles.container}>
      <Pressable onPress={()=>setIndex(0)}>
       {index===0? <LinearGradient  
            style={{
                    ...styles.btn 
                }}
            colors={['#B615DE', '#D428A8']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={{...styles.text}}>Individual</Text>
        </LinearGradient>:
        <View style={{
          ...styles.btn 
      }}>
          <MaskedView  maskElement={<Text style={{backgroundColor: 'transparent',...styles.text}}>Individual</Text>}>
          <LinearGradient
            colors={['#B615DE', '#D428A8']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={{backgroundColor: 'transparent',...styles.text,opacity: 0}}>Individual</Text>
          </LinearGradient>
        </MaskedView>
        </View>}
      </Pressable>

      <Pressable onPress={()=>setIndex(1)}>
      {index===1?<LinearGradient  
            style={{
                    ...styles.btn 
                }}
            colors={['#B615DE', '#D428A8']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={{...styles.text}}>Company</Text>
        </LinearGradient>:

        <View style={{
          ...styles.btn 
      }}>
          <MaskedView  maskElement={<Text style={{backgroundColor: 'transparent',...styles.text}}>Company</Text>}>
          <LinearGradient
            colors={['#B615DE', '#D428A8']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={{backgroundColor: 'transparent',...styles.text,opacity: 0}}>Company</Text>
          </LinearGradient>
        </MaskedView>
        </View>
      }
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width* 0.6,
        height: Dimensions.get('window').height*0.06,
        borderRadius: Dimensions.get('window').height*0.06,
        backgroundColor: "#131313",
        alignSelf: 'center',
        marginVertical: Dimensions.get('window').height*0.04,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        width: Dimensions.get('window').width* 0.3,
        height: '100%',
    },
    text: {
        color: '#fff',
        fontSize: 18,
    }
})