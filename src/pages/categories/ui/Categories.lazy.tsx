import { lazy } from 'react';

const LazyCategories = lazy(() => import('./Categories'));

export default LazyCategories;
