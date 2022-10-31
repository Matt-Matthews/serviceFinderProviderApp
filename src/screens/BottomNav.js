import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from '../components/CustomTabBar';
import Map from './Map';
import Services from './Services';
import Notifications from './Notifications';
import Settings from './Settings';


const Tab = createBottomTabNavigator();

export default function BottomNav() {
  return (
    <Tab.Navigator 
    
        screenOptions={{
            headerShown: false, 
            }}
        tabBar={(props) => <CustomTabBar {...props} />}
        sceneContainerStyle={{backgroundColor: '#000'}}
        >
      <Tab.Screen t name="Home" component={Services} />
      <Tab.Screen t name="Map" component={Map} />
      <Tab.Screen t name="Notifications" component={Notifications} />
      <Tab.Screen t name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
