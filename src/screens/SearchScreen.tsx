import React, {useState} from "react";
import {ActivityIndicator, Button, FlatList, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import {Text, View} from "../components/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import {gql, useLazyQuery} from "@apollo/client";
import BookItem from "../components/BookItem";
const query = gql`
  query SearchBooks($q: String) {
    googleBooksSearch(q: $q, country: "US") {
      items {
        id
        volumeInfo {
          authors
          averageRating
          description
          imageLinks {
            thumbnail
          }
          title
          subtitle
          industryIdentifiers {
            identifier
            type
          }
        }
      }
    }
    openLibrarySearch(q: $q) {
      docs {
        author_name
        title
        cover_edition_key
        isbn
      }
    }
  }
`;
export default function SearchScreen() {
    const [search, setSearch] = useState("");
    const [provider, setProvider] = useState<"googleBooksSearch" | "openLibrarySearch">("googleBooksSearch")


    const [runQuery, {data, loading, error}] = useLazyQuery(query);

    const parseBook = (item: any) => {
        if(provider == "googleBooksSearch"){
            const isbn = item.volumeInfo.industryIdentifiers?.find((id: any) => id.type === "ISBN_!3")?.identifier;
            return {
                title: item.volumeInfo.title,
                image: item.volumeInfo.imageLinks?.thumbnail,
                authors: item.volumeInfo.authors,
                isbn : isbn ||item.volumeInfo.industryIdentifiers?.[0]?.identifier
            }
        }else {
            return {
                title: item.title,
                authors: item.authors,
                image: `https://covers.openlibrary.org/b/olid/${item.cover_edition_key}-M.jpg`,
                isbn: item.isbn?.[0]
            }

        }
    }

    return(
        <SafeAreaView edges={["top"]} style={styles.container}>
            <View style={styles.header}>
                <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder={"Type a book name to search..."}
                style={styles.input}/>
                <Button title={"Search"} color={'green'} onPress={() => runQuery({variables : {q : search}}) } />
            </View>
            <View style={styles.tabs}>
                <TouchableOpacity style={styles.button} onPress={() => setProvider("googleBooksSearch")}>
                    <Text style={provider === "googleBooksSearch" ? {fontWeight: "bold", color: "royalBlue"}: {}}>
                        Google Books
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setProvider("openLibrarySearch")}>
                <Text style={provider === "openLibrarySearch" ? {fontWeight: "bold", color: "royalBlue"}: {}}>
                    Open Library
                </Text>
                </TouchableOpacity>
            </View>
            {loading && <ActivityIndicator />}
            {error && (
                <View style={styles.container}>
                    <Text style={styles.title}> Error fetching books</Text>
                    <Text>{error.message}</Text>
                </View>
            )}
            <FlatList
                data={
                provider === "googleBooksSearch" ?
                    data?.googleBooksSearch?.items
                    : data?.openLibrarySearch?.items ||
                    []
                }
                renderItem={({item}) => <BookItem book={parseBook(item)}/>} />

        </SafeAreaView>
    )
};



const styles = StyleSheet.create({
    container : {
        flex: 1,
        padding: 10,
        backgroundColor : "white"
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
    header : {
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    input: {
        flex: 1,
        padding: 5,
        borderColor: "gainsboro",
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 5,
    },
    tabs: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: 50,
    }
})