import React, { FC } from "react";
import { View, FlatList, TouchableWithoutFeedback, Pressable, Text } from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { Contact } from '../types/Contact'
import { changeSelectedContact } from "../reducers/misc";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../types/RootStack";
import { removeEmergencyContact } from "../reducers/contacts";
import Toast from "react-native-root-toast";

type ManageEmergencyContactsProps = {
    navigation: StackNavigationProp<RootStackParamList, 'ModifyEmergencyContact'>;
}

export const ManageEmergencyContacts: FC<ManageEmergencyContactsProps> = function ({navigation}) {
    
    const contacts = useAppSelector((state) => state.contact.emergencyContacts)
    const selectedContact = useAppSelector((state) => state.misc.selectedContact)
    const dispatch = useAppDispatch()

    const onPressContact = (id: string) => {
        dispatch(changeSelectedContact({selectedContact: Number(id)}))
    }

    const onSelectContact = (contact: Contact) => {
        navigation.navigate('ModifyEmergencyContact', { contact })
    }

    const handleRemoveContact = (item: Contact) => {
        dispatch(removeEmergencyContact(item))
        Toast.show('Contact removed successfully', {
            duration: Toast.durations.LONG
        })
    }

    const renderItem = ({ item }: { item: Contact}) => (
        <View>
            <TouchableWithoutFeedback onPress={() => onPressContact(item.id)}>
                <Text>{item.name}</Text>
                <Text>{item.phoneNumber ? item.phoneNumber[0].number : undefined}</Text>
            </TouchableWithoutFeedback>
            {selectedContact === Number(item.id) &&
                <>
                    <Pressable onPress={() => {
                        onSelectContact(item)
                    }}>
                        <Text> Modify Contact </Text>
                    </Pressable>
                    <Pressable onPress={() => {
                        handleRemoveContact(item)
                    }}>
                        <Text> Remove </Text>
                    </Pressable>
                </>}
        </View>
    )
    
    return (
        <FlatList
            data={contacts}
            keyExtractor={(contact) => contact.id}
            renderItem={renderItem}
        />
    )
}
