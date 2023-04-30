import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { fetchContacts } from '../utils/contacts';
import { addAllContacts } from '../reducers/contacts';
import { FlatList, Text, View } from 'react-native';

export const ListContacts = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state) => state.contact.contacts);

  useEffect(() => {
    const getContacts = async () => {
      const data = await fetchContacts();
      if (data) {
        dispatch(addAllContacts(data));
      }
    };

    getContacts();
  }, [dispatch]);

  const renderItem = ({ item }: { item: any }) => (
    <View style={{ padding: 10 }}>
      <Text>{item.name}</Text>
      <Text>{item.phoneNumbers ? item.phoneNumbers[0].number : 'No phone number available (do not select this contact)'}</Text>
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
