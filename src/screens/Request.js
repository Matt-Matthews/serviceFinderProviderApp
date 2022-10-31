import { View, StyleSheet, Text, Image, Pressable, Linking } from "react-native";
import React from "react";
import Header from "../components/Header";
import {SafeAreaView} from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import {firestore} from '../config/firebase';
import PopUp from "../components/PopUp";

const img = 'https://www.investnational.com.au/wp-content/uploads/2016/08/person-stock-2.png'


function Request({navigation,route}){
    const {data} = route.params;
    console.log(data);

    const [reqStatus,setReqStatus] = React.useState(data.reqStatus);
    const [isOpen,setIsOpen] = React.useState(false);

    function call(){
        Linking.openURL(`tel:${data.telNo}`)
    }

    // React.useEffect(async()=>{
    //     const collectionRef = collection(firestore,'users');
    //     await getDoc(doc(firestore,'Request Form', data.docId)).then(async(snapshot)=>{
    //         let temp = snapshot.data();
    //         let userQuery = query(collectionRef,where('userId','==',temp.userId));
    //         let customerData = await getDocs(userQuery).then((snapshot)=>snapshot.docs.map(doc=>(doc.data())));
    //         setCustomer(customerData);
    //     })
    //     console.log(customer);
    // },[])
    const complete = async (status)=>{
        await updateDoc(doc(firestore, "Request Form", data.docId),{reqStatus: status});
        setReqStatus(status);
      }

    return(
        <View style={styles.container}>
            <SafeAreaView>
                <Header setIsOpen={setIsOpen} withBackIcon={true} navigation={navigation} />
                {isOpen&&<PopUp navigation={navigation} />}
                <View style={styles.prof}>
                    <Image source={{uri:data.imgUrl}} style={{width: 150,height: 150,borderRadius: 150}} />
                </View>
                <View style={{marginTop: '10%', marginLeft: '4%'}}>
                    <Text style={{color: '#fff', fontSize: 18}}>
                         {data.firstName}
                    </Text>
                    <Text style={{color: '#fff', fontSize: 15}}>
                         customer
                    </Text>
                </View>
                <View style={{marginTop: '5%', marginLeft: '4%', width: '80%'}}>
                    <Text style={{color: '#fff', fontSize: 16}}>
                         {data.description}
                    </Text>
                </View>
                <Text style={{color: '#B615DE', fontSize: 15, marginLeft: '4%'}}>{reqStatus}</Text>
                <Pressable onPress={navigation.navigate('ServitorProfile')}>
                <View style={styles.call}>
                     <View style={{alignItems: 'center'}}>
                          <Text style={{color: '#fff', fontSize: 16,alignSelf: 'center'}}>{data.telNo}</Text>
                     </View>
                     <Pressable onPress={call} style={{width:45, height:45, borderRadius: 150, backgroundColor: '#D428A8', alignSelf: 'center', justifyContent: 'center'}}>
                           <Ionicons name="call" size={24} color="white" style={{alignSelf: 'center'}} />
                     </Pressable>
                </View>
                </Pressable>
                {reqStatus==='Pending'&&<View style={styles.buttons}>
                      <Pressable onPress={()=>complete('Approved')} style={{width:100, height:50, backgroundColor: '#D428A8', borderRadius: 25,justifyContent: 'center'}}>
                             <Text style={{color: '#fff', fontSize: 16,alignSelf: 'center',}}>Approve</Text>
                      </Pressable>
                      <Pressable onPress={()=>complete('Declined')} style={{width:100, height:50, borderRadius: 25, backgroundColor: '#131313',justifyContent: 'center'}}>
                             <Text style={{color: '#fff', fontSize: 16,alignSelf: 'center', color: '#B615DE'}}>Decline</Text>
                      </Pressable>
                </View>}
                {reqStatus==='Approved'&&<View style={{...styles.buttons,alignItems: 'center', justifyContent: 'center',}}>
                      <Pressable onPress={()=>complete('Done')} style={{width:100, height:50, backgroundColor: '#D428A8', borderRadius: 25,justifyContent: 'center',alignSelf: 'center',}}>
                             <Text style={{color: '#fff', fontSize: 16,alignSelf: 'center',}}>Done</Text>
                      </Pressable>
                      
                </View>}
                
            </SafeAreaView>
        </View>
    )
}
export default Request;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'black'
    },
    prof: {
        marginTop: '10%',
        width: 150,
        height: 150,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 150
    },
    call: {
        marginTop: '6%',
        width: '90%',
        height: 60,
        alignSelf: 'center',
        backgroundColor: '#131313',
        borderRadius: 25,
        justifyContent: 'center',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttons: {
        marginTop: '15%',
        width: '55%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
       
    }
})