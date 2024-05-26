import React from "react"
import { StyleSheet, View } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeStackNavigator from "./HomeStackNavigator"
import CartStack from "./CartStackNavigator"
//import OrderStack from "./OrderStackNavigator"
import Header from "../components/Header/Header"
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"
import CartTemp from "../screens/CartTemp"
//import OrdersTemp from "../screens/OrdersTemp"
import MyProfileStackNavigator from "./MyProfileStackNavigator"

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
                screenOptions={({ route }) => ({
                header: () => {
                return <Header route={route} />
            },
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
            })}
        >
            <Tab.Screen
                name="Shop"
                component={HomeStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <FontAwesome5
                                    name="store"
                                    size={24}
                                    color={focused ? "white" : "black"}
                                />
                            </View>
                        )
                    },
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartStack}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <FontAwesome6
                                    name="cart-shopping"
                                    size={24}
                                    color={focused ? "white" : "black"}
                                />
                            </View>
                        )
                    },
                }}
            />
            <Tab.Screen 
                name="My profile"
                component={MyProfileStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <Ionicons name="person-circle" size={24} color={focused ? "white" : "black"}  />
                            </View>
                        )
                    },
                }}
            />
            {/*<Tab.Screen 
                name="Orders"
                component={OrderStack}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <Ionicons name="receipt-outline" size={24} color={ focused ? 'black' : 'red'} />
                            </View>
                        )
                    },
                }}
            /> */}
            {/* <Tab.Screen
                name="Orders"
                component={OrdersTemp}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <Ionicons
                                    name="receipt"
                                    size={24}
                                    color={focused ? "white" : "black"}
                                />
                            </View>
                        )
                    },
                }}
            /> */}
        </Tab.Navigator>
    )
}

export default BottomTabNavigator

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: "red",
        elevation: 4,
        borderRadius: 30,
        height: 60,
        marginVertical: 10,
        marginHorizontal: 10
    },
})