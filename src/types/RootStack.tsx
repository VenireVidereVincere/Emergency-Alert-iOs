import { Contact } from "./Contact";

export type RootStackParamList = {
    Home: undefined;
    ListContacts: undefined;
    ManageEmergencyContacts: undefined;
    ModifyEmergencyContact: { contact: Contact };
  };