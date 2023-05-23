import * as Location from 'expo-location';
import Toast from 'react-native-root-toast';
import type { LocationType } from '../types/Location';
import { setLocation } from '../reducers/location';

// Checks if the location services are on. In case they're not, prompts the user to turn them on.
// Once they are on, it calls the fetchCurrentLocation function and stores the location in the store.
export const checkLocationServicesAndGetLocation = async function (dispatch:any): Promise<boolean> {
  const status: boolean = await Location.hasServicesEnabledAsync();
  if (status) {
    // Runs if the location services are on.
    await fetchCurrentLocation(dispatch);
    return true;
  } else {
    // Displays the popup to request the user to turn them on in case they were off.
    try {
      await Location.enableNetworkProviderAsync();
      // Runs in case the user turned them on during the popup
      await fetchCurrentLocation(dispatch);
      return true;
    } catch (error: any) {
      // Runs in case the user didn't turn location services on.
      if (error.code === 'ERR_CANCELLED') {
        let toast = Toast.show("Turn location services on for the app to be able to send it to trusted contacts in an emergency", {
          duration: Toast.durations.LONG
        });
      }
      return false;
    }
  }
};

// Retrieves last known location. Shouldn't be used on its own, but rather call the checkLocationServicesAndGetLocation function
const fetchCurrentLocation = async function (dispatch: any): Promise<void> {

    let locationObject : any = await Location.getCurrentPositionAsync({});
    let location: LocationType = {
        latitude: locationObject.coords.latitude,
        longitude: locationObject.coords.longitude
    }
    dispatch(setLocation(location))
};