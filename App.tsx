// React
import React from 'react';
import { I18nManager, StatusBar, StyleSheet } from 'react-native';
// Libraries
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
// Redux
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './src/redux/store';
// Navigation
import HomeStackNavigator from './src/navigation/HomeStackNavigator';
import { useAppDispatch } from './src/redux/hooks';
import { fetchHomepageMovies } from './src/redux/moviesSlice';

// Disable RTL
if (I18nManager.isRTL) {
    I18nManager.forceRTL(false);
    I18nManager.allowRTL(false);
    I18nManager.swapLeftAndRightInRTL(false);
}

function App() {
    // Fetch the api data into store
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        dispatch(fetchHomepageMovies());
    }, [dispatch]);

    return (
        <SafeAreaView style={styles.appContainerStyle}>
            <StatusBar barStyle={'light-content'} />
            <HomeStackNavigator />
        </SafeAreaView>
    );
}
export default () => {
    return (
        <ReduxProvider store={store}>
            <SafeAreaProvider>
                <NavigationContainer theme={DarkTheme}>
                    <App />
                </NavigationContainer>
            </SafeAreaProvider>
        </ReduxProvider>
    );
};

const styles = StyleSheet.create({
    appContainerStyle: {
        flex: 1,
    },
});
