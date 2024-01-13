import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import MovieDetails from "./pages/MovieDetails";
import ShowDetails from "./pages/ShowDetails";
import Favorites from "./pages/Favorites";

const urlroute = createBrowserRouter([
  { path: '/', element:<Navbar />, 
    children:[
      { index:true, element: <Home />},
      { path:'/movies', 
        element: <Movies />
      },
      { path:'/movies/:id', element: <MovieDetails />},
      { path:'/shows', 
        element:<TvShows />
      },
      { path:'/shows/:id', 
        element: <ShowDetails />
      },
      {
        path:'/favorites',
        element:<Favorites />
      }
    ]}
])

function MyApp() {
  return (
    <RouterProvider router={urlroute} />
  );
}

export default MyApp;
