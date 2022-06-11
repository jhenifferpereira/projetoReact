// #2 Integration of Firebase Cloud Firestore Database
// https://aboutreact.com/react-native-firebase-cloud-firestore-db
 
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import firestore from '@react-native-firebase/firestore';
 
const UpdateBook = (props) => {
  let [bookId, setBookId] = useState('');
  let [bookName, setBookName] = useState('');
  let [bookAutor, setBookAutor] = useState('');
  let [bookEditora, setBookEditora] = useState('');
  let [bookGenero, setBookGenero] = useState('');
 
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
          if (documentSnapshot.exists) {
            setBookName(documentSnapshot.data().nomeLivro);
            setBookAutor(documentSnapshot.data().autor);
            setBookEditora(documentSnapshot.data().editora);
            setBookGenero(documentSnapshot.data().genero);
          } else {
            setBookName('');
            setBookAutor('');
            setBookEditora('');
            setBookGenero('');
          }
        });
    }
  };
 
  const updateBook = () => {
    if (bookId && bookName && bookAutor && bookEditora && bookGenero) {
      /*
        Please note update is not just for the update in firebase,
        while updating if record not found in firebase then
        it will create one, update Method also provides support for
        updating deeply nested values via dot-notation
        .update({ 'details.address.zipcode': 452012 })
      */
 
      firestore()
        .collection('123456')
        .doc(bookId)
        .update({
          nomeLivro: bookName,
          autor: bookAutor,
          editora: bookEditora,
          genero: bookGenero
        })
        .then(() => {
          Alert.alert(
            'Success',
            'Updated Successfully',
            [
              {
                text: 'Ok',
                onPress:
                  () => props.navigation.navigate('HomeScreen')
              },
            ],
            {cancelable: false},
          );
        })
        .catch((error) => {
          Alert.alert(
            'Exception',
            error,
            [
              {
                text: 'Ok',
                onPress:
                  () => props.navigation.navigate('HomeScreen'),
              },
            ],
            {cancelable: false},
          );
        });
    } else {
      alert('Please fill all fields');
    }
  };
 
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: 35
      }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          behavior="padding"
          style={{flex: 1, justifyContent: 'space-between'}}>
          <Mytextinput
            placeholder="Enter Book Id"
            style={{padding: 10}}
            value={bookId}
            onChangeText={(bookId) => setBookId(bookId)}
          />
          <Mybutton title="Search Book" customClick={searchBook} />
          <Mytextinput
            placeholder="Enter Name"
            value={bookName}
            style={{padding: 10}}
            onChangeText={
              (bookName) => setBookName(bookName)
            }
          />
          <Mytextinput
            placeholder="Enter Autor"
            value={'' + bookAutor}
            onChangeText={
              (bookAutor) => setBookAutor(bookAutor)
            }
            maxLength={10}
            style={{padding: 10}}
            keyboardType="numeric"
          />
          <Mytextinput
            value={bookEditora}
            placeholder="Enter Editora"
            onChangeText={
              (bookEditora) => setBookEditora(bookEditora)
            }
            maxLength={225}
            numberOfLines={5}
            multiline={true}
            style={{textAlignVertical: 'top', padding: 10}}
          />
          <Mytextinput
            value={bookGenero}
            placeholder="Enter Genero"
            onChangeText={
              (bookGenero) => setBookGenero(bookGenero)
            }
            maxLength={225}
            numberOfLines={5}
            multiline={true}
            style={{textAlignVertical: 'top', padding: 10}}
          />
          <Mybutton title="Update Book" customClick={updateBook} />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
 
export default UpdateBook;
