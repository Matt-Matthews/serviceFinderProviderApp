import { StyleSheet, Text, View, Image, ScrollView, Pressable, Dimensions, ActivityIndicator} from 'react-native';
import Header from '../components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FlatGrid } from 'react-native-super-grid';
import React, {useReducer} from 'react';
import SearchInput from '../components/SearchInput';
import HomeSearchInput from '../components/HomeSearchInput';
import { Icon } from "react-native-gradient-icon";
import Categories from '../components/Categories';
import Ratings from '../components/Ratings';
import {useSelector, useDispatch} from 'react-redux';
import {getDocs, collection, query, where, onSnapshot, } from 'firebase/firestore';
import {firestore} from '../config/firebase';
import PopUp from '../components/PopUp';




function Home({navigation}){
   
      const [catIndex, setCatIndex] = React.useState(0);
      const img = 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80';

      React.useEffect(()=>{
        getServitorData('All');
      },[])

      const {address,userData} = useSelector(state=>state.user);
      const [servitorData,setServitorData] = React.useState([]);
      const [searchData,setSearchData] = React.useState([]);
      const [isLoading, setIsLoading] = React.useState(false);
      const [searchItem,setSearchItem] = React.useState('');
      const [isOpen,setIsOpen] = React.useState(false);

      async function getServitorData(category) {
        const collectionRef = collection(firestore, 'servitors');
        setIsLoading(true);
        setServitorData([]);
        
        try {
          if(category==='All'){
            let data = await getDocs(collectionRef).then((snapshot)=>snapshot.docs.map(doc=>(doc.data())));
            setServitorData(data);
            setSearchData(data);
            setIsLoading(false)
          }else {
            let dataQuery = query(collectionRef, where("serviceType", "==", category));
          
            onSnapshot(dataQuery, (snapshot) => {
              let data= snapshot.docs.map((doc)=>({...doc.data(), id: doc.id}));
              setServitorData(data);
              setIsLoading(false)
            })
          }
          
        }catch(e){
            alert(e.message);
            setIsLoading(false)
        }
      }

      function search() {
        setCatIndex(0);

        if(searchItem!=='')
        {
          let data = searchData.filter(item=>item.serviceType.toLocaleLowerCase().substr(0,searchItem.length)===searchItem.toLocaleLowerCase())
          setServitorData(data);
        }
        
      }
      // const dispatch = useDispatch();
      // dispatch(getHotelsData({data}))
    return(
        <Pressable onPress={()=>setIsOpen(false)} style={styles.container}>
            <SafeAreaView>
                <Header setIsOpen={setIsOpen} widthMsg={true} />
                {isOpen&&<PopUp navigation={navigation} />}
              <ScrollView  stickyHeaderIndices={[2]}>
                
                <View style={{marginTop: Dimensions.get('window').height*0.04,}} />
                <View style={styles.location}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon  
                    size={32}
                    colors={[
                        {color:"#B615DE",offset:"0",opacity:"1"},
                        {color:"#D428A8",offset:"1",opacity:"1"},
                    ]}
                    name="md-location-sharp" 
                    type="ionicon" 
                />
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', }}>{address?address[0].city:'Location'}</Text>
                    </View>
                    <Pressable>
                                <Image source={{uri: userData[0].imgUrl}} resizeMode='cover' style={{width: Dimensions.get('window').width*0.15,
                                      height: Dimensions.get('window').width*0.15, 
                                      borderRadius:Dimensions.get('window').width*0.15}}/>
                    </Pressable>
                   
                </View>

                <View style={{backgroundColor: '#000',}}>
                <HomeSearchInput getData={getServitorData} setSearchItem={setSearchItem} search={search} />
               
                <View style={{marginLeft: '5%', marginTop: '12%'}}>
                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', }}>Categories</Text>
                </View>
                
                <Categories onPress={getServitorData} catIndex={catIndex} setCatIndex={setCatIndex} />
                </View>
                 <View style={styles.services}>
                 {isLoading&&<ActivityIndicator size="large" color="#D428A8" />}
                    {servitorData.length!==0&&<FlatGrid
                        itemDimension={130}
                        style={styles.gridView}
                        data={servitorData}
                        spacing={10}
                        renderItem={({ item }) => (
                            <Pressable onPress={()=>{navigation.navigate('Profile',{data: item});}} style={[styles.itemContainer, { backgroundColor: '#131313' }]}>
                                <Image source={{uri: item.imgUrl}} style={{width: Dimensions.get('window').width*0.2,
                                      height: Dimensions.get('window').width*0.2, 
                                      borderRadius:Dimensions.get('window').width*0.2,
                                      alignSelf: 'center'
                                      }}/>
                                <View style={{flexDirection: 'row', 
                                              justifyContent: 'space-between', 
                                              marginVertical: Dimensions.get('window').height*0.005,
                                              alignItems: 'center',
                                              }}>
                                  <Text style={styles.itemName}>{item.firstName}</Text>
                                  <View style={{flexDirection: 'row',}}>
                                      <Ratings ratings={item.ratings} />
                                  </View>
                                </View>
                                  <Text style={styles.itemCode}>{item.serviceType}</Text>
                            </Pressable>
                        )}
                    />} 
                    {servitorData.length===0&&!isLoading&&<Text style={{color: '#fff', alignSelf: 'center', marginTop: Dimensions.get('window').height*0.05}}>No data found</Text>}
                    <View style={{marginTop: Dimensions.get('window').height*0.15,}} />
                 </View>
              </ScrollView>
                
            </SafeAreaView>
        </Pressable>
     
    )
}
export default Home;
const styles = StyleSheet.create({ 
   container: {
      height: '100%',
      backgroundColor: 'black'
   },
   location:{
      flexDirection: 'row',
      width: '93%',
      alignSelf: 'center',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   profile: {
       width: 60,
       height: 60,
       backgroundColor: 'white',
       marginTop: '-6%',
       borderRadius: 150,
       marginRight: '2%'
   },
   categories: {
      flexDirection: 'row',
      marginLeft: '2%',
      marginTop: '1%',
      width: '100%',
      height: 70,
      alignItems: 'center',
   },
   services: {
     width: '92%',
     marginLeft: '5%'
   },
   gridView: {
    // marginTop: 10,
  },
  itemContainer: {
    justifyContent: 'center',
    borderRadius: 25,
    padding: 10,
    height: Dimensions.get('window').height*0.21,
  },
  itemName: {
    fontSize: 18,
    color: '#9f9d9e',
    fontWeight: '600',
    
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 15,
    color: '#9f9d9e',
  },
})