import { useSelector, useDispatch } from 'react-redux';
import {
  addCollection,
  removeCollection,
  addAnime,
  removeAnime
} from '../../store/animeCollections';

export default function Counter() {
  const collections = useSelector(
    (state) => state.animeCollections.collections
  );
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() =>
            dispatch(
              addCollection({
                name: 'collection1',
                animeList: [{ id: '1', name: 'sss' }]
              })
            )
          }
        >
          Add Collection
        </button>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(removeCollection('collection1'))}
        >
          Remove Collection
        </button>

        <button
          aria-label="Add Anime"
          onClick={() =>
            dispatch(
              addAnime({
                animeDetail: { id: '2', name: 'Anime 2' },
                collectionName: 'collection1'
              })
            )
          }
        >
          Add Anime
        </button>

        <button
          aria-label="Remove Anime"
          onClick={() =>
            dispatch(
              removeAnime({ animeId: '2', collectionName: 'collection1' })
            )
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
