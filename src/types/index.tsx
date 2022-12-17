// Libraries
import { StackNavigationProp } from '@react-navigation/stack';

// ---------------- Navigation Types ----------------
export type HomeStackParamListType = {
    Homepage: undefined;
    MovieDetails: {
        movieID: number;
    };
};

export type MovieDetailsNavigationProp = StackNavigationProp<
    HomeStackParamListType,
    'MovieDetails'
>;

// ---------------- Other Types ----------------

export type MovieDetailsType = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

export type PageType = {
    page: number;
    results: MovieDetailsType[];
    total_pages: number;
    total_results: number;
};
