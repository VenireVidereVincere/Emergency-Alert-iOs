import * as Contacts from 'expo-contacts'
import Toast from 'react-native-root-toast'

export const fetchContacts = async function (): Promise<Contacts.Contact[] | undefined> {
    const { status } = await Contacts.requestPermissionsAsync()
    if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
            fields: [
                Contacts.Fields.ID,
                Contacts.Fields.PhoneNumbers
            ]
        })
        return data
    } else {
        Toast.show('Contacts permission was denied!', {
            duration: Toast.durations.LONG
        })
    }
}