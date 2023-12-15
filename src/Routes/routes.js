import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import FetchDetail from "../Pages/FetchDetail";
import HomePage from "../Pages/HomePage";

let router = "";

let authRoutes = [{
  path: "/",
  element: <Outlet />,
  children: [
    { index: true, element: <Navigate to="/home" replace /> },
    {
      path: "/home",
      element: <HomePage />,
    },
  ],
},];

let unAuthRoutes = [
  {
    path: "/",
    element: <Outlet />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/success",
        element: <FetchDetail />,
      },
    ],
  },
];

if (localStorage.getItem("git_access_token")) {
  router = createBrowserRouter(authRoutes);
} else {
  router = createBrowserRouter(unAuthRoutes);
}

export default router;
