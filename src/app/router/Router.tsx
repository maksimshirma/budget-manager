import { Suspense } from 'react';
import { BrowserRouter, Navigate, NavLink, Outlet, Route, Routes } from 'react-router';
import {
  LazyBudgets,
  LazyCategories,
  LazyDashboard,
  LazyLogin,
  LazyRecover,
  LazyRegister,
  LazyTransactions,
  NotFound,
} from '@/pages';
import { Loader, pathnamesMap, pathsMap } from '@/shared';
import ProtectedRoute from './ProtectedRoute';
import { IRouterProps } from './types';
import { LazyProfile } from '@/pages/profile';

const Router = ({ isAuthorized }: IRouterProps) => (
  <BrowserRouter>
    <Routes>
      <Route index element={<Navigate to={pathsMap.dashboard} replace />} />

      <Route
        path={pathsMap.auth}
        element={
          <ProtectedRoute available={!isAuthorized} redirectPath={pathsMap.dashboard}>
            <>
              <NavLink to={pathsMap.login}>{pathnamesMap.login}</NavLink>
              <NavLink to={pathsMap.register}>{pathnamesMap.register}</NavLink>
              <NavLink to={pathsMap.recover}>{pathnamesMap.recover}</NavLink>
              <Outlet />
            </>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to={pathsMap.login} />} />
        <Route
          path={pathsMap.login}
          element={
            <Suspense fallback={<Loader />}>
              <LazyLogin />
            </Suspense>
          }
        />
        <Route
          path={pathsMap.register}
          element={
            <Suspense fallback={<Loader />}>
              <LazyRegister />
            </Suspense>
          }
        />
        <Route
          path={pathsMap.recover}
          element={
            <Suspense fallback={<Loader />}>
              <LazyRecover />
            </Suspense>
          }
        />
      </Route>

      <Route
        element={
          <ProtectedRoute available={isAuthorized} redirectPath={pathsMap.auth}>
            <>
              <NavLink to={pathsMap.dashboard}>{pathnamesMap.dashboard}</NavLink>
              <NavLink to={pathsMap.transactions}>{pathnamesMap.transactions}</NavLink>
              <NavLink to={pathsMap.categories}>{pathnamesMap.categories}</NavLink>
              <NavLink to={pathsMap.budgets}>{pathnamesMap.budgets}</NavLink>
              <NavLink to={pathsMap.profile}>{pathnamesMap.profile}</NavLink>
              <Outlet />
            </>
          </ProtectedRoute>
        }
      >
        <Route
          path={pathsMap.dashboard}
          element={
            <Suspense fallback={<Loader />}>
              <LazyDashboard />
            </Suspense>
          }
        />
        <Route
          path={pathsMap.transactions}
          element={
            <Suspense fallback={<Loader />}>
              <LazyTransactions />
            </Suspense>
          }
        />
        <Route
          path={pathsMap.categories}
          element={
            <Suspense fallback={<Loader />}>
              <LazyCategories />
            </Suspense>
          }
        />
        <Route
          path={pathsMap.budgets}
          element={
            <Suspense fallback={<Loader />}>
              <LazyBudgets />
            </Suspense>
          }
        />
        <Route
          path={pathsMap.profile}
          element={
            <Suspense fallback={<Loader />}>
              <LazyProfile />
            </Suspense>
          }
        />
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
