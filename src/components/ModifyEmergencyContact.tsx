import React, { FC } from 'react'
import { View, Text, Button } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../types/RootStack'
import { TextInput } from 'react-native-gesture-handler'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { modifyEmergencyContact } from '../reducers/contacts'
import Toast from 'react-native-root-toast'

type ModifyEmergencyContactProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ModifyEmergencyContact'>;
  route: RouteProp<RootStackParamList, 'ModifyEmergencyContact'>;
}

export const ModifyEmergencyContact: FC<ModifyEmergencyContactProps> = ({ navigation, route }) => {
    const dispatch = useAppDispatch()
    console.log(route.params)
    const contact = route.params.contact
    const emergencyContacts = useAppSelector((state) => state.contact.emergencyContacts)
    const contactIndex = emergencyContacts.findIndex((c) => c.id === contact.id);
    console.log(contactIndex)
    console.log(contact)
    
    const handlePersonalizedMessageChange = (text: string) => {
        dispatch(modifyEmergencyContact({
            index: contactIndex,
            personalizedMessage: text
        }))
    }
    
    const handleCancelPress = () => {
        dispatch(modifyEmergencyContact({
            index: contactIndex,
            personalizedMessage: contact.personalizedMessage!!
        }))
        Toast.show('Cancelled')
        navigation.navigate('ManageEmergencyContacts')
    }

    const handleConfirmPress = () => {
        Toast.show('Change successful!')
        navigation.navigate('ManageEmergencyContacts')
    }

    return (
        <View>
            <Text>{contact.name}</Text>
            <Text>{contact.phoneNumbers!![0].number}</Text>
            <TextInput
                value={contact.personalizedMessage}
                onChangeText={(text) => {handlePersonalizedMessageChange(text)}}            
                
            />
            <Button title="Cancel" onPress={handleCancelPress} />
            <Button title="Confirm" onPress={handleConfirmPress} />
        </View>
    )
}