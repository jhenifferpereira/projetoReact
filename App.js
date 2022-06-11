// #2 Integration of Firebase Cloud Firestore Database
// https://aboutreact.com/react-native-firebase-cloud-firestore-db
 
import 'react-native-gesture-handler';
 
import * as React from 'react';
 
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
 
import HomeScreen from './pages/HomeScreen';
import RegisterBook from './pages/RegisterBook';
import UpdateBook from './pages/UpdateBook';
import ViewAllBook from './pages/ViewAllBook';
import ViewBook from './pages/ViewBook';
import DeleteBook from './pages/DeleteBook';
import RealTimeAddUpdateBook from './pages/RealTimeAddUpdateBook';
import AddOrderSummary from './pages/AddOrderSummary';
 
const Stack = createStackNavigator();
 
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#03A89E', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{title: 'Home'}}
        />
        <Stack.Screen
          name="RegisterBook"
          component={RegisterBook}
          options={{title: 'Register'}}
        />
        <Stack.Screen
          name="UpdateBook"
          component={UpdateBook}
          options={{title: 'Update'}}
        />
        <Stack.Screen
          name="ViewAllBook"
          component={ViewAllBook}
          options={{title: 'View All'}}
        />
        <Stack.Screen
          name="ViewBook"
          component={ViewBook}
          options={{title: 'View'}}
        />
        <Stack.Screen
          name="DeleteBook"
          component={DeleteBook}
          options={{title: 'Delete'}}
        />
        <Stack.Screen
          name="RealTimeAddUpdateBook"
          component={RealTimeAddUpdateBook}
          options={{title: 'Real Time Updates'}}
        />
        <Stack.Screen
          name="AddOrderSummary"
          component={AddOrderSummary}
          options={{title: 'Add Order Summary'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
 
export default App;