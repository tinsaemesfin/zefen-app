import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteSong } from '../features/songs/songsSlice';

interface DeleteSongProps {
  songId: string;
}

const DeleteSongComponent: React.FC<DeleteSongProps> = ({ songId }) => {
  const dispatch = useDispatch();

  const handleDeleteSong = () => {
    dispatch(deleteSong(songId));
  };

  return (
    <button onClick={handleDeleteSong}>Delete Song</button>
  );
};

export default DeleteSongComponent;