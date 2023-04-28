import React, { FC } from 'react';
import { View, Button, StyleSheet, Pressable } from 'react-native';

type HomepageProps = {};


export const Homepage: FC<HomepageProps> = ({}) => {
  return (
    <View>
      <Button
        title='REQUEST PERMISSIONS'
        accessibilityLabel='Request permissions'
        onPress={() => {console.log("Request permissions pressed")}}
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