import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {toast } from 'react-toastify';
import { AlbumType, ArtistType, GenreType, SongType } from '../../types';
// import { select } from 'redux-saga/effects';



interface SongsState {
  songs: SongType[];
  song: SongType | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  updateStatus:boolean;
  artists:ArtistType[];
  genre:GenreType[];
  album:AlbumType[];

}

const initialState: SongsState = {
  songs: [],
  status: 'idle',
  error: null,
  updateStatus:false,
  song:null,
  artists:[],
  genre:[],
  album:[]
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    fetchSongs(state, action: PayloadAction<{ genre?: string }>) {
      state.status = 'loading';
    },
    fetchSongsSuccess(state, action: PayloadAction<SongType[]>) {
      state.status = 'succeeded';
      state.songs = action.payload;
    },
    fetchSongsFailure(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
    addSong(state, action: PayloadAction<SongType>) {
      state.status = 'loading';
    },
    addSongSuccess(state, action: PayloadAction<SongType>) {
      state.status = 'succeeded';
      state.songs.push(action.payload);
      
      toast.success('Song added successfully');
    },
    changeUpdateStatus(state, action: PayloadAction<boolean>) {
      state.updateStatus = action.payload;
    },
    addSongFailure(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
    updateSong(state, action: PayloadAction<SongType>) {
      state.status = 'loading';
    },
    updateSongSuccess(state, action: PayloadAction<SongType>) {
      state.status = 'succeeded';
      state.updateStatus = false;
      state.song = null;
      state.songs = state.songs.map(song =>
        song._id === action.payload._id ? action.payload : song
      );
      toast.success('Song Updated successfully');
    },
    updateSongFailure(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
      state.updateStatus = false;
      state.song = null;
      toast.error('Song Update Failed');

    },
    deleteSong(state, action: PayloadAction<string>) {
      state.status = 'loading';
    },
    deleteSongSuccess(state, action: PayloadAction<string>) {
      state.status = 'succeeded';
      state.songs = state.songs.filter(song => song._id !== action.payload);
    },
    deleteSongFailure(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
    selectSong(state, action: PayloadAction<SongType>) {
      state.song = action.payload;
    },
    fetchArtists(state) {
      state.status = 'loading';
    },
    fetchArtistsSuccess(state, action: PayloadAction<ArtistType[]>) {
      state.status = 'succeeded';
      state.artists = action.payload;
    },
    fetchArtistsFailure(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
    fetchGenre(state) {
      state.status = 'loading';
    },
    fetchGenreSuccess(state, action: PayloadAction<GenreType[]>) {
      state.status = 'succeeded';
      state.genre = action.payload;
    },
    fetchGenreFailure(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
    fetchAlbum(state) {
      state.status = 'loading';
    },
    fetchAlbumSuccess(state, action: PayloadAction<AlbumType[]>) {
      state.status = 'succeeded';
      state.album = action.payload;
    },
    fetchAlbumFailure(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },

  },
});

export const {
  fetchSongs,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSong,
  addSongSuccess,
  addSongFailure,
  updateSong,
  updateSongSuccess,
  updateSongFailure,
  deleteSong,
  deleteSongSuccess,
  deleteSongFailure,
  fetchAlbum,
  fetchAlbumSuccess,
  fetchAlbumFailure,
  fetchArtists,
  fetchArtistsSuccess,
  fetchArtistsFailure,
  fetchGenre,
  fetchGenreSuccess,
  fetchGenreFailure,
  selectSong,
  changeUpdateStatus

} = songsSlice.actions;

export default songsSlice.reducer;