import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Hello } from './src/components/homepageButton'
import { AppNavigator } from './routers/router';

export default function App() {
  return (
    <View style={styles.container}>
      <AppNavigator>

      </AppNavigator>
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
