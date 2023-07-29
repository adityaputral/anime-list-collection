import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';

import apiFetcher from '../../utilities/apiFetcher';

function AnimeDetail() {
  const [animeDetail, setAnimeDetail] = useState({});
  const { animeId } = useParams();

  const query = `
  query ($id: Int) { 
	Media (id: $id, type: ANIME) { 
	  id
	  bannerImage
	  description
	  season
	  genres
	  title {
		english
		native
	  }
	}
  }`;

  function handleData(data) {
    setAnimeDetail(data.data.Media);
  }

  function handleError(error) {
    alert('Error, check console');
    console.error(error);
  }

  useEffect(() => {
    async function populateData() {
      await apiFetcher(query, { id: animeId }, handleData, handleError);
    }

    populateData();
  }, []);

  return (
    <>
      <h2>Anime Detail</h2>
      <img src={animeDetail.bannerImage} alt="" />

      <Typography gutterBottom variant="h1" component="div">
        {animeDetail.title?.english} ({animeDetail.title?.native})
      </Typography>
      <br />
      {animeDetail.description}
      <br />
      {animeDetail.season}
      <br />
      {animeDetail.genres?.toString()}
    </>
  );
}

export default AnimeDetail;
