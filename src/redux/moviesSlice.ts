// Redux toolkit
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { createAsyncThunk } from '@reduxjs/toolkit';
// Api
import { fetchPopularMoviesByPageNumber } from '../api/TheMovieDB';
// Types
import { MovieDetailsType } from '../types';

const initialState = {
    movies: [] as MovieDetailsType[],
    loading: false,
    errorMessage: '',
};

/**
 * fetchHomepageMovies
 * @description fetch movies for Homepage Screen.
 * @return listOfSixtyMovies --> [array of pages, each page has an array of movies].
 */
export const fetchHomepageMovies = createAsyncThunk('movies/fetchHomepageMovies', async () => {
    // Request 3 pages of movies from the api [ 60 movies total]
    const listOfSixtyMovies: MovieDetailsType[][] = await Promise.all([
        fetchPopularMoviesByPageNumber(1),
        fetchPopularMoviesByPageNumber(2),
        fetchPopularMoviesByPageNumber(3),
    ]);

    return listOfSixtyMovies;
});

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchHomepageMovies.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(
            fetchHomepageMovies.fulfilled,
            (state, action: PayloadAction<MovieDetailsType[][]>) => {
                // Combine all movies in one array [20 , 20 , 20 ] --> [60]
                const combinedMovies = [] as MovieDetailsType[];
                action.payload.map((page) => {
                    page.map((movie) => {
                        combinedMovies.push(movie);
                    });
                });

                state.movies = combinedMovies;
                state.loading = false;
                state.errorMessage = '';
            },
        );
        builder.addCase(fetchHomepageMovies.rejected, (state, action) => {
            state.errorMessage = action.error.message!;
            state.loading = false;
        });
    },
});

export const selectMovies = (state: RootState) => state.movies;

export default moviesSlice.reducer;
