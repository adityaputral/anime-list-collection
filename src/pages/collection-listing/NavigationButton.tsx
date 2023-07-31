import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { addCollection } from '../../store/animeCollections';
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
  p: 4
};

function NavigationButton() {
  const dispatch = useDispatch();
  const collections = useSelector(
    (state: IAnimeCollectionsState) => state.animeCollections.collections
  );

  const [collectionTitle, setCollectionTitle] = useState<string>('');
  function onTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCollectionTitle(e.target.value);
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>Add Collection</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack component="form" spacing={2}>
            <TextField
              label="Collection Name"
              fullWidth
              onChange={onTitleChange}
              value={collectionTitle}
            />

            <Button
              onClick={() => {
                dispatch(
                  addCollection({
                    id: 'col' + collections.length,
                    name: collectionTitle,
                    animeList: []
                  })
                );
                setCollectionTitle('');
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default NavigationButton;
