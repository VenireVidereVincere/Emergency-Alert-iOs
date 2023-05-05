import { StyleSheet, Text, View } from 'react-native';
import { AppNavigator } from './src/routers/router';
import { store } from './src/store/store';
import { Provider } from 'react-redux'
import { RootSiblingParent } from 'react-native-root-siblings'
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './src/store/store'

export default function App() {  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootSiblingParent>
            <AppNavigator />
          </RootSiblingParent>
      </PersistGate>
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