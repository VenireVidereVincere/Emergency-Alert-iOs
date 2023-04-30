import { StyleSheet, Text, View } from 'react-native';
import { AppNavigator } from './src/routers/router';
import { store } from './src/store/store';
import { Provider } from 'react-redux'
import { RootSiblingParent } from 'react-native-root-siblings'

export default function App() {  
  return (
    <Provider store={store}>
      <RootSiblingParent>
        <AppNavigator />
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