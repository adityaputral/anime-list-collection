import * as React from 'react';
import apiFetcher from '../../utilities/apiFetcher';
import { useEffect, useState } from 'react';

function AnimeListing() {
  const [animeList, setAnimeList] = useState([]);

  const query = `
  query ($id: Int) { 
	Media (id: $id, type: ANIME) {
	  id
	  bannerImage
	  title {
		english
	  }
	}
  }
  `;

  function handleData(data) {
    console.log(data.data.Media);
    setAnimeList([data.data.Media]);
  }

  function handleError(error) {
    alert('Error, check console');
    console.error(error);
  }

  useEffect(() => {
    async function populateData() {
      await apiFetcher(query, handleData, handleError);
    }

    populateData();
  }, []);

  return (
    <>
      <h2>Anime Listing</h2>
      {animeList && animeList.length > 0 && animeList[0].bannerImage}
    </>
  );
}

export default AnimeListing;
