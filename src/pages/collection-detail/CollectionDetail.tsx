import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { editCollection, removeAnime } from '../../store/animeCollections';
import Card from '../../components/Card/Card';
import {
  IAnimeDetailData,
  IAnimeCollectionsState,
  IAnimeCollection
} from './../../store/animeCollections';

function CollectionDetail() {
  const [collectionDetailData, setCollectionDetailData] =
    useState<IAnimeCollection>({});
  const [editingCollection, setEditingCollection] = useState<boolean>(false);

  const [textValue, setTextValue] = useState<string>('');
  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTextValue(e.target.value);

  const { collectionId } = useParams();
  const dispatch = useDispatch();
  const collections = useSelector(
    (state: IAnimeCollectionsState) => state.animeCollections.collections
  );

  function findCollectionDetail(): void {
    const foundCollection = collections.find(
      (collection: IAnimeCollection) => collection.id === collectionId
    );

    if (foundCollection) {
      setCollectionDetailData(foundCollection);
      setTextValue(foundCollection.name);
    }
  }

  function removeAnimeFromCollection(animeData: IAnimeDetailData): void {
    if (collectionId) {
      dispatch(
        removeAnime({ animeId: animeData.id, collectionId: collectionId })
      );
      findCollectionDetail();
    }
  }

  function toggleEdit(): void {
    setEditingCollection(!editingCollection);
  }

  function editCollectionName(): void {
    if (collectionId) {
      dispatch(
        editCollection({
          collectionId,
          name: textValue
        })
      );
      setEditingCollection(false);
    }
  }

  useEffect(() => {
    findCollectionDetail();
  }, []);
  return (
    <>
      <h2>Collection Detail</h2>
      {editingCollection ? (
        <TextField onChange={onTextChange} value={textValue} />
      ) : (
        textValue
      )}

      <Button onClick={editingCollection ? editCollectionName : toggleEdit}>
        {editingCollection ? 'Submit' : 'Edit'}
      </Button>

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
