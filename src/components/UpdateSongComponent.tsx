import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSong } from '../features/songs/songsSlice';
import { SongType } from '../types';



const UpdateSongComponent: React.FC<SongType> = (song) => {
  const [title, setTitle] = useState(song.title);
  const [artist, setArtist] = useState(song.artist);
  const [genre, setGenre] = useState(song.genre);
  const [album, setAlbum] = useState(song.album);
  const dispatch = useDispatch();

  const handleUpdateSong = () => {
    dispatch(updateSong({ ...song, title, artist,genre,album }));
  };

  return (
    // <div>
    //   <h2>Update Song</h2>
    //   <input
    //     type="text"
    //     placeholder="Title"
    //     value={title}
    //     onChange={(e) => setTitle(e.target.value)}
    //   />
    //   <input
    //     type="text"
    //     placeholder="Artist"
    //     value={artist.name}
    //     onChange={(e) => setArtist(e.target.value)}
    //   />
    //    <input
    //     type="text"
    //     placeholder="Genre"
    //     value={artist}
    //     onChange={(e) => setGenre(e.target.value)}
    //   />
    //     <input
    //       type="text"
    //       placeholder="Album"
    //       value={artist}
    //       onChange={(e) => setAlbum(e.target.value)} />
    //   <button onClick={handleUpdateSong}>Update Song</button>
    // </div>
    <div>
      sd
    </div>
  );
};

export default UpdateSongComponent;