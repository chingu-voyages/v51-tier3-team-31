// client/src/router.tsx

import Home from './Pages/Home';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([{ path: '/', element: <Home /> }]);
