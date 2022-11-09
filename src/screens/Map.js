import { StyleSheet, Dimensions, StatusBar, ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from "react";
import MapView, { Marker } from 'react-native-maps';
import Header from '../components/Header';
import mapStyles from '../components/mapStyle.json';
import CustomeMarker from '../components/CustomeMarker';
import SearchInput from '../components/SearchInput';
import {useSelector} from 'react-redux';
import {getDocs, collection, query, where, onSnapshot, } from 'firebase/firestore';
import {auth, firestore} from '../config/firebase';
import PopUp from '../components/PopUp';

export default function Map({navigation}) {

  const [servitorData,setServitorData] = React.useState([]);
  const [searchData,setSearchData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchItem,setSearchItem] = React.useState('');
  const [isOpen,setIsOpen] = React.useState(false);
const [requests, setRequests] = React.useState([]);
const [allData,setAllData] = React.useState([]);


  // function viewProfile(data){
  //   navigation.navigate('Profile',{data: data});
  // }

  const {location} = useSelector(state=>state.user);

  // async function getServitorData(category) {
  //   const collectionRef = collection(firestore, 'servitors');
  //   setIsLoading(true);
  //   setServitorData([]);
    
  //   try {
  //     if(category==='All'){
  //       let data = await getDocs(collectionRef).then((snapshot)=>snapshot.docs.map(doc=>(doc.data())));
  //       setServitorData(data);
  //       setSearchData(data);
  //       setIsLoading(false)
  //     }else {
  //       let dataQuery = query(collectionRef, where("serviceType", "==", category));
      
  //       onSnapshot(dataQuery, (snapshot) => {
  //         let data= snapshot.docs.map((doc)=>({...doc.data(), id: doc.id}));
  //         setServitorData(data);
  //         setIsLoading(false)
  //       })
  //     }
      
  //   }catch(e){
  //       alert(e.message);
  //       setIsLoading(false)
  //   }
  // }

  // function search() {

  //   if(searchItem!=='')
  //   {
  //     let data = searchData.filter(item=>item.serviceType.toLocaleLowerCase().substr(0,searchItem.length)===searchItem.toLocaleLowerCase())
  //     setServitorData(data);

  //   }
    
  // }



  // React.useEffect(()=>{
  //   getServitorData('All');
  // },[])


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

const viewRequest = async (data)=>{
  //   await deleteDoc(doc(firestore, "Request Form", req.docId));
  navigation.navigate('Request',{
      data: data
  });
  
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <Header setIsOpen={setIsOpen} withBackIcon={false} />
      {isOpen&&<PopUp navigation={navigation} />}
      <MapView 
           
          zoomEnabled 
          style={styles.map} 
          initialRegion={{
            latitude: location? parseFloat(location.coords.latitude) : -23.9168558,
            longitude: location? parseFloat(location.coords.longitude) : 29.4576678,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={mapStyles}
      >
        {requests.length!==0&&requests.map((data,index)=>{
          return <Marker style={{width: Dimensions.get('window').width* 0.45}} key={index} onPress={()=>viewRequest(data)} coordinate={{latitude: data.location.latitude, longitude: data.location.longitude,}}>
          <CustomeMarker data={data} isOnline={true} />
        </Marker>
        })
          }
          {/* <Marker coordinate={{latitude: location? parseFloat(location.coords.latitude) : -23.9168558, longitude: location? parseFloat(location.coords.longitude) : 29.4576678}}>
            {isLoading&&<ActivityIndicator size="large" color="#D428A8" />}
            {servitorData.length===0&&!isLoading&&<Text style={{color: '#fff', alignSelf: 'center', marginTop: Dimensions.get('window').height*0.05}}>No data found</Text>}
          </Marker> */}
      </MapView>
      <SearchInput  setSearchItem={setSearchItem}  />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    container: {
      position: 'relative',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height*0.932,
    },
   
  });