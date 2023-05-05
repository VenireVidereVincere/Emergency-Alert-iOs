import React, { FC, useEffect  } from "react";
import { View, Text, Pressable } from "react-native";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../types/RootStack'
import { setIsCountdownCancelled, reduceCurrentCountByOne, resetCurrentCount, setIsCountdownFinished ,  } from "../reducers/countdown";
import Toast from "react-native-root-toast";
import { useStore } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler } from "react-native/Libraries/Utilities/BackHandler";

interface CountdownProps {
    navigation: StackNavigationProp<RootStackParamList, 'Countdown'>;
}

export const Countdown: FC<CountdownProps> = ({navigation}) => {
    const store = useStore();
    const dispatch = useAppDispatch()
    const contacts = useAppSelector((state) => state.emergencyContacts.emergencyContacts)
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
          const state: any = store.getState();
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

    // Handling cleanup and cancellation of emergency messages on "back" button press
    // Will handle both physical and digital back presses
    useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
            // Code to handle back button press
            cleanUp()
            dispatch(setIsCountdownCancelled(true))
            return false; // Return true if you want to block the default back button action
          };
          // Add event listener for back button press
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
          // Remove event listener on cleanup
          return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
      );

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