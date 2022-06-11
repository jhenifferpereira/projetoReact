// #2 Integration of Firebase Cloud Firestore Database
// https://aboutreact.com/react-native-firebase-cloud-firestore-db
 
import React, {useState} from 'react';
import {View, ScrollView, KeyboardAvoidingView, Alert} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import firestore from '@react-native-firebase/firestore';
 
const RegisterBook = (props) => {
  let [bookName, setBookName] = useState('');
  let [bookAutor, setBookAutor] = useState('');
  let [bookEditora, setBookEditora] = useState('');
  let [bookGenero, setBookGenero] = useState('');
 
  const handleRegistration = () => {
    if (bookName && bookAutor && bookEditora && bookGenero) {
      /*
        "add()" method adds the new document with a random unique ID
        If you'd like to specify your own ID then use "set()" method
        firestore()
          .collection('Books')
          .doc('101')
          .set({
            name: bookName,
            autor: bookAutor,
            Editora: bookEditora,
          })
        .then(() => {
          console.log('Book added!');
        });
      */
      firestore()
        .collection('123456')
        .add({
          nomeLivro: bookName,
          autor: bookAutor,
          editora: bookEditora,
          genero: bookGenero,
        })
        .then(() => {
          Alert.alert(
            'Success',
            'You are Registered Successfully',
            [
              {
                text: 'Ok',
                onPress:
                  () => props.navigation.navigate('HomeScreen'),
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
 
      /*
        You can also add the data using set instead of push
        but in that case you have to provide the Book id by
        your own as NoSql DBs have no concept of auto increment
      */
      /*
        firebase.database()
          .ref("Books/<You custome key for the Book>")
          .set({
            name: BookName,
            Autor: BookAutor,
            editora: bookAddress
          }).then(()=>{
          Alert.alert(
            'Success','You are Registered Successfully',
            [{
              text: 'Ok',
              onPress:
              () => props.navigation.navigate('HomeScreen')}
            ],{ cancelable: false });
      });*/
    } else {
      alert('Please fill all the details');
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
            placeholder="Enter Name"
            onChangeText={
              (bookName) => setBookName(bookName)
            }
            style={{padding: 10}}
          />
          <Mytextinput
            placeholder="Enter Autor"
            onChangeText={
              (bookAutor) => setBookAutor(bookAutor)
            }
            maxLength={10}
            keyboardType="numeric"
            style={{padding: 10}}
          />
          <Mytextinput
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
            placeholder="Enter Genero"
            onChangeText={
              (bookGenero) => setBookGenero(bookGenero)
            }
            maxLength={225}
            numberOfLines={5}
            multiline={true}
            style={{textAlignVertical: 'top', padding: 10}}
          />
          <Mybutton
            title="Submit"
            customClick={handleRegistration}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
 
export default RegisterBook;
