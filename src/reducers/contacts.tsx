import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Contact } from '../types/Contact'


interface ContactsState {
  contacts: Contact[];
}

const initialState: ContactsState = {
  contacts: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
    removeContact: (state, action: PayloadAction<Contact>) => {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload.id);
    },
  },
});

export const { addContact, removeContact } = contactsSlice.actions;

export default contactsSlice.reducer;