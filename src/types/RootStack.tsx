import { Contact } from "./Contact";

export type RootStackParamList = {
    Homepage: undefined;
    ListContacts: undefined;
    ManageEmergencyContacts: undefined;
    ModifyEmergencyContact: { contact: Contact };
    Countdown: undefined;
  };