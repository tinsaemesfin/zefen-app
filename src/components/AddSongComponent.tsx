import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSong } from '../features/songs/songsSlice';

const AddSongComponent: React.FC = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const [album, setAlbum] = useState('');

  const _id = '';
  const dispatch = useDispatch();

  const handleAddSong = () => {
    // dispatch(addSong({ title, artist,genre,_id,album }));
    setTitle('');
    setArtist('');
  };

  return (
    <div>
      <h2>Add Song</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />
       <input
        type="text"
        placeholder="Genre"
        value={artist}
        onChange={(e) => setGenre(e.target.value)}
      />
      <input
        type="text"
        placeholder="Album"
        value={album}
        onChange={(e) => setAlbum(e.target.value)}
      />
      <button onClick={handleAddSong}>Add Song</button>
    </div>
  );
};

export default AddSongComponent;