import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import PublicRoutes from './components/routes/PublicRoutes.jsx';
import PrivateRoutes from './components/routes/PrivateRoutes.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Login/Register.jsx';
import ViewProfile from './components/profile/ViewProfile.jsx';
import UpdateProfile from './components/profile/UpdateProfile.jsx';
import Main from './layout/Main.jsx';
import NotFound from './components/NotFound.jsx';
import AuthProvider from './components/providers/AuthProvider.jsx';
import Home from './components/Home.jsx';
import { ThemeProvider } from './components/Theme.jsx';





import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddFood from './components/foods/AddFood.jsx';
import AllFoods from './components/foods/AllFoods.jsx';
import SingleFood from './components/foods/SingleFood.jsx';
import Purchase from './components/purchase/Purchase.jsx';
import Gallery from './components/Gallery.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
      {
        path:'/',
        element: <Home></Home>,
      },
      {
        path:'/login',
        element: <Login></Login>

      },
     
      {
        path:'/signup',
        element: <PublicRoutes><Register></Register></PublicRoutes>
      },
      {
        path:'/profile',
        element: <PrivateRoutes><ViewProfile></ViewProfile></PrivateRoutes>
      },
      {
        path:'/updateprofile',
        element: <PrivateRoutes><UpdateProfile></UpdateProfile></PrivateRoutes>
      },
      {
        path:'/foods',
        element: <AddFood></AddFood>
      },
      {
        path:'/allfoods',
        element: <AllFoods></AllFoods>
      },
      {
        path:'/fooddetails/:id',
        element: <SingleFood></SingleFood>,
        loader: ({ params }) => fetch(`http://localhost:5000/fooddetails/${params.id}`)

      },
      {
        path:'/purchase/:id',
        element: <Purchase></Purchase>,
        loader: ({ params }) => fetch(`http://localhost:5000/fooddetails/${params.id}`)

      },
      {
        path:'/gallery',
        element: <Gallery></Gallery>
      },
      

      
      {
        path: '*',
        element: <NotFound></NotFound>
      }
      



      
    

      
    
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <AuthProvider>
        <ThemeProvider>


<RouterProvider router={router} />
</ThemeProvider>

</AuthProvider>

  </React.StrictMode>,
)
