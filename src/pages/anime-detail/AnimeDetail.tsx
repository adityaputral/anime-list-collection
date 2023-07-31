import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { css } from '@emotion/react';

import apiFetcher from '../../utilities/apiFetcher';
import { addAnime } from '../../store/animeCollections';
import {
  IAnimeDetailData,
  IAnimeCollectionsState,
  IAnimeCollection
} from './../../store/animeCollections';

function AnimeDetail() {
  const [animeDetail, setAnimeDetail] = useState<IAnimeDetailData>({});
  const [collectionListBelong, setCollectionListBelong] = useState<
    { name: string; id: string }[]
  >([]);
  const { animeId } = useParams();
  const dispatch = useDispatch();

  const collections = useSelector(
    (state: IAnimeCollectionsState) => state.animeCollections.collections
  );

  function getCollectionBelonging(): void {
    let collectionList: { name: string; id: string }[] = [];
    collections.forEach((collection: IAnimeCollection) => {
      const foundAnimeList =
        collection.animeList &&
        collection.animeList.length > 0 &&
        collection.animeList.find(
          (animeItem: IAnimeDetailData) => animeItem.id == animeId
        );

      if (foundAnimeList)
        collectionList.push({ name: collection.name, id: collection.id });
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
	  episodes
	  seasonYear
	  averageScore
	  title {
		english
		native
	  }
	}
  }`;

  function handleData(data: { data: { Media: IAnimeDetailData } }): void {
    setAnimeDetail(data.data.Media);
  }

  function handleError(error: unknown): void {
    console.error(error);
  }

  function addToCollection(): void {
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
      <h1>Anime Detail</h1>
      <div
        css={{
          borderRadius: '5px',
          backgroundImage: `url(${animeDetail.bannerImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          boxShadow: '0px 0px 10px rgb(0, 0, 0)',
          position: 'relative',
          height: '300px'
        }}
      ></div>
      <h2>
        {animeDetail.title?.english || '-'} - {animeDetail.seasonYear || '-'}
      </h2>
      <h3>({animeDetail.title?.native || '-'})</h3>
      <br />
      <div
        css={css`
          display: flex;
          @media (max-width: 720px) {
            flex-direction: column;
          }
        `}
      >
        <div
          css={css`
            margin-right: 20px;
          `}
        >
          <div>
            <strong>Genres</strong> :<p>{animeDetail.genres?.toString()}</p>
          </div>
          <div>
            <strong>Episodes</strong> :<p>{animeDetail.episodes?.toString()}</p>
          </div>
          <div>
            <strong>Average Score</strong> :
            <p>{animeDetail.averageScore + ' / 100'}</p>
          </div>

          <div>
            <strong>Season</strong> :<p>{animeDetail.season}</p>
          </div>
        </div>

        <div>
          <strong>Description</strong> : <p>{animeDetail.description}</p>
          <br />
          <strong>Collections</strong> :{' '}
          {collectionListBelong &&
            collectionListBelong.length > 0 &&
            collectionListBelong.map((collectionItem, i) => (
              <>
                <Link to={`/collection-list/${collectionItem.id}/detail`}>
                  {collectionItem.name}
                </Link>
                {i < collectionListBelong.length - 1 ? ', ' : ''}
              </>
            ))}
          <br />
          {/* <Button onClick={addToCollection}>Add Anime To Collection</Button> */}
        </div>
      </div>
    </>
  );
}

export default AnimeDetail;
