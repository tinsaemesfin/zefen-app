// ArtistTooltip.tsx
import React, { useEffect } from "react";
import { ArtistType } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { fetchStatisticsAlbum, fetchStatisticsArtist } from "../../features/statistics/statisticsSlice";

interface ArtistTooltipProps {
  id: string;
  index: number;
  whichContainer: string;
}

const ArtistTooltip: React.FC<ArtistTooltipProps> = ({
  id,
  index,
  whichContainer,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const stats = useSelector((state: RootState) => state.statistics);
  console.log("the id is " + id);
  
  useEffect(() => {
    if (whichContainer === "artist") {
      dispatch(fetchStatisticsArtist(id));
    }
    else if(whichContainer === "album"){
      dispatch(fetchStatisticsAlbum(id));
    }
  },[whichContainer,dispatch,id]);
  
  return (
    <div>
      {whichContainer === "artist" && (
        <>
      <p> Total Songs{stats.artistStat.totalSongs}</p>
      <p> Total Albums{stats.artistStat.totalAlbums}</p>
      </>


      )}
      {whichContainer === "album" && (
        <>
      <p> Total Songs{stats.albumStat.totalSongs}</p>
      <p> Total genres{stats.albumStat.totalGenres}</p>
      </>


      )}
      
      
      {/* Add more artist details if needed */}
    </div>
  );
};

export default ArtistTooltip;
