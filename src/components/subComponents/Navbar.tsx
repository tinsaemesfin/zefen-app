// Navbar.tsx

import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { fetchStatistics } from '../../features/statistics/statisticsSlice';

// Define styled components for each element
const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
`;

const NavbarBrand = styled.a`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
`;

const NavbarToggler = styled.button`
  background: none;
  border: none;
  color: #fff;
`;

const NavbarCollapse = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const NavbarNav = styled.ul`
  list-style: none;
  display: flex;
  gap: 15px;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  color: #fff;
`;

const NavLink = styled.p`
  color: #fff;
  text-decoration: none;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
`;

const Navbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const statistics = useSelector((state: RootState) => state.statistics);

  useEffect(() => {
    dispatch(fetchStatistics());
  }, [dispatch]);
  // <p>Total Songs: {statistics.totalSongs}</p>
  //     <p>Total Genres: {statistics.totalGenres}</p>
  //     <p>Total Albums: {statistics.totalAlbum}</p>
  //     <p>Total Artist: {statistics.totalArtist}</p>
  return (
    <NavbarContainer>
      <NavbarBrand href="index.html">Zefen</NavbarBrand>
      <NavbarToggler type="button">
        <span></span>
      </NavbarToggler>
      <NavbarCollapse>
        <NavbarNav>
          <NavItem>
            <NavLink > Total Songs : {statistics.totalSongs}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink >Total Genres: {statistics.totalGenres}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink >Total Albums: {statistics.totalAlbum}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink >Total Artist: {statistics.totalArtist}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink >
              <i className="fa fa-user" aria-hidden="true"></i>
              <span>Login</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink >
              <i className="fa fa-user" aria-hidden="true"></i>
              <span>Sign Up</span>
            </NavLink>
          </NavItem>
          <form className="form-inline">
            <SearchButton type="submit">
              <i className="fa fa-search" aria-hidden="true"></i>
            </SearchButton>
          </form>
        </NavbarNav>
      </NavbarCollapse>
    </NavbarContainer>
  );
};

export default Navbar;