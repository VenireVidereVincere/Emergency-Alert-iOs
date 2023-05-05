import React, { FC, useEffect  } from "react";
import { View, Text, Pressable } from "react-native";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import type { Contact } from "../types/Contact";
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../types/RootStack'
import { setIsCountdownCancelled, reduceCurrentCountByOne, resetCurrentCount, setIsCountdownFinished ,  } from "../reducers/countdown";
import Toast from "react-native-root-toast";
import { current } from "@reduxjs/toolkit";
import { useStore } from "react-redux";

interface CountdownProps {
    navigation: StackNavigationProp<RootStackParamList, 'Countdown'>;
}

export const Countdown: FC<CountdownProps> = ({navigation}) => {
    const store = useStore();
    const dispatch = useAppDispatch()
    const contacts = useAppSelector((state) => state.contact.emergencyContacts)
    const currentCount = useAppSelector((state) => state.countdown.currentCount)

    const handleCancelledCountdown = () => {
        Toast.show('Cancelled!')
        navigation.navigate('Homepage')
    }

    const handleFinishedCountdown = () => {
        // TODO
        // HTTP request to server with contacts object to have SMS's sent 
        // to each contact
        // then redirect the user back to the homepage component
        Toast.show("FINISHED!")
        navigation.navigate('Homepage')
    }
    const cleanUp = () => {
        dispatch(resetCurrentCount())
        dispatch(setIsCountdownCancelled(false))
        dispatch(setIsCountdownFinished(false))
    }

   // Logic for the countdown. Checks if the countdown is finished or cancelled. 
    // If it's neither, it will dispatch the next count after 1 second has passed.
    useEffect(() => {
        
          const intervalId = setInterval(() => {
          const state = store.getState();
          const {
            isCountdownFinished,
            isCountdownCancelled,
            currentCount
          } = state.countdown;
      
          if (currentCount < 1) {
            clearInterval(intervalId);
            cleanUp()
            handleFinishedCountdown();
          } else if (isCountdownCancelled) {
            clearInterval(intervalId);
            cleanUp()
            handleCancelledCountdown();
          } else {
            dispatch(reduceCurrentCountByOne());
          }
        }, 1000);
      
        return () => {
          clearInterval(intervalId);
        };
      }, [store]);

    const handleCancelButtonPress = () => {
        dispatch(setIsCountdownCancelled(true))
    }

    return (
        <View>
            <Text>{currentCount}</Text>
            <Pressable onPress={handleCancelButtonPress}>
                <Text>CANCEL!</Text>
            </Pressable>
        </View>
    )
}