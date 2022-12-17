// React
import React from 'react';
// screens
import { HomepageScreen, MovieDetailsScreen } from '../screens';
// Libraries
import { createStackNavigator } from '@react-navigation/stack';
// Types
import { HomeStackParamListType } from '../types';

// Navigator
const HomeStack = createStackNavigator<HomeStackParamListType>();

const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator
            initialRouteName="Homepage"
            screenOptions={{
                headerShown: false,
            }}
        >
            <HomeStack.Screen name="Homepage" component={HomepageScreen} />
            <HomeStack.Screen name="MovieDetails" component={MovieDetailsScreen} />
        </HomeStack.Navigator>
    );
};

export default HomeStackNavigator;
