import React from "react";
import {FlatList, SafeAreaView, StyleSheet, VirtualizedList} from "react-native";
import {Text, View} from "../components/themed";
import {useMyBooks} from "../context/MyBooksProvider";
import BookItem from "../components/BookItem";
const getItemCount = (_data: unknown) => 50;


const getItem = (_data: Book, index: number): Book => ({
    title: _data.title,
    authors : _data.authors,
    image : _data.image,
    isbn : _data.isbn
});
export default function MyBooksScreen() {
    const { savedBooks } = useMyBooks();
    return (
        <SafeAreaView>
            <FlatList
                style={styles.container}
                data={savedBooks}
                renderItem={({item}) => <BookItem book={item}/>} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        padding: 10
    }
})