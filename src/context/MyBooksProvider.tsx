import React, {useContext} from "react";
import {createContext, useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogBox} from "react-native";

type MyBooksContextType = {
    isBookSaved: (book: Book) => boolean;
    onToggleSaved: (book: Book) => void;
    savedBooks: Book[];
};


const MyBooksContext = createContext<MyBooksContextType>({
    isBookSaved: () => false,
    onToggleSaved: () => {},
    savedBooks: [],
});

type Props = {
    children: React.ReactNode;
};
const MyBooksProvider = ({children}: Props) => {
    const [savedBooks, setSavedBooks] = useState<Book[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        AsyncStorage.clear();
        loadData().then(r => setLoaded(true));
    }, [])

    useEffect(() => {
        if(loaded){
            saveData();
        }
    }, [savedBooks])



    const isBookSaved = (book : Book) => {
        return savedBooks.some((savedBook) =>  JSON.stringify(savedBook) === JSON.stringify(book));
    }

    const onToggleSaved = (book: Book) => {
        if(isBookSaved(book)) {
            const newBooks = savedBooks.filter((item) => item !== book);
            setSavedBooks(newBooks);
        }else{
            setSavedBooks((books) => [book, ...books]);
        }
    }

    const saveData = async () => {
        await AsyncStorage.setItem("booksData", JSON.stringify(savedBooks));
    }

    const loadData = async () => {
        const dataString = await AsyncStorage.getItem("booksData");
        if(dataString) {
            const  items = JSON.parse(dataString);
            setSavedBooks(items);
        }
        return true;
    }


    return (
        <MyBooksContext.Provider value={{isBookSaved, onToggleSaved, savedBooks}}>
            {children}
        </MyBooksContext.Provider>
    )
}

export const useMyBooks = () => useContext(MyBooksContext);

export default MyBooksProvider;