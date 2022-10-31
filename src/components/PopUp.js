import { Pressable, Text,StyleSheet, Dimensions} from "react-native";
import React from "react";
import { Icon } from "react-native-gradient-icon";
import { auth } from "../config/firebase";


export default function PopUp({navigation}) {

    function logout(){
        auth.signOut().then(()=>{
            navigation.navigate('SignIn');
        })
    }
  return (
    <Pressable onPress={logout} style={styles.popUp}>
        <Icon  
                    size={Dimensions.get('window').height*0.04}
                    colors={[
                        {color:"#B615DE",offset:"0",opacity:"1"},
                        {color:"#D428A8",offset:"1",opacity:"1"},
                    ]}
                    name="md-log-out-outline" 
                    type="ionicon" 
                />
                <Text style={{color: '#fff', marginLeft: 10}}>Logout</Text>
        </Pressable>
  );
}
const styles = StyleSheet.create({
    popUp: {
        position: 'absolute',
        zIndex: 3,
        elevation: 3, 
        width: Dimensions.get('window').width*0.35, 
        padding:Dimensions.get('window').height*0.01, 
        backgroundColor: '#131313',
        right: 10,
        top: Dimensions.get('window').height*0.08,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 25,
    }
})