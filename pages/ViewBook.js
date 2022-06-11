// #2 Integration of Firebase Cloud Firestore Database
// https://aboutreact.com/react-native-firebase-cloud-firestore-db
 
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import firestore from '@react-native-firebase/firestore';
 
const ViewBook = () => {
  let [bookId, setBookId] = useState('');
  let [bookData, setBookData] = useState({});
 
  const searchBook = () => {
    if (bookId) {
      firestore()
        .collection('123456')
        .doc(bookId)
        .get()
        .then((documentSnapshot) => {
          /*
            A DocumentSnapshot belongs to a specific document,
            With snapshot you can view a documents data,
            metadata and whether a document actually exists.
          */
          let bookDetails = {};
          // Document fields
          bookDetails = documentSnapshot.data();
          // All the document related data
          bookDetails['id'] = documentSnapshot.id;
          setBookData(bookDetails);
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
      <Mybutton title="Search Book" customClick={searchBook} />
      <View style={{marginTop: 10}}>
        <Text>
          Book Id: {bookData ? bookData.id : ''}
        </Text>
        <Text>
          Book Name: {bookData ? bookData.nomeLivro : ''}
        </Text>
        <Text>
          Book Autor: {bookData ? bookData.autor : ''}
        </Text>
        <Text>
          Book Genero: {bookData ? bookData.genero : ''}
        </Text>
      </View>
    </View>
  );
};
 
export default ViewBook;
