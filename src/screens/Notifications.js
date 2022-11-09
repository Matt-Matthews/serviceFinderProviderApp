import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import React from 'react';
import {StyleSheet, View, Text,ScrollView, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import PopUp from '../components/PopUp';
import { auth, firestore } from '../config/firebase';

export default function Notifications({navigation}) {
  const [isOpen,setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchItem,setSearchItem] = React.useState('');
const [requests, setRequests] = React.useState([]);
const [allData,setAllData] = React.useState([]);

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
            setRequests(tempData.filter(data => data.reqStatus !== 'Declined'));
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

 

      const notify = () => {
        return requests.map((results,index) => {
          return (
             <View key={index} style={{...styles.notifycard}}>
              <Text style={styles.text}>{results.firstName}</Text>
              <Text style={{color:'#fefefe'}}>{results.description}</Text>
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