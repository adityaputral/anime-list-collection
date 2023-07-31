import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import apiFetcher from '../../utilities/apiFetcher';
import { addAnime } from '../../store/animeCollections';
import {
  IAnimeDetailData,
  IAnimeCollectionsState,
  IAnimeCollection
} from './../../store/animeCollections';

function AnimeDetail() {
  const [animeDetail, setAnimeDetail] = useState<IAnimeDetailData>({});
  const [collectionListBelong, setCollectionListBelong] = useState<string[]>(
    []
  );
  const { animeId } = useParams();
  const dispatch = useDispatch();

  const collections = useSelector(
    (state: IAnimeCollectionsState) => state.animeCollections.collections
  );

  function getCollectionBelonging() {
    let collectionList: string[] = [];
    collections.forEach((collection: IAnimeCollection) => {
      const foundAnimeList =
        collection.animeList &&
        collection.animeList.length > 0 &&
        collection.animeList.find(
          (animeItem: IAnimeDetailData) => animeItem.id == animeId
        );

      if (foundAnimeList) collectionList.push(collection.name);
    });

    setCollectionListBelong(collectionList);
  }

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

  function handleData(data: { data: { Media: IAnimeDetailData } }) {
    setAnimeDetail(data.data.Media);
  }

  function handleError(error: unknown) {
    alert('Error, check console');
    console.error(error);
  }

  function addToCollection() {
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
      getCollectionBelonging();
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
      Collections : {collectionListBelong.toString()}
      <br />
      <Button onClick={addToCollection}>Add Anime To Collection</Button>
    </>
  );
}

export default AnimeDetail;
