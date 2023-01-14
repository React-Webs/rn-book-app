import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {RootTabParamList} from "../../types";
import {FontAwesome} from "@expo/vector-icons";
import React from 'react';
import SearchScreen from "./SearchScreen";
import MyBooksScreen from "./MyBooksScreen";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";


const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigation() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator initialRouteName="Search"
                              screenOptions={{
                                  tabBarActiveTintColor: Colors[colorScheme].tint,
                              }}>
            <BottomTab.Screen name={'Search'}
                              component={SearchScreen}
                              options={{
                                  tabBarIcon: ({color}) => <TabBarIcon name={"search"} color={color}/>,
                                  headerShown: false,
                              }}
            />
            <BottomTab.Screen name={'My Books To Read'}
                              component={MyBooksScreen}
                              options={{
                                  tabBarIcon: ({color}) => <TabBarIcon name={"book"} color={color}/>,
                              }}
            />
        </BottomTab.Navigator>
    )
}

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
    color: string;
}) {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}


export default BottomTabNavigation;