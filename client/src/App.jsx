import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/home/Home";
import path from "path";
import Index from "./pages/redirect/Index";
import './App.css'
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path:"shortUrl",
      element: <Home />,
     },
     {
      path:"short/:shortUrl",
      element: <Index />,
     }
  ]);

  return (
    <>
      <RouterProvider router={router}> </RouterProvider>
    </>
  );
}

export default App;
