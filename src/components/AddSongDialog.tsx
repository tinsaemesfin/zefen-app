import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSong, fetchAlbum, fetchArtists, fetchGenre, updateSong } from '../features/songs/songsSlice';
import Modal from './subComponents/Modal';
import styled from '@emotion/styled';
import { AlbumType, ArtistType, GenreType, SongType } from '../types';
import { RootState } from '../app/store';

interface AddSongDialogProps {
    isOpen:boolean;
  onClose: () => void;
  song?: SongType;
//   onAddSong: (song: { id:string, title: string; artist: string; genre: string }) => void;
}
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;
const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  &:hover {
    background-color: #0056b3;
  }
  &:not(:last-of-type) {
    margin-right: 10px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const AddSongDialog: React.FC<AddSongDialogProps> = ({ onClose,isOpen }) => {
    const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.songs);

  const [title, setTitle] = useState<string|undefined>(state.song?.title ||'');
  const [artist, setArtist] = useState<ArtistType|undefined>(state.song?.artist);
  const [genre, setGenre] = useState<GenreType|undefined>(state.song?.genre);
  const [album, setAlbum] = useState<AlbumType|undefined>(state.song?.album);
  useEffect(() => {
    console.log('Use-Effect IS Running')
  dispatch(fetchArtists());
  dispatch(fetchGenre());
  dispatch(fetchAlbum());
  },[dispatch]);
  

  const handleSubmit = (e: React.FormEvent) => {
    console.log(genre);
    e.preventDefault();
    const _id='';
    if(!title || !artist || !genre || !album) return;
    const newSong: SongType = { _id,title, artist, genre,album,imgUrl:'https://via.assets.so/album.png?id='+Math.random()*100000+'&q=95&w=360&h=360&fit=fill' };
    
    dispatch(addSong(newSong));
    onClose();
  };
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newSong: Partial<SongType> = {_id:state.song?._id , title, artist: artist && artist, genre: genre && genre, album: album && album, imgUrl:'https://via.assets.so/album.png?id='+Math.random()*100000+'&q=95&w=360&h=360&fit=fill' };
    dispatch(updateSong(newSong as SongType));
    onClose();
    // song ? dispatch(updateSong(newSong)) : dispatch(addSong(newSong));
    // onClose();
  };
  const handleArtistChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const selectedArtist = state.artists?.find((artist) => artist._id === e.target.value);
    setArtist(selectedArtist && selectedArtist );
  };
  const handleGenreChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGenre = state.genre?.find((genre) => genre._id === e.target.value);
    setGenre(selectedGenre );
  };
  const handleAlbumChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAlbum = state.album?.find((album) => album._id === e.target.value);
    setAlbum(selectedAlbum && selectedAlbum );
  };
  
console.log('genre is '+JSON.stringify(genre));
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2> {state.updateStatus ? 'Update ':'Add New '} Song</h2>
      {state.updateStatus &&  <p>Song Image Will be a random image from dev.me</p> } 
      <Form onSubmit={state.updateStatus ? handleUpdate : handleSubmit}>
        <FormGroup>
          <Label>Title</Label>
          <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label>Artist</Label>
          <Select value={artist?._id || ''} onChange={handleArtistChange} required >
            <option disabled value="">Select Artist</option>
          {state.artists.map((a) => (
            <option key={a._id} value={a._id}>{a.name}</option>))
            }
            </Select>

        </FormGroup>
        <FormGroup>
          <Label>Genre</Label>
          <Select value={genre?._id || ''} onChange={handleGenreChange} required>
  <option disabled value=''>Select Genre</option>
  {state.genre.map((g) => (
    <option key={g._id} value={g._id}>{g.name}</option>
  ))}
</Select>
        </FormGroup>
        <FormGroup>
          <Label>Album</Label>
          <Select value={album?._id || ''} onChange={handleAlbumChange} required >
              <option disabled value="">Select Album</option>
          {state.album.map((a) => (
            <option key={a._id} value={a._id}>{a.title}</option>))
            }
            </Select>
        </FormGroup>
        <ButtonGroup>
          <Button type="submit">{ state.song ? 'Update': 'Add'} Song</Button>
          <Button type="button" onClick={onClose}>Cancel</Button>
        </ButtonGroup>
      </Form>
    </Modal>
  );
};

export default AddSongDialog;