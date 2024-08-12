import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSongs } from '../features/songs/songsSlice';
import styled from '@emotion/styled';

const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

const Filter: React.FC = () => {
  const [genre, setGenre] = useState('');
  const dispatch = useDispatch();

  const handleFilter = () => {
    dispatch(fetchSongs({ genre }));
  };

  return (
    <FilterContainer>
      <input
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="Filter by genre"
      />
      <button onClick={handleFilter}>Filter</button>
    </FilterContainer>
  );
};

export default Filter;