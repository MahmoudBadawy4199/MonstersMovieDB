// React
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
// Libraries
import { useRoute, RouteProp } from '@react-navigation/native';
import { verticalScale, moderateScale } from 'react-native-size-matters';
// Types
import { HomeStackParamListType } from '../types';
// Redux
import { useAppSelector } from '../redux/hooks';
import { selectMovies } from '../redux/moviesSlice';
// Utils
import Colors from '../utils/Colors';
// Api
import { getImageLink } from '../api/TheMovieDB';

const MovieDetailsScreen = () => {
    // Get movie ID from route parameters
    const { movieID } = useRoute<RouteProp<HomeStackParamListType, 'MovieDetails'>>().params;
    // Get movie data from store
    const MovieData = useAppSelector(selectMovies).movies.filter((item) => item.id === movieID)[0];

    return (
        <View style={styles.container}>
            {/* Movie Image */}
            <Image
                style={styles.movieImageStyle}
                source={{ uri: getImageLink(MovieData.poster_path) }}
            />
            {/* Movie Information */}
            <View style={styles.movieInformationContainer}>
                {/* Title */}
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.titleStyle}>
                    {MovieData.title}
                </Text>
                {/* Overview */}
                <Text style={styles.overViewStyle}>{MovieData.overview}</Text>
            </View>
        </View>
    );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark,
    },
    backgroundGradientStyle: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: -1,
    },
    movieImageStyle: {
        height: '40%',
        width: '100%',
        backgroundColor: Colors.black,
        resizeMode: 'contain',
    },
    movieInformationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: moderateScale(16),
        marginTop: verticalScale(10),
    },
    titleStyle: {
        fontSize: moderateScale(30),
        fontWeight: 'bold',
        alignSelf: 'center',
        color: Colors.white,
    },
    overViewStyle: {
        fontSize: moderateScale(16),
        textAlign: 'left',
        alignSelf: 'flex-start',
        color: Colors.accent,
        marginTop: verticalScale(10),
    },
});
