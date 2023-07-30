import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import apiFetcher from '../../utilities/apiFetcher';
import { addAnime } from '../../store/animeCollections';

function AnimeDetail() {
  const [animeDetail, setAnimeDetail] = useState({});
  const { animeId } = useParams();
  const dispatch = useDispatch();

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

  function addToCollection(collectionName: string) {
    dispatch(
      addAnime({
        animeDetail: animeDetail,
        collectionId: 'col1'
      })
    );
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

      <br />
      <Button onClick={addToCollection}>Add Anime To Collection</Button>
    </>
  );
}

export default AnimeDetail;
