import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { editCollection, removeAnime } from '../../store/animeCollections';
import Card from '../../components/Card/Card';
import {
  IAnimeDetailData,
  IAnimeCollectionsState,
  IAnimeCollection
} from './../../store/animeCollections';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  textAlign: 'center'
};

function CollectionDetail() {
  const [collectionDetailData, setCollectionDetailData] =
    useState<IAnimeCollection>({});

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

  function editCollectionName(): void {
    if (collectionId) {
      dispatch(
        editCollection({
          collectionId,
          name: textValue
        })
      );
    }
  }

  useEffect(() => {
    findCollectionDetail();
  }, [collections]);

  const [animeData, setAnimeData] = useState<IAnimeDetailData>({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  function deleteConfirmation(animeData: IAnimeDetailData): void {
    setOpenDeleteModal(true);
    setAnimeData(animeData);
  }
  function handleDeleteModalClose(): void {
    setOpenDeleteModal(false);
  }

  return (
    <>
      <Link to={`/collection-list`}>Back to My Collections</Link>
      <h1>Collection Detail</h1>
      <div css={{ display: 'flex' }}>
        <TextField
          fullWidth
          label="Collection Name"
          variant="standard"
          onChange={onTextChange}
          value={textValue}
        />

        <Button onClick={editCollectionName}>Update</Button>
      </div>

      <h2>Anime List</h2>
      {collectionDetailData &&
      collectionDetailData.animeList &&
      collectionDetailData.animeList.length > 0 ? (
        <Card
          items={collectionDetailData.animeList}
          deleteFn={deleteConfirmation}
        />
      ) : (
        <p>
          No anime added yet. Browse list of anime you want to add,
          <Link to={`/anime-list`}> here</Link>.
        </p>
      )}

      <Modal
        open={openDeleteModal}
        onClose={handleDeleteModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack component="form" spacing={2} sx={{ textAlign: 'center' }}>
            <Typography paragraph gutterBottom component="div">
              {' '}
              Are you sure you want to remove
              <strong> {animeData.title?.english}</strong> from the collection?
            </Typography>
          </Stack>
          <Button
            onClick={() => {
              removeAnimeFromCollection(animeData);
              setAnimeData({});
              handleDeleteModalClose();
            }}
          >
            Yes
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteModalClose();
            }}
          >
            No
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default CollectionDetail;
