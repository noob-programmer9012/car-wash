import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Services from "./pages/Services";
import { serviceLoader } from "./loaders/service";
import { categoryLoader } from "./loaders/category";
import { categoryAction } from "./action/categoryAction.";
import Login from "./pages/Login";
import { store, persistor } from "./store/auth";
import AppLandingPage from "./pages/AppLandingPage";
import AdminCategories from "./pages/AdminCategories";
import "./css/index.css";
import "./css/login.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <AppLandingPage />,
      },
      {
        path: "/categories/:id",
        element: <h1>detail page</h1>,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
    children: [
      {
        index: true,
        element: <h1>Dashboard</h1>,
      },
      {
        path: "/admin/categories",
        element: <AdminCategories />,
        loader: categoryLoader,
        action: categoryAction,
      },
      {
        path: "/admin/services",
        element: <Services />,
        loader: serviceLoader,
      },
      {
        path: "/admin/customers",
        element: <h1>Customers</h1>,
      },
      {
        path: "/admin/orders",
        element: <h1>Orders</h1>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<></>} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
