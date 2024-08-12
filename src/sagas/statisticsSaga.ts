import { call, put } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  fetchStatisticsSuccess,
  fetchStatisticsFailure,
  fetchStatisticsArtistSuccess,
  fetchStatisticsArtistFailure,
  fetchStatisticsAlbumSuccess,
  fetchStatisticsArtist,
  fetchStatisticsAlbum,
  fetchStatisticsAlbumFailure,
} from "../features/statistics/statisticsSlice";
interface StatisticsResponse {
  totalSongs: number;
  totalGenres: number;
  totalArtist: number;
  totalAlbum: number;
  artistStat: { totalSongs: number; totalAlbums: number };
  genreStat: { totalSongs: number; totalAlbums: number };
  albumStat: { totalSongs: number; totalGenre: number };
}

// Define the type for the error response
interface ErrorResponse {
  message: string;
}
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export function* fetchStatisticsSaga() {
  try {
    const response: AxiosResponse<StatisticsResponse> = yield call(
      axios.get,
      `${BASE_URL}/statistics`
    );
    yield put(fetchStatisticsSuccess(response.data));
  } catch (error: any) {
    const errorMessage: ErrorResponse = error.response?.data || {
      message: error.message,
    };
    yield put(fetchStatisticsFailure(errorMessage.message));
  }
}


export function* fetchArtistStatisticsSaga(
  action: ReturnType<typeof fetchStatisticsArtist>
): Generator {
  try {
    const response: AxiosResponse<{
      artistStat: { totalSongs: number; totalAlbums: number };
    }> = (yield call(axios.get, `${BASE_URL}/statistics/artist/${action.payload}`)) as AxiosResponse<{
      artistStat: { totalSongs: number; totalAlbums: number };}>;
    yield put(fetchStatisticsArtistSuccess(response.data));
  } catch (error: any) {
    const errorMessage: ErrorResponse = error.response?.data || {
      message: error.message,
    };
    yield put(fetchStatisticsArtistFailure(errorMessage.message));
  }
}
export function* fetchAlbumStatisticsSaga(action: ReturnType<typeof fetchStatisticsAlbum>
): Generator {
  try {
    const response: AxiosResponse<{
      albumStat: { totalSongs: number; totalGenres: number };
    }> = (yield call(axios.get, `${BASE_URL}/statistics/album/${action.payload}`)) as AxiosResponse<{
      albumStat: { totalSongs: number; totalGenres: number };}>;
      console.log('response is '+JSON.stringify(response.data));
    yield put(fetchStatisticsAlbumSuccess(response.data));
  } catch (error: any) {
    const errorMessage: ErrorResponse = error.response?.data || {
      message: error.message,
    };
    yield put(fetchStatisticsAlbumFailure(errorMessage.message));
  }
}


