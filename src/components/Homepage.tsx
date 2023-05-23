import React, { FC } from 'react';
import { View, Button} from 'react-native';
import { getPlatform } from '../reducers/platform';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { requestPermissions } from '../utils/permissions'
import Toast from 'react-native-root-toast';
import { setMissingPermissionsError, deleteMissingPermissionsError } from '../reducers/misc';
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../types/RootStack'
import { checkLocationServicesAndGetLocation } from '../utils/location';

type HomepageProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Homepage'>
};


export const Homepage: FC<HomepageProps> = ({ navigation }) => {
  // dispatch hook
  const dispatch = useAppDispatch()
  const missingPermissionsError = useAppSelector((state) => state.misc.missingPermissionsError)
  
  // The platform gets loaded into state when the app is launched and the main component loaded so other components can use it later. 
  useEffect(() => {
    dispatch(getPlatform())
  }, [dispatch])
  

  return (
    <View>
      <Button
        title='REQUEST PERMISSIONS'
        accessibilityLabel='Request permissions'
        // the onPress method will ask for permissions, 
        // and if any is denied it will add a flag to the state to prevent the app from trying to open any view which requires permissions to be granted.
        onPress={() => {
          const permissionsGranted = requestPermissions()
          if (!permissionsGranted) {
            dispatch(setMissingPermissionsError({missingPermissionsError: 'Some permissions were denied, the app will not function normally.'}))
            Toast.show(missingPermissionsError!!)
          } else {
            dispatch(deleteMissingPermissionsError())
          }
        }}
      />
      <Button
        title='ADD EMERGENCY CONTACTS'
        accessibilityLabel='Add emergency contacts'
        // All onPress methods from buttons in this view will check if there's missing permissions. If any permission is missing, it will not navigate to any other fragment
        // because everything depends on the contacts / location permissions being enabled.
        onPress={() => {
          if(missingPermissionsError){
            Toast.show(missingPermissionsError!!)
          } else {
            navigation.navigate('ListContacts')
          }
        }}
      />
      <Button
        title='MANAGE EMERGENCY CONTACTS'
        accessibilityLabel='Manage emergency contacts'
        onPress={() => {
          if(missingPermissionsError){
            Toast.show(missingPermissionsError!!)
          } else {
            navigation.navigate('ManageEmergencyContacts')
          }
        }}
      />
      <Button
        title='EMERGENCY'
        accessibilityLabel='Emergency'
        color='red'
        onPress={() => {
          if(missingPermissionsError){
            Toast.show(missingPermissionsError!!)
          } else {
            if(!checkLocationServicesAndGetLocation(dispatch)){
              return
            }
            navigation.navigate('Countdown')
          }
        }}
      />
    </View>
  )
};