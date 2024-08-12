import { call, put, takeLatest, all } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { 
  fetchSongs, fetchSongsSuccess, fetchSongsFailure,
  addSong, addSongSuccess, addSongFailure,
  updateSong, updateSongSuccess, updateSongFailure,
  deleteSong, deleteSongSuccess, deleteSongFailure,fetchAlbum,
  fetchAlbumSuccess,
  fetchAlbumFailure,
  fetchArtistsSuccess,
  fetchArtistsFailure,
  fetchArtists,
  fetchGenreSuccess,
  fetchGenre,
  fetchGenreFailure
} from '../features/songs/songsSlice';
import { AlbumType, ArtistType, GenreType, SongType } from '../types';
import { fetchStatistics, fetchStatisticsAlbum, fetchStatisticsArtist } from '../features/statistics/statisticsSlice';
import { fetchAlbumStatisticsSaga, fetchArtistStatisticsSaga, fetchStatisticsSaga } from './statisticsSaga';



interface FetchSongsResponse {
  songs: SongType[];
}

// Define the type for the error response
interface ErrorResponse {
  message: string;
}
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function* fetchSongsSaga(action: ReturnType<typeof fetchSongs>): Generator {
  try {
    const response = (yield call(
      axios.get,
      `${BASE_URL}/songs`,
      { params: action.payload }
    )) as AxiosResponse<FetchSongsResponse>;
    // jsonstringfy response.data
    
    yield put(fetchSongsSuccess(response.data.songs));
  } catch (error: any) {
    const errorMessage: ErrorResponse = error.response?.data || { message: error.message };
    yield put(fetchSongsFailure(errorMessage.message));
  }
}

function* addSongSaga(action: ReturnType<typeof addSong>): Generator {
  const newsong = action.payload;
 const {_id, ...songToCreate} = newsong;
 console.log('song TO cREATE  is '+JSON.stringify(songToCreate));
  try {
    const response = (yield call(
      axios.post,
      `${BASE_URL}/songs`,
      songToCreate
    )) as AxiosResponse<SongType>;
    yield put(addSongSuccess(response.data));

  } catch (error: any) {
    const errorMessage: ErrorResponse = error.response?.data || { message: error.message };
    yield put(addSongFailure(errorMessage.message));
  }
}

function* updateSongSaga(action: ReturnType<typeof updateSong>): Generator {
  try {
    const response = (yield call(
      axios.put,
      `${BASE_URL}/songs/${action.payload._id}`,
      action.payload
    )) as AxiosResponse<SongType>;
    yield put(updateSongSuccess(response.data));
    yield put(fetchStatistics());
  } catch (error: any) {
    const errorMessage: ErrorResponse = error.response?.data || { message: error.message };
    yield put(updateSongFailure(errorMessage.message));
  }
}

function* deleteSongSaga(action: ReturnType<typeof deleteSong>): Generator {
  try {
    yield call(
      axios.delete,
      `${BASE_URL}/songs/${action.payload}`
    );
    yield put(deleteSongSuccess(action.payload));
    yield put(fetchStatistics());

  } catch (error: any) {
    const errorMessage: ErrorResponse = error.response?.data || { message: error.message };
    yield put(deleteSongFailure(errorMessage.message));
  }
}

function* fetchAlbumSaga(action: ReturnType<typeof fetchAlbum>): Generator {
  try {
    const response = (yield call(
      axios.get,
      `${BASE_URL}/albums`
    )) as AxiosResponse<AlbumType[]>;
    yield put(fetchAlbumSuccess(response.data));
  } catch (error: any) {
    const errorMessage: ErrorResponse = error.response?.data || { message: error.message };
    yield put(fetchAlbumFailure(errorMessage.message));
  }
}

function* fetchArtistsSaga(action: ReturnType<typeof fetchArtists>): Generator {
  try {
    const response = (yield call(
      axios.get,
      `${BASE_URL}/artists`
    )) as AxiosResponse<ArtistType[]>;
    yield put(fetchArtistsSuccess(response.data));
  } catch (error: any) {
    const errorMessage: ErrorResponse = error.response?.data || { message: error.message };
    yield put(fetchArtistsFailure(errorMessage.message));
  }
}
function* fetchGenreSaga(action: ReturnType<typeof fetchGenre>): Generator {
  try {
    const response = (yield call(
      axios.get,
      `${BASE_URL}/genres`
    )) as AxiosResponse<GenreType[]>;
    yield put(fetchGenreSuccess(response.data));
  } catch (error: any) {
    const errorMessage: ErrorResponse = error.response?.data || { message: error.message };
    yield put(fetchGenreFailure(errorMessage.message));
  }
}

export function* watchFetchStatisticsArtist() {
  yield takeLatest(fetchStatisticsArtist.type, fetchArtistStatisticsSaga);
}
export function* watchFetchStatisticsAlbum() {
  yield takeLatest(fetchStatisticsAlbum.type, fetchAlbumStatisticsSaga);
}
export function* watchFetchArtists() {
  yield takeLatest(fetchArtists.type, fetchArtistsSaga);
}
export function* watchFetchGenre() {
  yield takeLatest(fetchGenre.type, fetchGenreSaga);
}

export function* watchFetchSongs() {
  yield takeLatest(fetchSongs.type, fetchSongsSaga);
}

export function* watchAddSong() {
  yield takeLatest(addSong.type, addSongSaga);
}

export function* watchUpdateSong() {
  yield takeLatest(updateSong.type, updateSongSaga);
}

export function* watchDeleteSong() {
  yield takeLatest(deleteSong.type, deleteSongSaga);
}

export function* watchFetchStatistics() {
  yield takeLatest(fetchStatistics.type, fetchStatisticsSaga);
}

export function* watchFetchAlbum() {
  yield takeLatest(fetchAlbum.type, fetchAlbumSaga);
}
export default function* rootSaga() {
  yield all([
    watchFetchSongs(),
    watchAddSong(),
    watchUpdateSong(),
    watchDeleteSong(),
    watchFetchAlbum(),
    watchFetchArtists(),
    watchFetchGenre(),
    watchFetchStatistics(),
    watchFetchStatisticsArtist(),
    watchFetchStatisticsAlbum(),

  ]);
}