// #2 Integration of Firebase Cloud Firestore Database
// https://aboutreact.com/react-native-firebase-cloud-firestore-db
 
import React, {useState, useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
 
const ViewAllBook = () => {
  let [listData, setListData] = useState([]);
 
  /*
    You can use different filters, limitar, start-end boundaries
    and can also order the results
    firestore()
        .collection('books')
        // Filter results
        .where('age', '>=', 18)
        .where('languages', 'in', ['en', 'fr'])
        // Limit results
        .limit(20)
        // Order results
        .orderBy('age', 'desc')
        // Pagination using startAt, endAt, startAfter, endBefore
        .startAt(18)
        .endAt(30)
        .get()
        .then(querySnapshot => {});
  */
 
  useEffect(() => {
    firestore()
      .collection('123456')
      .get()
      .then((querySnapshot) => {
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
          setListData(temp);
        });
      });
  }, []);
 
  const itemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: '100%',
          backgroundColor: '#808080'
        }} />
    );
  };
 
  let itemView = ({item}) => {
    return (
      <View
        key={item.nomeLivro}
        style={{
          backgroundColor: 'white',
          padding: 20
        }}>
        <Text>Doc Id: {item.id}</Text>
        <Text>Nome do Livro: {item.nomeLivro}</Text>
        <Text>Autor: {item.autor}</Text>
        <Text>Genero: {item.genero}</Text>
      </View>
    );
  };
 
  return (
    <View>
      <FlatList
        data={listData}
        ItemSeparatorComponent={itemSeparatorView}
        keyExtractor={(item, index) => index.toString()}
        renderItem={itemView}
      />
    </View>
  );
};
 
export default ViewAllBook;
