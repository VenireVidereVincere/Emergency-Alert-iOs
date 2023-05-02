import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface selectedContactType {
    selectedContact: number
}

const initialState: selectedContactType = {
    selectedContact: -1
}

const miscSlice = createSlice({
    name: 'misc',
    initialState,
    reducers:{
        // State slice that keeps track of the selected Contact within the contacts list of the ListContacts component
        // It's a simple toggle to render/not render the button to select the contact.
        changeSelectedContact: (state, action: PayloadAction<selectedContactType>) => {
            state.selectedContact = action.payload.selectedContact
        }
    }
})

export const { changeSelectedContact } = miscSlice.actions;

export default miscSlice.reducer;