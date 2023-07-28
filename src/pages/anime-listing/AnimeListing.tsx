import * as React from 'react';
import apiFetcher from '../../utilities/apiFetcher';
import Card from '../../components/Card/Card';
import { useEffect, useState } from 'react';

function AnimeListing() {
  const [animeList, setAnimeList] = useState([]);

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
		title {
		  english
		}
	  }
	}
  }
  `;

  const variables = {
    search: 'Fate/Zero',
    page: 1,
    perPage: 20
  };

  function handleData(data) {
    console.log(data.data.Media);
    setAnimeList([...data.data.Page.media]);
  }

  function handleError(error) {
    alert('Error, check console');
    console.error(error);
  }

  useEffect(() => {
    async function populateData() {
      await apiFetcher(query, variables, handleData, handleError);
    }

    populateData();
  }, []);

  return (
    <>
      <h2>Anime Listing</h2>
      <Card items={animeList} />
      {/* {animeList && animeList.length > 0 && animeList[0].bannerImage} */}
    </>
  );
}

export default AnimeListing;
