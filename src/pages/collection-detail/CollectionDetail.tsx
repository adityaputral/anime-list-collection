import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editCollection, removeAnime } from '../../store/animeCollections';
import Card from '../../components/Card/Card';

function CollectionDetail() {
  const [collectionDetailData, setCollectionDetailData] = useState({});
  const { collectionId } = useParams();
  const dispatch = useDispatch();
  const collections = useSelector(
    (state) => state.animeCollections.collections
  );

  function findCollectionDetail() {
    const foundCollection = collections.find(
      (collection) => collection.id === collectionId
    );

    if (foundCollection) setCollectionDetailData(foundCollection);
  }

  function removeAnimeFromCollection(animeData) {
    dispatch(
      removeAnime({ animeId: animeData.id, collectionId: collectionId })
    );
    findCollectionDetail();
  }

  useEffect(() => {
    findCollectionDetail();
  }, []);
  return (
    <>
      <h2>Collection Detail</h2>
      {collectionDetailData?.name}

      <h3>Anime List</h3>
      {collectionDetailData &&
      collectionDetailData.animeList &&
      collectionDetailData.animeList.length > 0 ? (
        <Card
          items={collectionDetailData.animeList}
          deleteFn={removeAnimeFromCollection}
        />
      ) : (
        'No anime added yet.'
      )}
    </>
  );
}

export default CollectionDetail;
