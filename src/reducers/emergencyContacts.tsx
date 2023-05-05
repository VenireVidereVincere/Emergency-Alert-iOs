import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Contact } from '../types/Contact'
import type { Contact as ExpoContact } from 'expo-contacts'

interface EmergencyContactsState {
    emergencyContacts: Contact[],
    errorMessage?: string | null;
    toastMessage?: string | null;
  }
  
  const initialState: EmergencyContactsState = {
    emergencyContacts: [],
    errorMessage: null,
    toastMessage: null,
  };
  
  const emergencyContactsSlice = createSlice({
    name: 'emergencyContacts',
    initialState,
    reducers: {
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
        }
    },
  });
  
  export const { addEmergencyContact, removeEmergencyContact, modifyEmergencyContact } = emergencyContactsSlice.actions;
  
  export default emergencyContactsSlice.reducer;















