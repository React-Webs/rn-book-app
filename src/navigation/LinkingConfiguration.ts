import {LinkingOptions} from "@react-navigation/native";
import {RootStackParamList} from "../../types";
import * as Linking from 'expo-linking';

const linking : LinkingOptions<RootStackParamList> = {
    prefixes : [Linking.createURL('/')],
    config: {
        screens: {
            Root: {
                screens: {
                    Search: {
                        screens: {
                            TabOneScreen: 'one',
                        },
                    },
                    MyBooks: {
                        screens: {
                            TabTwoScreen: 'two',
                        },
                    },
                },
            },
            Modal: 'modal',
            NotFound: '*',
        },
    },
};

export default linking;