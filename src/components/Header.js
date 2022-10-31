import { View, Text, Image, Pressable, StyleSheet, useWindowDimensions,Dimensions} from "react-native";
import React from "react";
import logo from '../assets/images/logo.png';
import { Icon } from "react-native-gradient-icon";

export default function Header({withBackIcon, widthMsg, navigation,setIsOpen}) {
    const {height, width} = useWindowDimensions();
    function prevPage() {
        navigation.goBack();
    }
  return (
    <View style={{...styles.container}}>

        <View style={{...styles.iconsRow}}>
            <Pressable onPress={prevPage} style={{width: Dimensions.get('window').height*0.04, marginLeft: width* 0.03,}}>
                {withBackIcon&&<Icon  
                    size={Dimensions.get('window').height*0.04}
                    colors={[
                        {color:"#B615DE",offset:"0",opacity:"1"},
                        {color:"#D428A8",offset:"1",opacity:"1"},
                    ]}
                    name="md-arrow-back" 
                    type="ionicon" 
                />}
            </Pressable>
            <Image source={logo} resizeMode='cover' style={{...styles.img}} />
        </View>

        <View style={{...styles.iconsRow}}>

            <Pressable style={{width: Dimensions.get('window').height*0.04}}>
            {widthMsg&&<Icon  
                    size={Dimensions.get('window').height*0.04}
                    colors={[
                        {color:"#B615DE",offset:"0",opacity:"1"},
                        {color:"#D428A8",offset:"1",opacity:"1"},
                    ]}
                    name="md-chatbox" 
                    type="ionicon" 
                />}
            </Pressable>
            
            <Pressable onPress={()=>setIsOpen(prev=>!prev)}>
                <Icon  
                    size={Dimensions.get('window').height*0.04}
                    colors={[
                        {color:"#B615DE",offset:"0",opacity:"1"},
                        {color:"#D428A8",offset:"1",opacity:"1"},
                    ]}
                    name="md-ellipsis-vertical" 
                    type="ionicon" 
                />
            </Pressable>
        </View>
        
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#000',
        position: 'relative'
    },
    iconsRow: {
        flexDirection: 'row',
        width: '20%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    img: {
        width: Dimensions.get('window').height*0.07, 
        height: Dimensions.get('window').height*0.07,
        marginLeft: '15%',
    },
    
});