// #2 Integration of Firebase Cloud Firestore Database
// https://aboutreact.com/react-native-firebase-cloud-firestore-db
 
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
} from 'react-native';
 
import Mybutton from './components/Mybutton';
import firestore from '@react-native-firebase/firestore';
 
const RealTimeAddUpdateBook = () => {
  let [listData, setListData] = useState([]);
  let [inputDoc, setInputDoc] = useState('');
 
  useEffect(() => {
    const subscriber = firestore()
      .collection('123456')
      .onSnapshot(
        (querySnapshot) => {
          /*
            A QuerySnapshot allows you to inspect the collection,
            such as how many documents exist within it,
            access to the documents within the collection,
            any changes since the last query and more.
          */
          let temp = [];
          console.log('Total books: ', querySnapshot.size);
          querySnapshot.forEach((documentSnapshot) => {
            console.log('book Id: ', documentSnapshot.id);
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
            temp.push(bookDetails);
          });
          setListData(temp);
        },
        (error) => {
          console.log('error', error);
        },
      );
 
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);
 
  const onDocSubmit = () => {
    firestore()
      .collection('123456')
      .add({
        nameLivro: inputDoc,
        autor: '',
        editora: '',
        genero: '',
      })
      .then(() => {
        setInputDoc('');
        alert('Added');
      })
      .catch((error) => {
        alert(`Exception: ${error}`);
      });
  };
 
  const onDocRemove = (oldDoc) => {
    firestore()
      .collection('123456')
      .doc(oldDoc)
      .delete()
      .catch((error) => {
        alert(`Exception: ${error}`);
      });
  };
 
  const renderDoc = (doc, index) => {
    return (
      <View style={styles.card} key={index}>
        <Text>Id: {doc.id}</Text>
        <Text>Name do Livro: {doc.nameLivro}</Text>
        <Text>Autor: {doc.autor}</Text>
        <Text>Editora: {doc.editora}</Text>
        <Text>Genero: {doc.genero}</Text>
        <Mybutton
          title="Remove"
          customClick={() => onDocRemove(doc.id)}
        />
      </View>
    );
  };
 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter Name"
            onChangeText={
              (inputDoc) => setInputDoc(inputDoc)
            }
            value={inputDoc}
          />
          <Mybutton
            title="Submit"
            customClick={onDocSubmit}
          />
        </View>
        <ScrollView>
          {listData.map((doc, index) => renderDoc(doc, index))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  inputStyle: {
    flex: 1,
    maxWidth: 350,
    borderColor: 'black',
    height: 40,
    borderWidth: 0.5,
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
  },
  card: {
    padding: 10,
    backgroundColor: 'white',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderBottomColor: '#D4D4D4',
    borderBottomWidth: 1,
    borderRadius: 2,
  },
});
 
export default RealTimeAddUpdateBook;
