import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import GameByCategory from "../Pages/GameByCategory";
import ErrorPage from "../Components/Shared/ErrorPage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AuthLayout from "../Layout/AuthLayout";
import Details from "../Pages/Details";
import PrivateRoute from "../Provider/PrivateRoute";
import Account from "../Layout/Account";
import Profile from "../Pages/Profile";
import Library from "../Pages/Library";
import Loader from "../Components/Shared/Loader";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        errorElement: <ErrorPage />,
      },
      {
        path: "/categories/:id",
        element: <GameByCategory></GameByCategory>,
        loader: async () => {
          const res = await fetch("/games.json");
          const categoryData = await res.json();
          return categoryData;
        },
        hydrateFallbackElement:<Loader></Loader>,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
        errorElement: <ErrorPage />,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/gameDetails/:id",
    element: (
      <PrivateRoute>
        <Details></Details>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    loader: () => fetch("/games.json"),
    hydrateFallbackElement:<Loader></Loader>
  },
  {
    path: "/account",
    element: (
      <PrivateRoute>
        <Account></Account>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/account/profile",
        element: <Profile></Profile>,
        errorElement: <ErrorPage />,
      },
      {
        path: "/account/library",
        element: <Library></Library>,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default routes;
