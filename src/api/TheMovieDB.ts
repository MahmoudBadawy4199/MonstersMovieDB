// Libraries
import axios from 'axios';
// Types
import { PageType } from '../types';

// --------- The MovieDB API ---------

/**
 * Some notes about theMovieDB Api
 * it only returns 20 movies per page,
 * for example: in order to get 60 movies you have to request 3 pages.
 */

// Constants
const THE_MOVIE_DB_API_KEY = 'f585820888aefbbb7fc02e28e24bf600';
const BASE_URL = 'https://api.themoviedb.org/3/movie';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';

/**
 * fetchPopularMoviesByPageNumber
 * @description fetch a Page of movies from api [ 20 movies per page ].
 * @param pageNumber - the number of the page we want.
 * @return response.data.results --> [array of movies]
 */
export const fetchPopularMoviesByPageNumber = async (pageNumber: number) => {
    const response = await axios<PageType>({
        method: 'get',
        url: `/popular/`,
        baseURL: BASE_URL,
        params: {
            api_key: THE_MOVIE_DB_API_KEY,
            language: 'en-US',
            page: pageNumber,
        },
    });
    return response.data.results;
};

/**
 * getImageLink
 * @description build the full image link.
 * @param imageFileName - the file name of the image we want.
 * @return the Combined Link uri
 */
export const getImageLink = (imageFileName: string) => {
    return `${IMAGE_BASE_URL}${imageFileName}`;
};
