export type SongType ={
    _id: string;
    title: string;
    artist: ArtistType;
    genre: GenreType;
    album: AlbumType;
    imgUrl: string;
  }
  export type GenreType ={
    _id: string;
    name: string;
    
  }
  export type ArtistType ={
    _id: string;
    name: string;
    genre: GenreType;
    albums: AlbumType[][];
  }
  export type AlbumType ={
    _id: string;
    artist: ArtistType;
    title: string;
    genre: GenreType;
    songs: SongType[];
  }