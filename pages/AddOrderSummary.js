// #2 Integration of Firebase Cloud Firestore Database
// https://aboutreact.com/react-native-firebase-cloud-firestore-db
 
import React, {useState} from 'react';
import {View} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import firestore from '@react-native-firebase/firestore';
 
const AddOrderSummary = () => {
  // We will insert these Dummy Order in use collection
  const dummyOrder = [
    {
      itemId: 1,
      itemName: 'T-Shirt',
      itemQuantity: 5,
      amount: 5000,
    },
    {
      itemId: 2,
      itemName: 'Shoe',
      itemQuantity: 2,
      amount: 2000,
    },
  ];
 
  let [bookId, setbookId] = useState('');
  let [bookData, setBookData] = useState({});
 
  const searchBook = () => {
    if (bookId) {
      firestore()
        .collection('123456')
        .doc(bookId)
        .get()
        .then((documentSnapshot) => {
          let bookDetails = {};
          if (documentSnapshot.exists) {
            bookDetails = documentSnapshot.data();
            bookDetails['id'] = documentSnapshot.id;
          }
          setBookData(bookDetails);
        });
    }
  };
 
  const updateOrder = () => {
    if (bookId) {
      let newOrderCollection = firestore()
        .collection('123456')
        .doc(bookId)
        .collection('ordersummary');
      dummyOrder.forEach((item) => {
        newOrderCollection
          .add(item)
          .then(() => {
            alert('Added Successfully');
          })
          .catch((error) => {
            alert(`Exception: ${error}`);
          });
      });
    }
  };
 
  return (
    <View style={{paddingHorizontal: 35}}>
      <Mytextinput
        placeholder="Enter Book Id"
        onChangeText={(bookId) => setBookId(bookId)}
        value={bookId}
        style={{padding: 10}}
      />
      <Mybutton
        title="Search Book"
        customClick={searchBook}
      />
      {Object.keys(bookData).length ? (
        <Mybutton
          title="Add Order in Book Document"
          customClick={updateOrder}
        />
      ) : null}
    </View>
  );
};
 
export default AddOrderSummary;
