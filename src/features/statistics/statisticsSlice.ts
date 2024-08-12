import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StatisticsState {
  totalSongs: number;
  totalGenres: number;
  totalArtist: number;
  totalAlbum:number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  artistStat:{totalSongs:number,totalAlbums:number};
    genreStat:{totalSongs:number,totalAlbums:number};
    albumStat:{totalSongs:number,totalGenres:number};
}

const initialState: StatisticsState = {
  totalSongs: 0,
  totalGenres: 0,
  totalArtist: 0,
  totalAlbum:0,
  status: 'idle',
  error: null,
  artistStat:{totalSongs:0,totalAlbums:0},
    genreStat:{totalSongs:0,totalAlbums:0},
    albumStat:{totalSongs:0,totalGenres:0}
};

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    fetchStatistics(state) {
      state.status = 'loading';
    },
    fetchStatisticsSuccess(state, action: PayloadAction<{ totalSongs: number; totalGenres: number; totalArtist: number; totalAlbum:number  }>) {
      state.status = 'succeeded';
      state.totalSongs = action.payload.totalSongs;
      state.totalGenres = action.payload.totalGenres;
      state.totalArtist = action.payload.totalArtist;
      state.totalAlbum = action.payload.totalAlbum;
    },
    fetchStatisticsFailure(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
    fetchStatisticsArtist(state, id: PayloadAction<string>) {
      state.status = 'loading';
    },
    fetchStatisticsArtistSuccess(state, action: PayloadAction<{ artistStat:{totalSongs:number,totalAlbums:number} }>) {
      state.status = 'succeeded';
      state.artistStat = action.payload.artistStat;
    },
    fetchStatisticsArtistFailure(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = 'Failed to fetch artist statistics';
    },

    fetchStatisticsAlbum(state, id: PayloadAction<string>) {
      state.status = 'loading';
    },
    fetchStatisticsAlbumSuccess(state, action: PayloadAction<{ albumStat:{totalSongs:number,totalGenres:number} }>) {
      state.status = 'succeeded';
      state.albumStat = action.payload.albumStat;
    },
    fetchStatisticsAlbumFailure(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = 'Failed to fetch album statistics';
    },
    fetchStatisticsGenre(state) {
      state.status = 'loading';
    },
    fetchStatisticsGenreSuccess(state, action: PayloadAction<{ genreStat:{totalSongs:number,totalAlbums:number} }>) {
      state.status = 'succeeded';
      state.genreStat = action.payload.genreStat;
    },
    fetchStatisticsGenreFailure(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = 'Failed to fetch genre statistics';
    },
    

   
  },
});
// export below
export const { fetchStatistics, fetchStatisticsSuccess, fetchStatisticsFailure,fetchStatisticsArtist,
  fetchStatisticsArtistSuccess,fetchStatisticsArtistFailure,
fetchStatisticsAlbum,fetchStatisticsAlbumSuccess,fetchStatisticsAlbumFailure,
fetchStatisticsGenre,fetchStatisticsGenreSuccess,fetchStatisticsGenreFailure } = statisticsSlice.actions;

export default statisticsSlice.reducer;