import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { ThemeProvider } from '@rneui/themed';
import { theme } from './src/theme/Theme'
import { GIFSearch } from './src/screen/gif-search/GIFSearch'
import 'react-native-gesture-handler';


const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="GIFSearch" >
            <Stack.Screen name="GIFSearch" component={GIFSearch}  />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
