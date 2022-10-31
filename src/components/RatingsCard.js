import { View, Text, Dimensions } from "react-native";
import React from "react";
import Ratings from "./Ratings";

export default function RatingsCard() {
  return (
    <View style={{width: Dimensions.get('window').width* 0.6, height: Dimensions.get('window').height* 0.13, borderRadius: 25, backgroundColor: '#131313', marginRight: 10,padding: 11}}>
        <View style={{ display:"flex",flexDirection:"row", justifyContent:"space-between" }}>
            <View>
                <Text style={{ color: '#fff', fontSize: Dimensions.get('window').height* 0.02,paddingLeft:10 }}>Username</Text>
            
            </View>
            <View>
                <Ratings ratings={3} />
            </View>
                            
        </View>
        <Text style={{paddingLeft:10, color: '#fff',fontSize: Dimensions.get('window').height* 0.017 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</Text>
        <View>
            <Text style={{ color: '#fff',fontSize: 10, alignSelf: 'flex-end' }}>18/10/2022</Text>
        </View>
    </View>
  );
}
