import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Image, StyleSheet, Pressable, Dimensions, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-gradient-icon';
import Header from '../components/Header';
import * as ImagePicker from 'expo-image-picker';
import CustomInput from '../components/CustomInput';
import CustomeBtn from '../components/CustomeBtn';
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, firestore,storage } from '../config/firebase';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PopUp from '../components/PopUp';


export default function AccountSettings({ navigation }) {
  const {userData} = useSelector(state=>state.user);
  const [firstName, setFirstName] = useState(userData[0].firstName);
  const [lastName, setLastName] = useState(userData[0].lastName);
  const [email, setEmail] = useState(userData[0].email);
  const [telNo, setTelNo] = useState(userData[0].telNo);
  const [password, setPassword] = useState(userData[0].password);
  const [confPassword, setConfPassword] = useState(userData[0].password);
  const [image, setImage] = useState(userData[0].imgUrl);
  const [users, setUsers] = useState([]);
  const [isOpen,setIsOpen] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [description,setDescription] = useState(userData[0].description)


  useEffect(() => {
    const userCollectionRef = collection(firestore, "servitors")

    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(
        data.docs.map((doc) => ({
          name: doc.data().firstName,
          cellphone: doc.data().telNo,
          userId: doc.data().userId,
          email: doc.data().email,
          surname: doc.data().lastName,
          password: doc.data().password,
          description: doc.data().description,
        }))
      );
    }
    getUsers();
  }, []);

  let user = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].userId === auth.currentUser.uid) {
      user.push(users[i]);

    }
    


  }
  
  //Picking image
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  
  async function updateDetails(){
    
  }

  const updateUser = async () => {
    setIsLoading(true);
    const storageRef = ref(
      storage,
      `/images/${Date.now()}image`
    );
    const response = await fetch(image);
  const blob = await response.blob();

  await uploadBytesResumable(storageRef, blob).then((uploadTask)=>{
    getDownloadURL(uploadTask.ref).then(async(url) => {
      await updateDoc(doc(firestore,'servitors', userData[0].docId),{
              firstName: firstName,
              lastName: lastName,
              telNo: telNo,
              email: email,
              imgUrl: url,
              password: password,
              description: description,
    
            }).then(()=>{
              setIsLoading(false);
            }).catch(e=>{
              alert(e.message);
              setIsLoading(false);
            });
     
  }).then(()=>{
    alert('done');
    setIsLoading(false);
  })
  })
  };



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <Header setIsOpen={setIsOpen} navigation={navigation} withBackIcon={true} />
      {isOpen&&<PopUp navigation={navigation} />}
      <ScrollView style={{ backgroundColor: 'black' }}>
        <View style={{ marginTop: Dimensions.get('window').height * 0.04, }} />
        {user.map(() =>
        (
          <KeyboardAvoidingView behavior="position">
            <View style={{ ...styles.imageContainer }}>
              <View style={styles.container}>
                <Image
                  source={{ uri: image }}
                  style={{ ...styles.img }}
                />
                <View style={{ ...styles.imageIcon }}>
                  <Pressable
                    onPress={pickImage} >

                    <Icon

                      size={32}
                      colors={[
                        { color: "#B615DE", offset: "0", opacity: "1" },
                        { color: "#D428A8", offset: "1", opacity: "1" },
                      ]}
                      name="md-camera"
                      type="ionicon"
                    />
                  </Pressable>
                </View>
              </View>
            </View>
            <View style={{ marginTop: Dimensions.get('window').height * 0.04, }} />
            <View style={{ alignItems: 'center' }}>
              {/* /*
              using setValue and value on together on the custominput makes typing impossible for updating data
               */}
              <CustomInput icon='md-person-sharp' value={firstName}  setValue={setFirstName}/>
              <CustomInput icon='md-person-sharp'   value={lastName} setValue={setLastName}/>
              <CustomInput icon='md-call-sharp'  value={telNo} setValue={setTelNo}/>
              <CustomInput icon='md-mail-sharp'  value={email} setValue={setEmail}/>
              <CustomInput icon='md-create-sharp'  value={description} setValue={setDescription}/>
              <CustomInput icon='md-lock-closed' password={true}  value={password} secureTextEntry={true} setValue={setPassword}/>
              <CustomInput icon='md-lock-closed' password={true} value={confPassword} secureTextEntry={true} setValue={setConfPassword}/>

              <View style={{ marginTop: Dimensions.get('window').height * 0.04, }} />

              <CustomeBtn
                onPress={updateUser} text={'Update'} />
                {isLoading&&<ActivityIndicator size="large" color="#D428A8" />}
              <View style={{ marginTop: Dimensions.get('window').height * 0.02, }} />

            </View>

          </KeyboardAvoidingView>
        ))}
      </ScrollView>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    position: 'relative',
    borderRadius: Dimensions.get('window').width * 0.5,
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  img: {
    borderRadius: Dimensions.get('window').width * 0.5,
    width: '100%',
    height: '100%',
  },
  imageIcon: {
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '100%',
    bottom: 0,
    height: '24%',
    borderBottomRadius: Dimensions.get('window').width * 0.5,
    borderBottomRightRadius: Dimensions.get('window').width * 0.5,
    borderBottomLeftRadius: Dimensions.get('window').width * 0.5,
  },
  icon: {
    opacity: 1
  },

  submainview: {
    backgroundColor: '#131313',
    borderRadius: Dimensions.get('window').height * 0.07,
    paddingHorizontal: Dimensions.get('window').width * 0.03,
    height: Dimensions.get('window').height * 0.07,
    width: '93%',
    alignSelf: 'center',
    marginBottom: Dimensions.get('window').height * 0.02,
    alignItems: 'center',
  },
  inputs: {
    fontSize: 16,
  }
});