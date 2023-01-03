import React from "react";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import {RootStackParamList} from "../../types";
import BottomTabNavigator from "../screens/BottomTabNavigator";
import NotFoundScreen from "../screens/NotFoundScreen";
import ModalScreen from "../screens/ModalScreen";
import {ColorSchemeName} from "react-native";
import {DarkTheme, DefaultTheme, NavigationContainer} from "@react-navigation/native";
import LinkingConfiguration from "./LinkingConfiguration";

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function Navigation({colorScheme,}:{colorScheme : ColorSchemeName;}){
    return (
        <NavigationContainer linking={LinkingConfiguration}
        theme={colorScheme == 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator />
        </NavigationContainer>
    )
}

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={'Root'}
            component={BottomTabNavigator}
            options={{headerShown : true}} />

            <Stack.Screen name={'NotFound'}
            component={NotFoundScreen}
            options={{title :"Oops! Something is wrong."}} />

            <Stack.Group screenOptions={{ stackPresentation: "modal" }}>
                <Stack.Screen name={'Modal'} component={ModalScreen} />
            </Stack.Group>
        </Stack.Navigator>
    )
}