import React from "react";
import {FC} from "react";
import {SafeAreaView, StatusBar, StyleSheet, Text} from "react-native";

interface Book {
    title: string,
    description: string,
    price: number
}
const BookClass: FC<Book> = props => {
    return (
        <SafeAreaView>
            <StatusBar backgroundColor="white" />
            <Text style={styles.textstyle}>{props.title}</Text>
            <Text style={styles.textstyle}>{props.description}</Text>
            <Text style={styles.textstyle}>{props.price}</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    textstyle: {
        textAlign: 'center',
        fontSize: 18,
    },
});

export default BookClass;