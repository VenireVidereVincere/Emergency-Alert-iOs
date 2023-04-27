import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Homepage } from '../components/Homepage';
import { Countdown } from '../components/Countdown';
import { ManageContacts } from '../components/ManageContacts';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Homepage} />
        <Stack.Screen name="Countdown" component={Countdown} />
        <Stack.Screen name="ManageContacts" component={ManageContacts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}