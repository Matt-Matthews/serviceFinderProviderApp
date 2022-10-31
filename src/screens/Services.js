import { View, ScrollView, StyleSheet, StatusBar, ActivityIndicator, Text} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import ServicesFilter from "../components/ServicesFilter";
import ServitorCard from "../components/ServitorCard";
import { collection, getDocs, query,where, onSnapshot } from 'firebase/firestore';
import {firestore,auth} from '../config/firebase';
import PopUp from "../components/PopUp";

export default function Services({navigation}) {


const [index,setIndex] = React.useState(0);
const [requests, setRequests] = React.useState([]);
const [isLoading,setIsLoading] = React.useState(false);
const [allData,setAllData] = React.useState([]);
const [isOpen,setIsOpen] = React.useState(false);

let userId = auth.currentUser.uid;

async function getRequests() {
  setIsLoading(true)
    const collectionRef = collection(firestore, 'Request Form');
    
    try {
      let ourQuery = query(collectionRef,where('servitorId','==',userId));
      const servitorRef = collection(firestore, 'users')
      onSnapshot(ourQuery, (snapshot) => {
        let tempData = [];
        snapshot.docs.forEach(async (doc) => {
          let servitorQuery = query(servitorRef, where('userId', '==', doc.data().userId));
          await getDocs(servitorQuery).then((snapshot) => {
            snapshot.docs.forEach((servitor) => {
              tempData.push({ ...servitor.data(), ...doc.data(),docId: doc.id });
            });
            setIsLoading(false);
            setAllData(tempData);
            setIndex(0);
            setRequests(tempData.filter(data => data.reqStatus === 'Pending'));
          });
        });
      })
        
      setIsLoading(false);
    }catch(e){
        console.log(e.message);
        setIsLoading(false);
    }
}
  React.useEffect(()=>{
    getRequests();
},[])

function filterData(status){
    
  if(status==='All')
  {
    setRequests(allData);
  }else{
    let tempData = allData.filter(data=>data.reqStatus===status);
    setRequests(tempData);
  }
    
}

  return (
    <SafeAreaView >
      <StatusBar backgroundColor="#000" barStyle="light-content" />
        <Header setIsOpen={setIsOpen} withBackIcon={false} />
        {isOpen&&<PopUp navigation={navigation} />}
        <View style={styles.container}>
          <ServicesFilter index={index} onPress={filterData} setIndex={setIndex} />
          <ScrollView style={{height: '80%'}}>
            {isLoading?
            <ActivityIndicator size="large" color="#D428A8" />:
            
            requests.length!==0?requests.map((req,key)=>{
                      return<ServitorCard navigation={navigation} req={req} index={key} />
              }):<Text style={{color: '#fff', alignSelf: 'center', marginTop: 20}}>No data found</Text>}
          </ScrollView>
        </View>
        

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    container: {
      position: 'relative',
      backgroundColor: "#000",
      height: '90%',
    },
});