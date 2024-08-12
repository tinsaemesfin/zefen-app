// CardLayout.tsx

import React from "react";
import styled from "@emotion/styled";
import { SongType } from "../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import {
  changeUpdateStatus,
  deleteSong,
  selectSong,
} from "../features/songs/songsSlice";
import { Tooltip as ReactTooltip } from "react-tooltip";
import ArtistTooltip from "./subComponents/ArtistTooltip";

// Define styled components
const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 4rem;
  margin: 5rem;

  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1100px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Card = styled.article`
  background: #506e61;
  border-radius: 1rem;
  overflow: hidden;
  color: #fff;
  font-family: "Rubik", sans-serif;
  font-weight: 300;

  @media (max-width: 800px) {
    margin-bottom: 4rem;
  }
`;

const ImageContainer = styled.div`
  position: relative;

  img {
    display: block;
    width: 100%;
  }

  .note {
    position: absolute;
    border-top-left-radius: 1rem;
    right: 0;
    bottom: 0;
    padding: 8px 1.3rem;
    font-size: 1rem;
    text-transform: uppercase;
    background: #fff;
    color: #0d0c0c;
  }
.buttonContainer{
position: absolute;
    border-bottom-left-radius: 1rem;
    right: 0;
    top: 0;
    padding: 8px 1.3rem;
    font-size: 1rem;
    text-transform: uppercase;
    color: #0d0c0c;

    .delete{
      background: red;
      }

}

  .
`;

const CardContent = styled.div`
  padding: 0.5rem;

  h2 {
    font-size: 1.5rem;

    border-bottom: 2px solid rgba(255, 255, 255, 0.5);
    line-height: 3.2rem;

    @media (max-width: 600px) {
      font-size: 2rem;
    }
  }

  p,
  ul {
    font-size: 1.1rem;
    line-height: 2.4rem;
    margin-bottom: 1rem;
  }

  ul {
    margin-left: 3rem;
    margin-bottom: 2rem;

    li {
      position: relative;
      line-height: 2.6rem;

      &:after {
        position: absolute;
        content: "";
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512' width='100' title='star'%3E%3Cpath fill='rgba(255,255,255,0.6)' d='M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z' /%3E%3C/svg%3E")
          no-repeat center;
        width: 1.2rem;
        height: 1.2rem;
        top: 5px;
        left: -2rem;
      }
    }
  }
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
interface Songsprops {
  songs: SongType[];
  setIsDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardLayout: React.FC<Songsprops> = ({ songs, setIsDialogOpen }) => {
  const dispatch = useDispatch<AppDispatch>();
  // const song = useSelector((state: RootState) => state.songs.song);

  if (songs.length < 1) {
    return <h1>No songs</h1>;
  } else {
    const handleDelete = (id: string) => {
      dispatch(deleteSong(id));
    };
    const handleUpdate = (song: SongType) => {
      dispatch(changeUpdateStatus(true));
      dispatch(selectSong(song));
      setIsDialogOpen && setIsDialogOpen(true);
      // dispatch(updateSong(song));
    };

    return (
      <CardsContainer>
        {songs.map((song, index) => (
          <Card key={song._id}>
            <ImageContainer>
              <div className="buttonContainer">
                <Button
                  onClick={() => handleDelete(song._id)}
                  className="delete"
                >
                  Delete
                </Button>
                <Button onClick={() => handleUpdate(song)}>Edit</Button>
              </div>

              <img src={song.imgUrl} alt={song.title} />
              <p className="note">{song.genre.name}</p>
            </ImageContainer>
            <CardContent>
              <h2>
                {song.title} <span className="pipe">|</span>{" "}
                <span data-tooltip-id={`artist-tooltip-${index}`}>
                  {" "}
                  {song.artist.name}{" "}
                </span>
                <ReactTooltip id={`artist-tooltip-${index}`}>
                  <ArtistTooltip whichContainer="artist" index={index} id={song.artist._id} />
                </ReactTooltip>
              </h2>
              <p data-tooltip-id={`album-tooltip-${index}`}>
                {song.album.title} <span className="pipe">|</span> Album
                <ReactTooltip id={`album-tooltip-${index}`}>
                  <ArtistTooltip whichContainer="album" index={index} id={song.album._id} />
                </ReactTooltip>
              </p>
            </CardContent>
          </Card>
        ))}
      </CardsContainer>
    );
  }
};

export default CardLayout;
