import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import Error from "../pages/Error";
import ProtectedRoute from "./ProtectedRoute";
import Overview from "../pages/Overview";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "signup",
        element: <Auth />,
      },
      {
        path: "signin",
        element: <Auth />,
      },
      {
        path: "",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <Home />,
          },
        ],
      },
      {
        path: "overview/:id",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <Overview />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);
