import * as Contacts from 'expo-contacts'
import * as Location from 'expo-location'
import Toast from 'react-native-root-toast';

export const requestPermissions = async function (): Promise<Boolean> {

    // request permissions for location and contacts
    let { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
    let { status: contactStatus } = await Contacts.requestPermissionsAsync();
    if (locationStatus !== 'granted' || contactStatus !== 'granted'){
        return false
    }
    return true
}