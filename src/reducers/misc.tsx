import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface selectedContactType {
    selectedContact: number
}

interface missingPermissionsError {
    missingPermissionsError: string | undefined
}

interface InitialState extends selectedContactType, missingPermissionsError {}

const initialState: InitialState = {
  selectedContact: -1,
  missingPermissionsError: undefined
};

const miscSlice = createSlice({
    name: 'misc',
    initialState,
    reducers:{
        // State slice that keeps track of the selected Contact within the contacts list of the ListContacts component
        // It's a simple toggle to render/not render the button to select the contact.
        changeSelectedContact: (state, action: PayloadAction<selectedContactType>) => {
            state.selectedContact = action.payload.selectedContact
        },
        setMissingPermissionsError: (state, action:PayloadAction<missingPermissionsError>) => {
            state.missingPermissionsError = action.payload.missingPermissionsError
        },
        deleteMissingPermissionsError: (state) => {
            state.missingPermissionsError = undefined
        }
    }
})

export const { changeSelectedContact, setMissingPermissionsError, deleteMissingPermissionsError } = miscSlice.actions;

export default miscSlice.reducer;