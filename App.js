import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AppNavigator } from './src/routers/router';
import { store } from './src/store/store';
import { Provider } from 'react-redux'
import { Homepage } from './src/components/Homepage';
import { useAppDispatch, useAppSelector } from './src/hooks/hooks';
import { getPlatform } from './src/reducers/platform';
import { useEffect } from 'react';

export default function App() {
    const dispatch = useAppDispatch()
    useEffect(() => {
      dispatch(getPlatform())
    }, [dispatch])
    
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <Homepage></Homepage>
      </Provider>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
