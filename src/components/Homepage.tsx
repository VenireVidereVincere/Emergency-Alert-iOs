import React, { FC } from 'react';
import { View, Button} from 'react-native';
import { getPlatform } from '../reducers/platform';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/hooks';
import { requestPermissions } from '../utils/permissions'

type HomepageProps = any;


export const Homepage: FC<HomepageProps> = ({ navigation }) => {
  // dispatch hook
  const dispatch = useAppDispatch()
  // navigation hook
  
  // The platform gets loaded into state when the app is launched and the main component loaded so other components can use it later. 
  useEffect(() => {
    dispatch(getPlatform())
  }, [dispatch])
  

  return (
    <View>
      <Button
        title='REQUEST PERMISSIONS'
        accessibilityLabel='Request permissions'
        onPress={requestPermissions}
      />
      <Button
        title='ADD EMERGENCY CONTACTS'
        accessibilityLabel='Add emergency contacts'
        onPress={() => navigation.navigate('ListContacts')}
      />
      <Button
        title='MANAGE EMERGENCY CONTACTS'
        accessibilityLabel='Manage emergency contacts'
        onPress={() => navigation.navigate('ManageEmergencyContacts')}
      />
      <Button
        title='EMERGENCY'
        accessibilityLabel='Emergency'
        color='red'
        onPress={() => {console.log("Emergency pressed")}}
      />
    </View>
  )
};