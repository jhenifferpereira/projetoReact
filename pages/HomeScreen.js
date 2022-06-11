// #2 Integration of Firebase Cloud Firestore Database
// https://aboutreact.com/react-native-firebase-cloud-firestore-db
 
import React from 'react';
import {View} from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
 
const HomeScreen = (props) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        paddingHorizontal: 35,
      }}>
      <Mytext text="Firebase Cloud Firestore Database Example" />
      <Mybutton
        title="Register (Add a Document)"
        customClick={
          () => props.navigation.navigate('RegisterBook')
        }
      />
      <Mybutton
        title="Update (Update any Field of Document)"
        customClick={
          () => props.navigation.navigate('UpdateBook')
        }
      />
      <Mybutton
        title="View (View a Single Document Record)"
        customClick={
          () => props.navigation.navigate('ViewBook')
        }
      />
      <Mybutton
        title="View All (View All Document Records)"
        customClick={
          () => props.navigation.navigate('ViewAllBook')
        }
      />
      <Mybutton
        title="Delete (Remove a Document/Field)"
        customClick={
          () => props.navigation.navigate('DeleteBook')
        }
      />
      <Mybutton
        title="Real Time Updates"
        customClick={
          () => props.navigation.navigate('RealTimeAddUpdateBook')
        }
      />
      <Mybutton
        title="Add Collection Under Document"
        customClick={
          () => props.navigation.navigate('AddOrderSummary')
        }
      />
    </View>
  );
};
 
export default HomeScreen;
