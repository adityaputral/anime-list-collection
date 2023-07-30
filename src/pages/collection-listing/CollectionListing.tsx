import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  addCollection,
  removeCollection,
  editCollection,
  addAnime,
  removeAnime
} from '../../store/animeCollections';

export default function Counter() {
  const navigate = useNavigate();
  const collections = useSelector(
    (state) => state.animeCollections.collections
  );
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Collection Listing</h2>
      <Grid container spacing={3}>
        {collections &&
          collections.length > 0 &&
          collections.map((collection, i: number) => {
            let showMore = true;
            function toggleShowMore() {
              showMore = !showMore;
            }
            return (
              <>
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                  <CardActionArea>
                    <Card
                      sx={{ height: '100%' }}
                      onClick={() => navigate(`${collection.id}/detail`)}
                    >
                      <CardMedia
                        sx={{ height: 140 }}
                        image={
                          collection.animeList &&
                          collection.animeList.length > 0
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
                    </Card>
                  </CardActionArea>
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
