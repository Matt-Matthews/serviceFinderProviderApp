import React from 'react';
import {StyleSheet, View, Text,ScrollView, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import PopUp from '../components/PopUp';

export default function Notifications({navigation}) {
  const [isOpen,setIsOpen] = React.useState(false);

    const notification = [
        {
          id: '1',
          userName: 'Matthews 1',
          title: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Vel imperdiet, Lorem ipsum dolor sit amet consectetur adipiscing elit. Vel imperdiet, Lorem ipsum dolor sit amet consectetur adipiscing elit. Vel imperdiet', 
        },
        {
          id: '2',
          userName: 'Matthews 2',
          title: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Vel imperdiet, Lorem ipsum dolor sit amet consectetur adipiscing elit. Vel imperdiet, Lorem ipsum dolor sit amet consectetur adipiscing elit. Vel imperdiet', 
        },
        {
          id: '3',
          userName: 'Matthews 3',
          title: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Vel imperdiet, Lorem ipsum dolor sit amet consectetur adipiscing elit. Vel imperdiet, Lorem ipsum dolor sit amet consectetur adipiscing elit. Vel imperdiet', 
          
        },
      ];

      const notify = () => {
        return notification.map((results,index) => {
          return (
             <View key={index} style={{...styles.notifycard}}>
              <Text style={styles.text}>{results.userName}</Text>
              <Text style={{color:'#fefefe'}}>{results.title}</Text>
            </View>
          );
        });
      };

  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
        <ScrollView style={{backgroundColor:'black'}}>
            <View style={{...styles.container}}>
                <Header setIsOpen={setIsOpen} withBackIcon={false}/>
                {isOpen&&<PopUp navigation={navigation} />}
                <View style={{marginTop: Dimensions.get('window').height*0.04,}} />
                {notify()}
            </View>
         </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    notifycard:{
        backgroundColor:'#131313',
        width:'93%',
        height: Dimensions.get('window').height*0.18,
        marginBottom: Dimensions.get('window').height*0.02,
        borderRadius:25,
        color:'#fff',
        justifyContent: 'center',
        paddingHorizontal: Dimensions.get('window').width*0.05,
    },
    text: {
      color:'#fefefe', 
      marginBottom: Dimensions.get('window').height*0.01, 
      fontSize: 18,
      fontWeight: 'bold'}
  });