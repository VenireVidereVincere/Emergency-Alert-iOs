import React, { FC } from 'react';
import { View, Button, StyleSheet, Pressable } from 'react-native';
import { requestLocationPermission } from '../utils/permissions/permissions';
import { getPlatform } from '../reducers/platform';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { selectPlatform } from '../selectors/platform';

type HomepageProps = {};


export const Homepage: FC<HomepageProps> = ({}) => {
  const dispatch = useAppDispatch()
  const platform = useAppSelector(selectPlatform)
  
  useEffect(() => {
    dispatch(getPlatform())
  }, [dispatch])
  
  return (
    <View>
      <Button
        title='REQUEST PERMISSIONS'
        accessibilityLabel='Request permissions'
        onPress={requestLocationPermission}
      />
      <Button
        title='ADD EMERGENCY CONTACTS'
        accessibilityLabel='Add emergency contacts'
        onPress={() => {console.log("Add contact pressed")}}
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