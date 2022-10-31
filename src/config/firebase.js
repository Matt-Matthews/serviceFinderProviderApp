import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAcQFPrX-tB_lh_p5yRkucppNGpbkTp-Rc",
  authDomain: "servitorfinderapp.firebaseapp.com",
  projectId: "servitorfinderapp",
  storageBucket: "servitorfinderapp.appspot.com",
  messagingSenderId: "1006481165916",
  appId: "1:1006481165916:web:7a221c35cda7ea83882099"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {auth, firestore,storage};