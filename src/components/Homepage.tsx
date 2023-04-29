import React, { FC } from 'react';
import { View, Button, StyleSheet, Pressable } from 'react-native';
import { getPlatform } from '../reducers/platform';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { requestPermissions } from '../utils/permissions'
import { fetchContacts } from '../utils/contacts';

type HomepageProps = {};


export const Homepage: FC<HomepageProps> = ({}) => {
  // dispatch hook
  const dispatch = useAppDispatch()
  
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
        onPress={fetchContacts}
      />
      <Button
        title='MANAGE EMERGENCY CONTACTS'
        accessibilityLabel='Manage emergency contacts'
        onPress={() => {console.log("Manage contacts pressed")}}
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