import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Contact } from '../types/Contact'
import type { Contact as ExpoContact } from 'expo-contacts'

interface ContactsState {
  contacts: Contact[],
  emergencyContacts: Contact[];
  errorMessage?: string | null;
  toastMessage?: string | null;
}

const initialState: ContactsState = {
  contacts: [],
  emergencyContacts: [],
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
    },
    // Handles adding a single contact selected from the FlatList into the state, which will be stored on a file for perm storage
    addEmergencyContact: (state, action: PayloadAction<Contact>) => {
      // Check for duplicates
      if (state.emergencyContacts.some(contact => {
        return contact.id === action.payload.id;
      })) {
        // If it's duplicate
        state.errorMessage = "The selected contact is already an Emergency Contact";
        state.toastMessage = state.errorMessage;
      } else {
        // If it's not duplicate
        
        state.emergencyContacts = [...state.emergencyContacts, action.payload]
        state.toastMessage = "Contact added successfully";
        state.errorMessage = undefined
      }
    },
    // Handles removing a single contact selected from the current list of Emergency Contacts Flat List in the Manage Contacts component.
    removeEmergencyContact: (state, action: PayloadAction<Contact>) => {
      state.emergencyContacts = state.emergencyContacts.filter(contact => contact.id !== action.payload.id);
    },
    modifyEmergencyContact: (state, action: PayloadAction<{ index: number, personalizedMessage: string }>) => {
      const { index, personalizedMessage } = action.payload;
        const updatedContact = {
          ...state.emergencyContacts[index],
          personalizedMessage
        };
        state.emergencyContacts[index] = updatedContact;
      },
    //Reducer to handle showing or not showing the "Select contact" button in the FlatList from addAllContacts,
    toggleIsSelected: (state, action: PayloadAction<Boolean>) => {
      
    }
  },
});

export const { addEmergencyContact, removeEmergencyContact, addAllContacts, removeAllContacts, modifyEmergencyContact } = contactsSlice.actions;

export default contactsSlice.reducer;