import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx';
import CreateParty from './routes/CreateParty.jsx';
import Home from './routes/Home.jsx';
import Party from './routes/Party.jsx';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/party/new',
        element: <CreateParty />,
      },
      {
        path: '/party/:id',
        element: <Party />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);
