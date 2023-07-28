import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '../layout/AppLayout.js';
import AnimeListing from '../pages/anime-listing/AnimeListing';
import AnimeDetail from '../pages/anime-detail/AnimeDetail';
import CollectionListing from '../pages/collection-listing/CollectionListing';
import CollectionDetail from '../pages/collection-detail/CollectionDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/anime-list" replace /> },
      {
        path: 'anime-list',
        element: <AnimeListing />
      },
      {
        path: 'anime-list/:animeId/detail',
        element: <AnimeDetail />
      },
      {
        path: 'collection-list',
        element: <CollectionListing />
      },
      {
        path: 'collection-list/:collectionId/detail',
        element: <CollectionDetail />
      }
    ]
  }
]);
