import { View, StyleSheet , Text, ScrollView,Image, TextInput, Dimensions, KeyboardAvoidingView, ActivityIndicator} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context'
import Header from "../components/Header";
import CustomeBtn from "../components/CustomeBtn";
import CustomInput from "../components/CustomInput";
import React, { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore';
import {firestore} from '../config/firebase'
import { useSelector } from "react-redux";
import PopUp from "../components/PopUp";


function RequestForm({navigation, route}){
      const {sevName,
              sevType,
            sevPic, servitorId} =route.params

    function Confirm (){
        navigation.navigate('Home')
    }
     const [date, setDate] = useState("");
     const [address, setAddress] = useState("");
     const [description, setDescription] = useState("");
     const [isLoading,setIsLoading] = useState(false);
     const [isOpen,setIsOpen] = useState(false);


     const {userData} = useSelector(state=>state.user);
     
    const requestForm = () => {
        setIsLoading(true);
        const collectionRef = collection(firestore, 'Request Form');
        addDoc(collectionRef, {
            date: date,
            address: address,
            description: description,
            reqStatus: 'Pending',
            userId: userData[0].userId,
            servitorId: servitorId,
        })
        .then(()=>{
            setIsLoading(false);
            Confirm();
        }). catch((e) => {
            setIsLoading(false);
            alert(e.message);
        })

    }

    
    // const [servitors,setServitors] = useState({});

    // useEffect(()=>{
    //     const getData = async ()=>{
    //         let data =  await getDocs(collection(db, "servitors"))
    //         setServitors(
    //             data.docs.map((doc)=>(
    //                 doc.data()
    //             ))
    //             ) 
    //     }
    //     getData()
      
    // },[])
    // // console.log('servitor', servitors);

    
    return(
        <View style={styles.container}>
              <SafeAreaView>
                  <Header setIsOpen={setIsOpen} navigation={navigation} withBackIcon={true} />
                  {isOpen&&<PopUp navigation={navigation} />}
                  <ScrollView>
                  <KeyboardAvoidingView behavior="position">
                  <View style={styles.top}>
                    <View style={{width:Dimensions.get('window').width*0.2, height:Dimensions.get('window').width*0.2, backgroundColor: '#9f9d9e', borderRadius:Dimensions.get('window').width*0.2}}>
                      <Image source={{uri:sevPic}} style={{width: Dimensions.get('window').width*0.2,height: Dimensions.get('window').width*0.2, borderRadius:Dimensions.get('window').width*0.2}}/>
                         
                    </View>
                    <View>
                        <Text style={{color: '#fff', fontSize: 18}}>{userData[0].firstName}</Text>
                        <Text style={{color: '#fff', fontSize: 15}}>{userData[0].email}</Text>
                        <Text style={{color: '#fff'}}>{userData[0].telNo}</Text>
                    </View>
                  </View>
                  <View style={styles.details}>
                        <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 5,}}>{sevName}</Text>
                        <Text style={{color: '#fff', fontSize: 16,}}>{sevType}</Text>
                  </View> 
                  <View style={{marginTop: Dimensions.get('window').height*0.04,}} />
                   <CustomInput icon='md-calendar-sharp' setValue={setDate} placeholder='Date' />
                   <CustomInput icon='md-location-sharp' setValue={setAddress} placeholder='Address' />

                  <View style={styles.desc}>
                       <TextInput style={{color: '#fff', fontSize: 16}}placeholder='Description' placeholderTextColor='gray' onChangeText={(text)=>setDescription(text)} value={description} />
                  </View>
                  <View style={styles.button}>
                        <CustomeBtn text={'Confirm'} onPress={requestForm}/>
                        {isLoading&&<ActivityIndicator size="large" color="#D428A8" />}
                  </View>
                  </KeyboardAvoidingView>
                  </ScrollView>
              </SafeAreaView>
        </View>
    )
}
export default RequestForm;

const styles=StyleSheet.create({
    container:{
        height: '100%',
        backgroundColor: 'black'
    },
    top:{
        marginTop: '10%',
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    details: {
        marginTop: '15%',
        width: '90%',
        alignSelf: 'center'
    },
     date: {
        marginTop: '10%',
        width: '90%',
        height: 70,
        alignSelf: 'center',
        backgroundColor: '#131313',
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
     },
     location: {
        marginTop: '5%',
        width: '90%',
        height: 70,
        alignSelf: 'center',
        backgroundColor: '#131313',
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
     },
     desc:{
        marginTop: '5%',
        width: '90%',
        alignSelf: 'center',
        height: 150,
        backgroundColor: '#131313',
        padding: 15,
        borderRadius: 25
     },
     button: {
        marginTop: '12%',
        height:80,
        alignSelf: 'center',
     }

})