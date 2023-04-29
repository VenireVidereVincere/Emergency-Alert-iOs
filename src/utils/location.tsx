import * as Location from 'expo-location';
import Toast from 'react-native-root-toast';
import type { LocationType } from '../types/Location';
import { addLocation } from '../reducers/location';
import { useAppDispatch } from '../hooks/hooks';

// Checks if the location services are on. In case they're not, prompts the user to turn them on.
// Once they are on, it calls the fetchCurrentLocation function and stores the location in the store.
const checkLocationServicesAndGetLocation = async function (): Promise<void> {
  const status: boolean = await Location.hasServicesEnabledAsync();
  if (status) {
    // Runs if the location services are on.
    await fetchCurrentLocation();
  } else {
    // Displays the popup to request the user to turn them on in case they were off.
    const result: void = await Location.enableNetworkProviderAsync()
      .then(async (): Promise<void> => {
        // Runs in case the user turned them on during the popup
        await fetchCurrentLocation();
      })
      .catch((error: any): void => {
        // Runs in case the user didn't turn location services on.
        if (error.code === 'ERR_CANCELLED') {
          let toast = Toast.show("Turn location services on for the app to be able to send it to trusted contacts in an emergency", {
            duration: Toast.durations.LONG
          });
        }
      });
  }
};

// Retrieves last known location. Shouldn't be used on its own, but rather call the checkLocationServicesAndGetLocation function
const fetchCurrentLocation = async function (): Promise<void> {
    const dispatch = useAppDispatch()
    let locationObject : any = await Location.getCurrentPositionAsync({});
    let location: LocationType = {
        latitude: locationObject.coords.latitude,
        longitude: locationObject.coords.longitude
    }

    dispatch(addLocation(location))
};