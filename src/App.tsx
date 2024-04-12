import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReportingPage from './pages/dashboard';

const router = createBrowserRouter([
  {
    path: "/",
    Component: (ReportingPage)
  },
]);

const App = (): JSX.Element => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
