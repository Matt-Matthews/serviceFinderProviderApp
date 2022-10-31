import { View, Text, Dimensions, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function CustomTabBar({ state, navigation}) {
    const [tabIndex, setTabIndex] = React.useState(state.index);

    function tabNavigate(name) {
      
      navigation.navigate({name: name});
  
    }
    React.useEffect(()=>{
      setTabIndex(state.index);
    },[state.index])

  return (
    <View style={styles.tabBarStyles}>
      <Pressable onPress={()=>tabNavigate('Home')} >
      <LinearGradient  style={styles.btn}
      colors={tabIndex===0?['#B615DE', '#D428A8']:['#131313', '#131313']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
        <Ionicons name='md-home-sharp' size={30} color={tabIndex===0?"white":"gray"} />
        {tabIndex===0&&<Text style={styles.text}>Home</Text>}
        </LinearGradient>
      </Pressable>

      <Pressable onPress={()=>tabNavigate('Map')}>
      <LinearGradient  style={styles.btn}
      colors={tabIndex===1?['#B615DE', '#D428A8']:['#131313', '#131313']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
        <Ionicons name='md-location-sharp' size={30} color={tabIndex===1?"white":"gray"} />
        {tabIndex===1&&<Text style={styles.text}>Location</Text>}
        </LinearGradient>
      </Pressable>


      <Pressable onPress={()=>tabNavigate('Notifications')} >
      <LinearGradient  style={styles.btn}
      colors={tabIndex===2?['#B615DE', '#D428A8']:['#131313', '#131313']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
        <Ionicons name='md-notifications-sharp' size={30} color={tabIndex===2?"white":"gray"} />
        {tabIndex===2&&<Text style={styles.text}>Notifications</Text>}
        </LinearGradient>
      </Pressable>

      <Pressable onPress={()=>tabNavigate('Settings')} >
      <LinearGradient  style={styles.btn}
      colors={tabIndex===3?['#B615DE', '#D428A8']:['#131313', '#131313']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
        <Ionicons name='md-settings-sharp' size={30} color={tabIndex===3?"white":"gray"} />
        {tabIndex===3&&<Text style={styles.text}>Settings</Text>}
        </LinearGradient>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
    tabBarStyles: {
        width: Dimensions.get('window').width*0.93,
        height: Dimensions.get('window').height*0.07,
        position: 'absolute', 
        backgroundColor: '#131313',
        marginBottom: 10,
        width: '90%',
        borderRadius: Dimensions.get('window').height*0.07,
        alignSelf: 'center',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Dimensions.get('window').width*0.03,
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        paddingHorizontal: 7,
        paddingVertical: 2,
    },
    text: {
        color: '#fff',
        marginLeft: Dimensions.get('window').width*0.01
    }
})