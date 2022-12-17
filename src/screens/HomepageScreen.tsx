// React
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ListRenderItem,
    ListRenderItemInfo,
    ActivityIndicator,
} from 'react-native';
// Libraries
import { LinearGradient } from 'expo-linear-gradient';
import { verticalScale, moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
// Components
import MovieCard from '../components/movie-card';
// Redux
import { useAppSelector } from '../redux/hooks';
import { selectMovies } from '../redux/moviesSlice';
// Types
import { MovieDetailsType, MovieDetailsNavigationProp } from '../types';
// Utils
import Colors from '../utils/Colors';

const HomepageScreen = () => {
    // Navigation
    const navigation = useNavigation<MovieDetailsNavigationProp>();
    const cardClickNavigationHandler = (movieID: number) => {
        navigation.navigate('MovieDetails', { movieID });
    };

    // Get Movies from store
    const { errorMessage, loading, movies } = useAppSelector(selectMovies);

    // Render each movie item
    const renderMovieItem: ListRenderItem<MovieDetailsType> = ({
        item,
    }: ListRenderItemInfo<MovieDetailsType>) => (
        <MovieCard onCardClick={cardClickNavigationHandler} movieItem={item} />
    );

    return (
        <View style={styles.container}>
            {/* Background Gradient */}
            <LinearGradient
                colors={[Colors.primary, Colors.dark]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                locations={[0, 0.5]}
                style={styles.backgroundGradientStyle}
            />

            {/* Loading Indicator */}
            {loading ? (
                <>
                    <ActivityIndicator
                        size={'large'}
                        color={Colors.white}
                        style={styles.LoadingIndicatorStyle}
                    />
                </>
            ) : null}

            {/* Error Message */}
            {errorMessage ? (
                <View style={styles.errorMessageContainerStyle}>
                    <Text style={styles.errorMessageStyle}>{errorMessage}</Text>
                </View>
            ) : null}

            {/* Movies List */}
            {movies.length !== 0 ? (
                <FlatList
                    data={movies}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={styles.flatListColumnStyle}
                    contentContainerStyle={styles.flatListContentContainerStyle}
                    initialNumToRender={8}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={<Text style={styles.listTitleStyle}>Popular Movies</Text>}
                    renderItem={renderMovieItem}
                />
            ) : null}
        </View>
    );
};

export default HomepageScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    LoadingIndicatorStyle: {
        ...StyleSheet.absoluteFillObject,
    },
    flatListContentContainerStyle: {
        padding: moderateScale(16),
    },
    flatListColumnStyle: {
        justifyContent: 'space-between',
        paddingVertical: verticalScale(10),
    },
    backgroundGradientStyle: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: -1,
    },
    listTitleStyle: {
        fontSize: moderateScale(25),
        fontWeight: 'bold',
        color: Colors.white,
        alignSelf: 'flex-start',
    },
    errorMessageContainerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorMessageStyle: {
        fontSize: moderateScale(20),
        fontWeight: 'bold',
        color: Colors.white,
    },
});
