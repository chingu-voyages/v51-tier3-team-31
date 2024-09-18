// src/router.tsx

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Landing from './Pages/Landing';
import Home from './Pages/Home';
import Login from './Pages/Login';
import { PublicLayout } from './Layouts/PublicLayout';
import { ProtectedLayout } from './Layouts/ProtectedLayout';
import { AuthLayout } from './Layouts/AuthLayout';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AuthLayout />}>
        <Route element={<PublicLayout />}>
          <Route
            path="/"
            element={<Landing />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
        </Route>

        <Route element={<ProtectedLayout />}>
          <Route
            path="/home"
            element={<Home />}
          />
        </Route>
      </Route>
    </>
  )
);
