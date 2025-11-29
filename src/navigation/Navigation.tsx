import { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from '../utils/NavigationUtils';

import LoginScreen from '../screens/LoginScreen';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import BusListScreen from '../screens/BusListScreen';
import SeatSelectionScreen from '../screens/SeatSelectionScreen';
import PaymentFailedScreen from '../screens/PaymentFailedScreen';
import PaymentSuccessScreen from '../screens/PymentSuccessScreen';

const Stack = createNativeStackNavigator();
const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
      initialRouteName='SplashScreen'
      screenOptions={{
        headerShown: false,
      }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="BusListScreen" component={BusListScreen} />
        <Stack.Screen name="SeatSelectionScreen" component={SeatSelectionScreen} />
        <Stack.Screen name="PaymentSuccessScreen" component={PaymentSuccessScreen} />
        <Stack.Screen name="PaymentFailedScreen" component={PaymentFailedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;