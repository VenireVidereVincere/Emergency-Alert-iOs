import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AppNavigator } from './src/routers/router';
import { store } from './src/store/store';
import { Provider } from 'react-redux'
import { Homepage } from './src/components/Homepage';
import { RootSiblingParent } from 'react-native-root-siblings'

export default function App() {  
  return (
    <Provider store={store}>
      <RootSiblingParent>
        <View style={styles.container}>
            <Homepage></Homepage>
        </View>
      </RootSiblingParent>
    </Provider>
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