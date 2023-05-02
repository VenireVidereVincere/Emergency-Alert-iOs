import React, { useEffect } from "react";
import { View } from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { RootState } from "../store/store";

export const ManageEmergencyContacts = function () {
    
    useEffect(() => {
        const contacts = useAppSelector((state: RootState) => state.contact.emergencyContacts)
    }, [(state: RootState) => state.contact.emergencyContacts])
    
    return (
        <View>

        </View>
    )
}