import React, { FC } from 'react';
import { View, Button, StyleSheet, Pressable } from 'react-native';
import { getPlatform } from '../reducers/platform';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { requestPermissions } from '../utils/permissions'
import { fetchContacts } from '../utils/contacts';
import { useNavigation } from '@react-navigation/native';

type HomepageProps = any;


export const Homepage: FC<HomepageProps> = ({ navigation }) => {
  // dispatch hook
  const dispatch = useAppDispatch()
  // navigation hook
  
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
        onPress={() => navigation.navigate('ManageContacts')}
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