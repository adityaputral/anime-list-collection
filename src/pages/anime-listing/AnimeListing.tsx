import { Link } from 'react-router-dom';
import apiFetcher from '../../utilities/apiFetcher';
import Card from '../../components/Card/Card';
import Pagination from '../../components/Pagination/Pagination';

import { IAnimeListingResponse } from './AnimeListing';
import { useLoading } from './../../context/LoadingContext';

import { useEffect, useState } from 'react';

function AnimeListing() {
  const [animeList, setAnimeList] = useState<IAnimeListingResponse[]>([]);

  const query = `
  query ($id: Int, $page: Int, $perPage: Int, $search: String) {
	Page (page: $page, perPage: $perPage) {
	  pageInfo {
		total
		currentPage
		lastPage
		hasNextPage
		perPage
	  }
	  media (id: $id, search: $search) {
		id
		bannerImage
		description
		genres
		title {
		  english
		}
	  }
	}
  }
  `;

  const variables = {
    page: 1,
    perPage: 10
  };

  function handleData(data: { data: IAnimeListingResponse }): void {
    setAnimeList([...data.data.Page.media]);
  }

  function handleError(error: unknown): void {
    console.error(error);
  }

  const { setLoading } = useLoading();

  useEffect(() => {
    async function populateData() {
      await apiFetcher(query, variables, handleData, handleError);
    }

    populateData();
    setLoading(false);
  }, []);

  async function changeCurrentActivePage(pageNumber: number): Promise<void> {
    setLoading(true);
    await apiFetcher(
      query,
      { ...variables, page: pageNumber },
      handleData,
      handleError
    );
    setLoading(false);
  }

  return (
    <>
      <div
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <h1>Anime Listing</h1>
        <Link to={`/collection-list`}>My Collections</Link>
      </div>

      {animeList && animeList.length > 0 ? (
        <>
          <Card items={animeList} deleteFn={null} />
          <Pagination
            currentActivePageNumberChanged={changeCurrentActivePage}
          />
        </>
      ) : (
        'No anime available'
      )}
    </>
  );
}

export default AnimeListing;
