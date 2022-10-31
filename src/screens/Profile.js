import { View, StyleSheet , Text, ScrollView, Pressable,Image, Dimensions, ActivityIndicator} from "react-native";
import Header from "../components/Header";
import CustomeBtn from "../components/CustomeBtn";
import {SafeAreaView} from 'react-native-safe-area-context';
import Ratings from "../components/Ratings";
import AccountPic from "../components/AccountPic";
import RatingsCard from "../components/RatingsCard";
import {useSelector, useDispatch} from 'react-redux';
import React, { useEffect, useState } from 'react'
import { collection, deleteDoc, Firestore, getDocs, query,where, onSnapshot } from 'firebase/firestore';
import {firestore,auth} from '../config/firebase';
import PopUp from "../components/PopUp";



const img = 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80';

function ServitorProfile({navigation,route}){
     const {data} = route.params;
     const [isOpen,setIsOpen] = useState(false);

 
     const [isLoading,setIsLoading] = useState(false);
    
    function sayHello(){
        navigation.navigate('RequestForm',{
            sevName: data.firstName,
            sevType: data.serviceType,
            sevPic: data.imgUrl,
            servitorId: data.userId,          
        })
    }

    const [images, setImages] = useState([]);
    const collectionRef = collection(firestore, 'images');
    let imageQuery = query(collectionRef,where('userId','==',data.userId))

    async function getImages(){
        setIsLoading(true)
        try{
          let data = await getDocs(imageQuery).then((snapshot)=>snapshot.docs.map(doc=>(doc.data())));
          setImages(data);
          setIsLoading(false)
        }catch(e) {
            alert(e.message);
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        getImages();
    },[])
    
    return(
        <View style={styles.container}>
            <SafeAreaView>
                <Header widthMsg={true} setIsOpen={setIsOpen} navigation={navigation} withBackIcon={true}/>
                {isOpen&&<PopUp navigation={navigation} />}
                <View style={{marginTop: Dimensions.get('window').height*0.04,}} />
                 <Image source={{uri: data.imgUrl}} style={{width: Dimensions.get('window').width*0.3,
                                      height: Dimensions.get('window').width*0.3, 
                                      borderRadius:Dimensions.get('window').width*0.3,
                                      alignSelf: 'center',
                                      }}/>
         
                 <View style={{marginTop: '10%', flexDirection: 'row', marginLeft: 15, justifyContent: 'space-between'}}>
                    <View>
                        <Text style={{fontSize: 20,color: '#fff',fontWeight: '600',}}>{data.firstName}</Text>
                        <Text style={{fontSize: 15,color: '#fff',fontWeight: '600',}}>{data.serviceType}</Text>
                    </View>
                        <View style={{flexDirection: 'row', marginRight: '3%'}}>
                                <Ratings ratings={data.ratings} />
                        </View>
                 </View>
                 <View style={{marginLeft: '4%', width: '75%', marginTop: '2%'}}>
                    <Text style={{color: '#fff', fontSize: 15}}>
                      {data.description}
                    </Text>
                 </View>

                
                 <View style={styles.servicePics}>
                    <ScrollView horizontal={true}>
                        {isLoading?<ActivityIndicator style={{marginVertical: 20}} size="large" color="#D428A8" />
                            :images.length!==0?
                            images.map(img=>{
                              return <AccountPic img={img} />
                            }): <Text style={{color: '#fff',alignSelf:'center',marginVertical: 20}}>No images</Text>
                        }
                        
                    </ScrollView>
                 
                 </View>
                 
                 <View style={styles.reviews}>
                   
                 <ScrollView horizontal={true}>
                 
                 <RatingsCard />
                 <RatingsCard />
                 <RatingsCard />
                 <RatingsCard />
                  
                 </ScrollView>
                  
                </View>
                <Pressable >
                <View style={{alignSelf: 'center'}}>
                     <CustomeBtn text={'Request service'} onPress={sayHello}/>
                </View>
                </Pressable>
                
            </SafeAreaView>
        </View>
    )
}
export default ServitorProfile;

const styles = StyleSheet.create({
     container: {
        height: '100%',
        backgroundColor: 'black'
     },
     image: {
        marginTop: '8%',
        width:100,
        height:100,
        borderRadius:150,
        backgroundColor: '#9f9d9e',
        alignSelf: 'center'
     },
     servicePics: {
        marginTop: '8%',
        marginLeft: '4%',
        flexDirection: 'row',
     },
     reviews: {
        marginTop: '5%',
        flexDirection: 'row',
        height: 140,
        paddingLeft: '4%'
     },
     addBtn: {
         width: Dimensions.get('window').width* 0.3, 
         height: Dimensions.get('window').height* 0.2, 
         borderRadius: 25, 
         backgroundColor: '#131313', 
         marginRight: 10,
         justifyContent: 'center',
         alignItems: 'center',
         display: 'flex'
      }
})