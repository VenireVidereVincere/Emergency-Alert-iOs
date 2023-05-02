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
    const { contact } = route.params
    const emergencyContacts = useAppSelector((state) => state.contact.emergencyContacts)
    const contactIndex = emergencyContacts.findIndex(item => item.id === contact.id)

    const [personalizedMessage, setPersonalizedMessage] = React.useState(contact.personalizedMessage)

    const handlePersonalizedMessageChange = (text: string) => {
        setPersonalizedMessage(text)
    }

    const handleCancelPress = () => {
        dispatch(modifyEmergencyContact({
            index: contactIndex,
            personalizedMessage: contact.personalizedMessage!!
        }))
        Toast.show("Cancelled", {
            duration: Toast.durations.LONG
        })
        navigation.navigate('ManageEmergencyContacts')
    }

    const handleConfirmPress = () => {
        Toast.show("Change successful", {
            duration: Toast.durations.LONG
        })
        navigation.navigate('ManageEmergencyContacts')
    }

    return (
        <View>
            <Text>{contact.name}</Text>
            <Text>{contact.phoneNumber!![0].number}</Text>
            <TextInput
                value={personalizedMessage}
                onChangeText={handlePersonalizedMessageChange}
            />
            <Button title="Cancel" onPress={handleCancelPress} />
            <Button title="Confirm" onPress={handleConfirmPress} />
        </View>
    )
}