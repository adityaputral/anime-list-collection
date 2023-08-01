import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';

import { useSnackbar } from './../../context/SnackbarContext';

import { useNavigate } from 'react-router-dom';
import { removeCollection, editCollection } from '../../store/animeCollections';

import CollectionCard from './../../components/Card/CollectionCard';

import {
  IAnimeCollectionsState,
  IAnimeCollection
} from './../../store/animeCollections';

import NavigationButton from './NavigationButton';

export default function Counter() {
  const navigate = useNavigate();
  const collections = useSelector(
    (state: IAnimeCollectionsState) => state.animeCollections.collections
  );
  const dispatch = useDispatch();

  const [collectionTitle, setCollectionTitle] = useState<{
    name: string;
    id: string | number;
  }>({ name: '', id: '' });

  function onTitleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setCollectionTitle({ name: e.target.value, id: collectionTitle.id });
    validateUniqueness(e.target.value, collectionTitle.id);
    validateSpecialCharacter(e.target.value);
  }

  const [open, setOpen] = useState(false);
  function handleOpen(collectionData: { name: string; id: string }): void {
    setOpen(true);
    setCollectionTitle(collectionData);
  }
  function handleClose(): void {
    setOpen(false);
    setNameUnique(true);
    setContainSpecialCharacter(false);
  }

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  function deleteConfirmation(collectionData: {
    name: string;
    id: string;
  }): void {
    setOpenDeleteModal(true);
    setCollectionTitle(collectionData);
  }
  function handleDeleteModalClose(): void {
    setOpenDeleteModal(false);
  }

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

  const { setOpenSnackbar, setMessage } = useSnackbar();

  const [nameUnique, setNameUnique] = useState<boolean>(true);
  function validateUniqueness(
    collectionName: string,
    collectionId: string | number
  ): void {
    if (
      collections &&
      collections.length > 0 &&
      collections.find(
        (collection: IAnimeCollection) =>
          collection.name == collectionName && collection.id !== collectionId
      )
    )
      setNameUnique(false);
    else setNameUnique(true);
  }

  const [containSpecialCharacter, setContainSpecialCharacter] =
    useState<boolean>(false);
  function validateSpecialCharacter(collectionName: string): void {
    const pattern = /^[\w&]+$/;
    const isValid = pattern.test(collectionName);
    console.log(isValid);

    if (isValid) setContainSpecialCharacter(false);
    else setContainSpecialCharacter(true);
  }

  function updateTitle() {
    if (nameUnique && !containSpecialCharacter) {
      dispatch(
        editCollection({
          collectionId: collectionTitle.id,
          name: collectionTitle.name
        })
      );
      setOpenSnackbar(true);
      setMessage('Collection updated successfully.');
      setCollectionTitle({ name: '', id: '' });
      handleClose();
    }
  }

  return (
    <div>
      <Link to={`/anime-list`}>Browse Anime</Link>
      <div
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <h1>My Collections</h1>
        <NavigationButton />
      </div>

      <Grid container spacing={3}>
        {collections && collections.length > 0 ? (
          collections.map((collection: IAnimeCollection, i: number) => {
            return (
              <>
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                  <Card sx={{ height: '100%' }}>
                    <CardHeader
                      action={
                        <>
                          <IconButton
                            aria-label="delete"
                            title="Delete collection"
                          >
                            <DeleteIcon
                              onClick={() =>
                                deleteConfirmation({
                                  name: collection.name,
                                  id: collection.id
                                })
                              }
                            />
                          </IconButton>

                          <IconButton aria-label="Edit" title="Edit collection">
                            <ModeEditIcon
                              onClick={() =>
                                handleOpen({
                                  name: collection.name,
                                  id: collection.id
                                })
                              }
                            />
                          </IconButton>
                        </>
                      }
                    />
                    <CardMedia
                      sx={{ height: 140 }}
                      image={
                        collection.animeList && collection.animeList.length > 0
                          ? collection.animeList[0].bannerImage
                          : './default-collection-placehoder.png'
                      }
                      title={collection.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {collection.name}
                      </Typography>
                    </CardContent>

                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => navigate(`${collection.id}/detail`)}
                      >
                        View Collection
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </>
            );
          })
        ) : (
          <Grid item>No collection available</Grid>
        )}
      </Grid>

      <CollectionCard />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack component="form" spacing={2}>
            <TextField
              error={nameUnique && !containSpecialCharacter ? false : true}
              helperText={
                nameUnique
                  ? !containSpecialCharacter
                    ? ''
                    : 'Collection name should not have contain special character.'
                  : 'Collection with the same name already exist.'
              }
              label="Collection name"
              fullWidth
              onChange={onTitleChange}
              value={collectionTitle.name}
            />

            <Button
              onClick={() => {
                updateTitle();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

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
              Are you sure you want to remove{' '}
              <strong>{collectionTitle.name}</strong> from the collection?
            </Typography>
          </Stack>
          <Button
            onClick={() => {
              dispatch(removeCollection(collectionTitle.id));
              setCollectionTitle({ name: '', id: '' });
              handleDeleteModalClose();
              setOpenSnackbar(true);
              setMessage('Collection deleted successfully.');
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
    </div>
  );
}
