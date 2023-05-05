import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Contact } from '../types/Contact'
import type { Contact as ExpoContact } from 'expo-contacts'

interface ContactsState {
  contacts: Contact[],
  errorMessage?: string | null;
  toastMessage?: string | null;
}

const initialState: ContactsState = {
  contacts: [],
  errorMessage: null,
  toastMessage: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    // Handles adding all contacts retrieved from address book to state in order to then render in FlatList in order for the user to select an Emergency Contact 
    addAllContacts: (state, action: PayloadAction<ExpoContact[]>) => {
      state.contacts = action.payload
    },
    // Handles clearing all contacts from addAllContacts to reduce memory usage, gets called only once the FlatList component dismounts.
    removeAllContacts: (state) => {
      state.contacts = []
    }
  },
});

export const { addAllContacts, removeAllContacts } = contactsSlice.actions;

export default contactsSlice.reducer;