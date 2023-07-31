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

import { useNavigate } from 'react-router-dom';
import { removeCollection, editCollection } from '../../store/animeCollections';

import CollectionCard from './../../components/Card/CollectionCard';

import {
  IAnimeDetailData,
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
  }

  const [open, setOpen] = useState(false);
  function handleOpen(collectionData: { name: string; id: string }): void {
    setOpen(true);
    setCollectionTitle(collectionData);
  }
  function handleClose(): void {
    setOpen(false);
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

  return (
    <div>
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
                            title="Delete from collection"
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
                          : ''
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
              label="Title"
              fullWidth
              onChange={onTitleChange}
              value={collectionTitle.name}
            />

            <Button
              onClick={() => {
                dispatch(
                  editCollection({
                    collectionId: collectionTitle.id,
                    name: collectionTitle.name
                  })
                );
                setCollectionTitle({ name: '', id: '' });
                handleClose();
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
            <p>
              Are you sure you want to remove{' '}
              <strong>{collectionTitle.name}</strong> from the collection?
            </p>
          </Stack>
          <Button
            onClick={() => {
              dispatch(removeCollection(collectionTitle.id));
              setCollectionTitle({ name: '', id: '' });
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
      {/* <div>
        <button
          aria-label="Increment value"
          onClick={() =>
            dispatch(
              addCollection({
                id: 'col1',
                name: 'collection1',
                animeList: []
              })
            )
          }
        >
          Add Collection
        </button>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(removeCollection('col1'))}
        >
          Remove Collection
        </button>

        <button
          aria-label="Increment value"
          onClick={() =>
            dispatch(
              editCollection({
                collectionId: 'col1',
                name: 'collection 1 edited'
              })
            )
          }
        >
          Edit Collection
        </button>

        <button
          aria-label="Add Anime"
          onClick={() =>
            dispatch(
              addAnime({
                animeDetail: { id: '2', name: 'Anime 2' },
                collectionId: 'col1'
              })
            )
          }
        >
          Add Anime
        </button>

        <button
          aria-label="Remove Anime"
          onClick={() =>
            dispatch(removeAnime({ animeId: '2', collectionId: 'col1' }))
          }
        >
          Remove Anime
        </button>
      </div> */}
    </div>
  );
}
