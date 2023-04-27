import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Hello } from './src/components/homepageButton'
import { AppNavigator } from './routers/router';
import { store } from './src/store/store';

export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <AppNavigator />  
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
