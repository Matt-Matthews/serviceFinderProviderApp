import { View, StyleSheet, Dimensions, TextInput, Pressable, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as DocumentPicker from 'expo-document-picker';

export default function FileInput({icon,placeholder,setValue}) {
  const [fileName,setFileName] = React.useState(placeholder)
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({})
if (result != null) {
      const r = await fetch(result.uri);
      const b = await r.blob();
      setFileName(result.name)
      setValue(prev=>[...prev,b]);
      //setIsChoosed(true) 
    }
}
  return (
    <View style={{...styles.submainview, display:'flex',flexDirection:'row'}}>
        <Ionicons name={icon} size={20} color='gray' />     
        <Text style={styles.inputs}>{fileName}</Text>
        <Pressable onPress={pickDocument} style={{width: Dimensions.get('window').width*0.3,}}>
       
        <LinearGradient 
                style={styles.choosefile}
                            colors={['#B615DE', '#D428A8']}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
            >
                <Text style={{...styles.text}}>Choose file</Text>
        </LinearGradient>
          
        </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
    submainview: {
        backgroundColor:'#131313',
        borderRadius: Dimensions.get('window').height* 0.07,
        paddingHorizontal: Dimensions.get('window').width*0.03,
        height: Dimensions.get('window').height* 0.07,
        width:Dimensions.get('window').width*0.93,
        alignSelf: 'center',
        marginBottom: Dimensions.get('window').height* 0.02,
        alignItems: 'center',
        position: 'relative',
      },
      inputs: {
        fontSize:16,
        marginLeft: '3%',
        width:Dimensions.get('window').width*0.52,
        color: 'grey',
      },
      choosefile: {
        height: '100%',
        width: Dimensions.get('window').width*0.3,
      borderTopRightRadius:Dimensions.get('window').height* 0.07,
      borderBottomRightRadius:Dimensions.get('window').height* 0.07,
      alignItems: 'center',
      justifyContent: 'center',
      },
      text: {
        fontSize: 18,
        color: '#fff'
      }
})