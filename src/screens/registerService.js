import React from "react";
import { StyleSheet, Text, View, Image, StatusBar, Dimensions, ScrollView, KeyboardAvoidingView, Pressable, ActivityIndicator } from "react-native";
import icon from '../assets/images/logo.png';
import { useState } from "react";
import CustomeBtn from "../components/CustomeBtn";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "../components/CustomInput";
import RegisterFilter from "../components/RegisterFilter";
import FileInput from "../components/FileInput";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage, firestore } from "../config/firebase";
import {collection, addDoc,query,where,getDocs,doc,updateDoc } from "firebase/firestore";


export default function RegisterService({navigation,route}) {
    const [index, setIndex] = useState(0);
    const [files,setFiles] = useState([]);
    const [idNo,setIdNo] = useState('');
    const [address,setAddress] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [companyName,setCompanyName] = useState('');
    const [regNo,setRegNo] = useState('');
    const [isLoading,setIsLoading] = useState(false);
  
    // console.log(files[0]._data.name);
    const {userId} = route.params;

    async function updateServitor(){
        const collectionRef = collection(firestore, 'servitors');
        let servQuery = query(collectionRef,where('userId','==',userId));
        try{
            await getDocs(servQuery).then(snapshot=>{
                let data = snapshot.docs.map(item=>({...item.data(), docId: item.id}));
                data.forEach(item=>{
                    if(index===0){
                        if(serviceType&&address&&idNo){
                            updateDoc(doc(firestore,'servitors',item.docId),{
                                serviceType: serviceType,
                                address: address,
                                idNo: idNo,
                        }).then(()=>{
                            setIsLoading(false);
                            navigation.navigate('SignIn');
                        })
                        }else alert('input the required data')
                        
                }else {
                    if(serviceType&&address&&regNo&&companyName){
                        updateDoc(doc(firestore,'servitors',item.docId),{
                            serviceType: serviceType,
                                address: address,
                                regNo: regNo,
                                companyName: companyName,
        
                        }).then(()=>{
                            setIsLoading(false);
                            navigation.navigate('SignIn');
                        })
                    }else alert('input the required data')
                   
                }
                })
            })
        }catch(e){
            alert(e.message);
            setIsLoading(false);
        }
       
    }

    async function uploadDocs(){
        setIsLoading(true);
        if(!files) return;
        console.log(files.length);
        if(index===0&&files.length<4){
            alert('Four(4) documents requried');
        }else if(index===1&&files.length<1){
            alert('The document is requried');
        }else{
             const collectionRef = collection(firestore, 'documents');
        files.forEach(file=>{
            const storageRef = ref(storage, `myDocs/${file._data.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed", null ,
                (error) => console.log(error),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => { 
                        console.log("File available at", downloadURL);
                        
                        await addDoc(collectionRef,{link: downloadURL, userId:userId}).then(()=>{
                            console.log('done');
                        })
                        return downloadURL
                    });
                    }
                );
            });
            updateServitor();
        }
       
       
    }
   

    return (
        <SafeAreaView style={{backgroundColor: '#000', height: '100%'}}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />
            <ScrollView>
                <KeyboardAvoidingView behavior="padding">
            <View style={{ backgroundColor: "rgba(0, 0, 0, 1)", width: "100%",  }} >
                <Pressable onPress={()=>navigation.navigate('SignIn')}>
                    <Text style={styles.skip}>Skip for now</Text>
                </Pressable>
                <View style={{ justifyContent: "center" }}>
                    <Image source={icon} style={styles.logo} />
                </View>
                <Text style={styles.Reg}>Register service</Text>
                <View style={styles.Fregmant}>
                    <RegisterFilter index={index} setIndex={setIndex} />
                </View>
                {
                    index === 0 &&<View >
                        <View style={styles.viewInput}>
                            <CustomInput icon='md-person-sharp' setValue={setIdNo} placeholder='Id number' />
                            <CustomInput icon='md-location-sharp' setValue={setAddress} placeholder='Address' /> 
                        </View>
                        <CustomInput icon='md-construct-sharp' setValue={setServiceType} placeholder='Service type' />
                        <FileInput icon='md-document-attach-sharp' setValue={setFiles} placeholder='Upload id' />
                        <FileInput icon='md-home-sharp' setValue={setFiles} placeholder='Proof of residence' />
                        <FileInput icon='md-document-attach-sharp' setValue={setFiles} placeholder='Upload cv' />
                        <FileInput icon='md-document-attach-sharp' setValue={setFiles} placeholder='Supporting documents' />
                        
                       
                    </View>
                }
                {
                    index===1&&<View >
                    <View style={styles.viewInput}>
                        <CustomInput icon='md-person-sharp' setValue={setCompanyName} placeholder='Company name' />
                        <CustomInput icon='md-create-sharp' setValue={setRegNo} placeholder='Registration number' />
                    </View>
                    <CustomInput icon='md-construct-sharp' setValue={setServiceType} placeholder='Service type' />
                    <CustomInput icon='md-location-sharp' setValue={setAddress} placeholder='Address' />
                    <FileInput icon='md-document-attach-sharp' setValue={setFiles} placeholder='Upload certificate' />
                    
                </View>
                }
                 <View style={{marginTop: Dimensions.get('window').height*0.04,}} />
                        <View style={{alignSelf: 'center',}}>
                            <CustomeBtn onPress={uploadDocs} text='Upload' />
                        </View>
                        {isLoading&&<ActivityIndicator size="large" color="#D428A8" />}
                        <View style={{marginTop: Dimensions.get('window').height*0.04,}} />
            </View>
            </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    skip: {
        color: "white",
        alignSelf: "flex-end",
        color: "rgba(182, 21, 222, 100)",
        marginTop: 20,
        right: 20,
        position: "absolute"
    },
    logo: {
        width: 130,
        height: 130,
        marginBottom: 5,
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 25
    },
    Reg: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
        alignSelf: 'center'
    },
    viewInput: {
        marginTop: Dimensions.get('window').height*0.02,
    },
   
    chooseFile: {
        color: "white",
        marginLeft: 5,

        fontSize: 16,
        width: 100,
        backgroundColor: ' rgba(182, 21, 222, 1) 0%, rgba(212, 40, 168, 1) 100%',
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        height: 30,
        marginTop: 10

    },
    uploadView: {
        width: "80%",

        color: "#FFFAFA",
        borderWidth: 5,

        margin: 3,
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 8,

        borderRadius: 25,

        position: "relative",
        flexDirection: "row",


    },
    view2: {

        backgroundColor: ' rgba(182, 21, 222, 1) 0%, rgba(212, 40, 168, 1) 100%',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        width: 100,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        height: 52,

    },
    view1: {

        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        alignSelf: 'flex-start',
        height: 52,
        width: 200,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        position: "relative",
        flexDirection: "row",

        marginLeft: "auto",
        marginRight: "auto",


    },

});
