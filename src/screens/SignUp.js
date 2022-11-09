/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Dimensions,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from '@react-native-masked-view/masked-view';
import logo from '../assets/images/logo.png';
import CustomeBtn from '../components/CustomeBtn';
import CustomInput from '../components/CustomInput';
import  {auth, firestore}  from '../config/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {collection, addDoc, GeoPoint} from "firebase/firestore";
import * as Location from 'expo-location';


const SignUp = ({navigation}) => {
  const {height} = useWindowDimensions();
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [telNo,setTelNo] = useState('');
  const [password,setPassword] = useState('');
  const [confPassword,setConfPassword] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const [currLocation,setCurrLocation] = useState(new GeoPoint(-23.9168558,29.4576678))


  function onPress() {
    navigation.navigate('SignIn');
  }

  React.useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied!');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // const address = await Location.reverseGeocodeAsync(location.coords);
      // const yourGeoPoint = new firebase.firestore.GeoPoint(someLatitude, someLongitude);
      let temp = new GeoPoint(location.coords.latitude, location.coords.longitude);
      setCurrLocation(temp);
      console.log(currLocation);
    })();
  }, []);

  async function registerService(){
  
    const collectionRef = collection(firestore, 'servitors');
        if(firstName&&lastName&&email&&telNo&&password&&confPassword&&password===confPassword){
            setIsLoading(true);
            try{
                await createUserWithEmailAndPassword(auth,email,password).then((results)=>{
                    const userId = results.user.uid;
                    addDoc(collectionRef,{
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        telNo: telNo,
                        password: password,
                        userId: userId,
                        status:'Not verified',
                        serviceType: 'No service type',
                        description: 'No description',
                        ratings: 0,
                        imgUrl: 'https://firebasestorage.googleapis.com/v0/b/servitorfinderapp.appspot.com/o/images%2Favatar.png?alt=media&token=b6bf2c5a-3b25-41a1-b236-db3f3b9f4986',
                        location: currLocation,
                    }).then(()=>{
                      navigation.navigate('RegisterService',{userId: userId});
                        setIsLoading(false);

                    })
                })
            }catch(e){
                alert(e.message);
            }
        }else{
            alert('complete the form')
        }
  }
  
  return (
    <SafeAreaView style={[styles.root]}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          style={{flex: 1, height: height}}
          behavior="height"
          enabled={true}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <Image
                style={{height: height * 0.2, marginTop: height * 0.03}}
                source={logo}
                resizeMode="contain"
              />
              <Text style={styles.heading}>Sign up</Text>
              <CustomInput icon='md-person-sharp' setValue={setFirstName} placeholder='Firstname' />
              <CustomInput icon='md-person-sharp' setValue={setLastName} placeholder='Lastname' />
              <CustomInput icon='md-call-sharp' setValue={setTelNo} placeholder='Mobile number' />
              <CustomInput icon='md-mail-sharp' setValue={setEmail} placeholder='Email' />
              <CustomInput icon='md-lock-closed' setValue={setPassword} secureTextEntry={true} password={true} placeholder='Create password' />
              <CustomInput icon='md-lock-closed' setValue={setConfPassword} secureTextEntry={true} password={true} placeholder='Confirm password' />
              <View style={{marginTop: Dimensions.get('window').height*0.03,}} />
                    
              <CustomeBtn text={'Sign up'} onPress={registerService} /> 
              {isLoading&&<ActivityIndicator size="large" color="#D428A8" />}
              <View style={{marginTop: Dimensions.get('window').height*0.04,}} />
              <View style={[styles.centre]}>
                <Text style={{color: '#fff',}}>Already have an account?</Text>
                <MaskedView
                  maskElement={
                    <Text onPress={onPress} style={[styles.text, styles.font]}>
                      Sign in
                    </Text>
                  }>
                  <LinearGradient
                    colors={['#B615DE', '#D428A8']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <Text
                      onPress={onPress}
                      style={[styles.text, styles.font, {opacity: 0}]}>
                      Sign up
                    </Text>
                  </LinearGradient>
                </MaskedView>
              </View>
              
            </View>
            
          </ScrollView>
          
        </KeyboardAvoidingView>
        <View style={{marginTop: Dimensions.get('window').height*0.0458,}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'black',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  left: {
    marginTop: 10,
    paddingLeft: 20,
  },
  centre: {
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
  },
  font: {
    fontSize: 17,
  },
});

export default SignUp;
