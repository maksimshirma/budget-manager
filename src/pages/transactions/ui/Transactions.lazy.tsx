import { lazy } from 'react';

const LazyTransactions = lazy(() => import('./Transactions'));

export default LazyTransactions;
