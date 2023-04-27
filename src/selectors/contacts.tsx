import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { Contact } from '../types/Contact';

export const selectContactById = (contactId: string) => createSelector(
  (state: RootState) => state.contact.contacts,
  (contacts: Contact[]) => contacts.find((contact: Contact) => contact.id === contactId)
);