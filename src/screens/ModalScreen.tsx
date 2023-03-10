import React from "react";
import {Platform, StyleSheet} from "react-native";
import {Text, View} from "../components/themed";
import {StatusBar} from "expo-status-bar";


export  default function ModalScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Modal</Text>
                <View style={styles.separator} lightColor={'#eee'} darkColor={'rgba(255,255,255,0.1'} />
                <Text>Here goes the edit screen info</Text>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});