import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ToggleSwitch from 'toggle-switch-react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import PopUp from '../components/PopUp';
import { auth } from '../config/firebase';


export default function Settings({navigation}) {

  const [isNotifications,setIsNotifications] = React.useState(true);
  const [isTheme,setIsTheme] = React.useState(true);
  const [isOpen,setIsOpen] = React.useState(false);

  function navigate() {
    
      navigation.navigate('AccountSettings');
  
  }

  let userId = auth.currentUser.uid;

  function uploadDocs() {
    
    navigation.navigate('RegisterService',{userId: userId});

}
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
    <ScrollView style={{backgroundColor:'black'}}>
        <View>
            <Header setIsOpen={setIsOpen} withBackIcon={false}/>
            {isOpen&&<PopUp navigation={navigation} />}
            <View style={{marginTop: Dimensions.get('window').height*0.04,}} />
            <View style={{...styles.notifycard,}}>
              
              <Text style={{color:'#fff',fontSize:16}}>Notifications</Text>
              
              <View style={{ padding:20}}>
                <ToggleSwitch
                  isOn={isNotifications}
                  onColor="#B615DE"
                  offColor="#D428A8"
                  size="medium"
                  onToggle={()=>setIsNotifications(prev=>!prev)}
                />
              </View>
            </View>

            <View style={{...styles.notifycard, display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
              <View>
                <Text style={{color:'#fff',fontSize:16}}>Theme</Text>
              </View>
              <View style={{ padding:20}}>
                <ToggleSwitch
                  
                  isOn={isTheme}
                  onColor="#B615DE"
                  offColor="#D428A8"
                  size="medium"
                  icon={isTheme?<Ionicons name='md-moon' color={'#638CF6'} />:<Ionicons name='md-sunny' color={'orange'} />}
                  onToggle={()=>setIsTheme(prev=>!prev)}
                />
              </View>
            </View>
            
            <Pressable onPress={()=>navigate()} style={{...styles.notifycard}}>
              <Text style={{color:'#fff',fontSize:16}}>Acount Settings</Text>
            </Pressable>
            <Pressable onPress={()=>uploadDocs()} style={{...styles.notifycard}}>
              <Text style={{color:'#fff',fontSize:16}}>Upload documents</Text>
            </Pressable>

            <View style={{...styles.notifycard}}>
              <Text style={{color:'#fff',fontSize:16}}>About</Text>
            </View>
        </View>
     </ScrollView>
</SafeAreaView>
  );
}

const styles = StyleSheet.create({
    notifycard:{
        backgroundColor:'#131313',
        width:'93%',
        height: Dimensions.get('window').height* 0.1,
        display:'flex',
        flexDirection:'row', 
        justifyContent:'space-between',
        marginVertical: Dimensions.get('window').height* 0.01,
        alignSelf: 'center',
        borderRadius: 25,
        paddingHorizontal: Dimensions.get('window').width * 0.03,
        alignItems: 'center',
    } 
  });