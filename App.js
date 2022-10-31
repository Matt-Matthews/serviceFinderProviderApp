import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';
import BottomNav from './src/screens/BottomNav';
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountSettings from './src/screens/AccountSettings';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import RegisterService from './src/screens/registerService';
import ServitorProfile from './src/screens/Profile';
import RequestForm from './src/screens/RequestForm';
import {Provider} from 'react-redux';
import store from './src/store';
import Request from './src/screens/Request';

console.disableYellowBox = true;
LogBox.ignoreAllLogs();

export default function App() {
  const Stack = createNativeStackNavigator();


  return (
    <Provider store={store}>
    <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown: false,}}>
      <Stack.Screen
          name="SignIn"
          component={SignIn}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
        />
        <Stack.Screen
          name="RegisterService"
          component={RegisterService}
        />
      <Stack.Screen
          name="BottomNav"
          component={BottomNav}
        />
         <Stack.Screen
          name="Profile"
          component={ServitorProfile}
        />
        <Stack.Screen
          name="RequestForm"
          component={RequestForm}
        />
         <Stack.Screen
          name="Request"
          component={Request}
        />
      <Stack.Screen
          name="AccountSettings"
          component={AccountSettings}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}


