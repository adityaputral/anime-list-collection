import * as React from 'react';
import apiFetcher from '../../utilities/apiFetcher';
import Card from '../../components/Card/Card';
import Pagination from '../../components/Pagination/Pagination';
import { AnimeListingResponse } from './AnimeListing';

import { useEffect, useState } from 'react';

function AnimeListing() {
  const [animeList, setAnimeList] = useState<AnimeListingResponse[]>([]);

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

  function handleData(data: { data: AnimeListingResponse }) {
    console.log(data.data.Media);
    setAnimeList([...data.data.Page.media]);
  }

  function handleError(error: unknown) {
    alert('Error, check console');
    console.error(error);
  }

  useEffect(() => {
    async function populateData() {
      await apiFetcher(query, variables, handleData, handleError);
    }

    populateData();
  }, []);

  async function changeCurrentActivePage(pageNumber: number) {
    await apiFetcher(
      query,
      { ...variables, page: pageNumber },
      handleData,
      handleError
    );
  }

  return (
    <>
      <h2>Anime Listing</h2>
      <Card items={animeList} deleteFn={null} />
      <Pagination currentActivePageNumberChanged={changeCurrentActivePage} />
    </>
  );
}

export default AnimeListing;
