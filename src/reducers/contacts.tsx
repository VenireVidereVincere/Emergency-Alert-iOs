import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Contact } from '../types/Contact'
import type { Contact as ExpoContact } from 'expo-contacts'

interface ContactsState {
  contacts: Contact[],
  emergencyContacts: Contact[];
}

const initialState: ContactsState = {
  contacts: [],
  emergencyContacts: []
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addAllContacts: (state, action: PayloadAction<ExpoContact[]>) => {
      state.contacts = action.payload
    },
    removeAllContacts: (state) => {
      state.contacts = []
    },
    addEmergencyContact: (state, action: PayloadAction<Contact>) => {
      state.emergencyContacts.push(action.payload);
    },
    removeEmergencyContact: (state, action: PayloadAction<Contact>) => {
      state.emergencyContacts = state.emergencyContacts.filter(contact => contact.id !== action.payload.id);
    },
  },
});

export const { addEmergencyContact, removeEmergencyContact, addAllContacts, removeAllContacts } = contactsSlice.actions;

export default contactsSlice.reducer;