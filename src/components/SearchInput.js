import { View, StyleSheet, TextInput, Pressable, Dimensions } from "react-native";
import React from "react";
import { Icon } from "react-native-gradient-icon";

export default function SearchInput({setSearchItem, search, getData}) {

  function isEmpty(text){
    if(text===''){
      getData('All');
    }
    
  }

  return (
    <View style={styles.searchContainer}>
        <TextInput placeholderTextColor={'gray'} onChangeText={text=>{setSearchItem(text.trim());isEmpty(text)}} style={styles.input} placeholder='search' />
        <Pressable onPress={search} style={{}}>
            <Icon  
                size={32}
                colors={[
                    {color:"#B615DE",offset:"0",opacity:"1"},
                    {color:"#D428A8",offset:"1",opacity:"1"},
                ]}
                name="md-search" 
                type="ionicon" 
            />
        </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
    searchContainer: {
        position: 'absolute',
        width: Dimensions.get('window').width*0.93,
        height: Dimensions.get('window').height*0.07,
        borderRadius: Dimensions.get('window').height*0.06,
        backgroundColor: '#131313',
        top: Dimensions.get('window').height*0.13,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Dimensions.get('window').height*0.02,
      },
      input: {
        width: '80%',
        height: '90%',
        color: '#fff',
        fontSize: 18,
      }
})
