import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { fetchContacts } from '../utils/contacts';
import { addAllContacts, addEmergencyContact } from '../reducers/contacts';
import { FlatList, Text, View } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { changeSelectedContact } from '../reducers/misc';
import type { Contact } from '../types/Contact'
import Toast from 'react-native-root-toast';
import { RootState } from '../store/store';

type ListContactProps = any

export const ListContacts: React.FC<ListContactProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state) => state.contact.contacts);
  const selectedContact = useAppSelector((state) => state.misc.selectedContact)
  const toastMessage = useAppSelector((state) => state.contact.toastMessage); // add this
  const errorMessage = useAppSelector((state)=> state.contact.errorMessage)
  useEffect(() => {
    const getContacts = async () => {
      const data = await fetchContacts();
      dispatch(addAllContacts(data || []))
    };
    getContacts();
  }, [dispatch]);


  // Handles the user pressing 'select contact' under a specific contact
  const onSelectContact = (contact: Contact): void => {
    dispatch(addEmergencyContact(contact))
    Toast.show(toastMessage!!, {
      duration: Toast.durations.LONG })
      if (!errorMessage) {
        dispatch(changeSelectedContact({selectedContact: -1}))
    }
  
  }

  // Handles the user pressing a contact from the FlatList 
  const onPressContact = (id: number): void => {
    dispatch(changeSelectedContact({selectedContact: id}))
  } 

  const renderItem = ({ item }: { item: any }) => (
    <View style={{ padding: 10 }}>
      <TouchableWithoutFeedback onPress={() => onPressContact(item.id)}>
        <Text>{item.name}</Text>
        <Text>{item.phoneNumbers ? item.phoneNumbers[0].number : 'No phone number available (do not select this contact)'}</Text>
      </TouchableWithoutFeedback>
      {selectedContact === item.id &&
        <TouchableOpacity onPress={() => {
          let contact = {
            id: item.id,
            name: item.name,
            phoneNumbers: item.phoneNumbers,
            personalizedMessage: "EMERGENCY! I am in need of immediate assistance! Please help me out!"
          }
          onSelectContact(contact)
        }}>
          <Text> Select Contact</Text>
        </TouchableOpacity>
      }
    </View>
  );

  return (
    <FlatList
      data={contacts}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};