import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import MovieDetails from "./pages/MovieDetails";
import ShowDetails from "./pages/ShowDetails";
import Favorites from "./pages/Favorites";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage"
import SearchResults from "./pages/SearchResults";
import VideoPopup from  "./components/VideoPopup";

import { useEffect } from "react";
import { authentication } from "./redux/reducers/userReducer";
import { useDispatch } from "react-redux";
import { SkeletonTheme } from "react-loading-skeleton";

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
        path:'/search/results',
        element:<SearchResults />
      },
      {
        path:'/favorites',
        element:<Favorites />
      }
    ]},
    { path:'/signin', element:<SignInPage /> },
    { path:'/signup', element:<SignUpPage /> },
    { path:'/trailer', element:<VideoPopup />}
])

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authentication());
  }, [])

  return (
    <SkeletonTheme baseColor="#0e1f3b">
      <RouterProvider router={urlroute} />
    </SkeletonTheme>
  );
}

export default App;

