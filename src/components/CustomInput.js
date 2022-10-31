import { View, StyleSheet, Dimensions, TextInput, Pressable, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "react-native-gradient-icon";
import { LinearGradient } from "expo-linear-gradient";


export default function CustomInput({icon, placeholder, password, fileInput,setValue,secureTextEntry,value}) {
  const [secureText, setSecureText] =React.useState(secureTextEntry);
  
 
  return (
    <View style={{...styles.submainview, display:'flex',flexDirection:'row'}}>
        <Ionicons name={icon} size={20} color='gray' />     
        <TextInput onChangeText={text=>setValue(text.trim())} value={value} placeholderTextColor={"grey"} secureTextEntry={secureText} placeholder={placeholder} style={styles.inputs}></TextInput>
        <Pressable onPress={()=>setSecureText(prev=>!prev)} style={{width: Dimensions.get('window').width*0.3,}}>
        {password&&<Icon  
                    size={25}
                    style={{alignSelf: 'flex-end', marginRight: Dimensions.get('window').width*0.03,}}
                    colors={[
                        {color:"#B615DE",offset:"0",opacity:"1"},
                        {color:"#D428A8",offset:"1",opacity:"1"},
                    ]}
                    name={secureText?"md-eye-off-sharp":"md-eye-sharp"} 
                    type="ionicon" 
                />}
        {
            fileInput&&<LinearGradient 
                style={styles.choosefile}
                            colors={['#B615DE', '#D428A8']}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
            >
                <Text style={{...styles.text}}>Choose file</Text>
            </LinearGradient>
          }
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
        color: '#fff',
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