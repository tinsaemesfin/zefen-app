import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchSongs} from '../features/songs/songsSlice';
import AddSongDialog from './AddSongDialog';
import styled from '@emotion/styled';
import CardLayout from './CardLayout';
import DetailBoxAndSearch from './subComponents/DetailSection';
import Navbar from './subComponents/Navbar';

const SongListContainer = styled.div`
  padding: 20px;
`;



const Home: React.FC = () => {
  
  const dispatch = useDispatch<AppDispatch>();
  const songs = useSelector((state: RootState) => state.songs.songs);
  const songStatus = useSelector((state: RootState) => state.songs.status);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (songStatus === 'idle') {
      dispatch(fetchSongs({}));
    }
  }, [songStatus, dispatch]);


  return (
    <>
    <Navbar  />
    <DetailBoxAndSearch setIsDialogOpen={setIsDialogOpen} />
    <SongListContainer>
      <h2>Song List</h2>
      {/* <Filter /> */}
      {songStatus === 'loading' && <div>Loading...</div>}
      <CardLayout songs={songs} setIsDialogOpen={setIsDialogOpen} />
       {isDialogOpen && <AddSongDialog onClose={() => setIsDialogOpen(false)} isOpen={isDialogOpen}  />}
    </SongListContainer>
    </>
  );
};

export default Home;