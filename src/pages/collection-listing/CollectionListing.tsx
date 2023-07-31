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
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';
import {
  addCollection,
  removeCollection,
  editCollection,
  addAnime,
  removeAnime
} from '../../store/animeCollections';

import NavigationButton from './NavigationButton';

export default function Counter() {
  const navigate = useNavigate();
  const collections = useSelector(
    (state) => state.animeCollections.collections
  );
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Collection Listing</h2>

      <NavigationButton />
      <Grid container spacing={3}>
        {collections &&
          collections.length > 0 &&
          collections.map((collection, i: number) => {
            return (
              <>
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                  <Card sx={{ height: '100%' }}>
                    <CardHeader
                      action={
                        <>
                          {
                            <IconButton
                              aria-label="delete"
                              title="Delete from collection"
                            >
                              <DeleteIcon
                                onClick={() =>
                                  dispatch(removeCollection(collection.id))
                                }
                              />
                            </IconButton>
                          }
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
          })}
      </Grid>

      <div>
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
      </div>
    </div>
  );
}
// function CollectionListing() {
//   return <h2>Collection Listing</h2>;
// }

// export default CollectionListing;
