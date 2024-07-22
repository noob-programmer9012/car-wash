import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./store/auth";

// loaders
import { serviceLoader } from "./loaders/service";
import { login } from "./loaders/login";
import { adminServices } from "./loaders/adminServices";
import { categoryLoader } from "./loaders/category";
import { getUsers } from "./loaders/getUsers";
import { dashboard } from "./loaders/dashbord";
import { userCategory } from "./loaders/userCategory";
import { serviceById } from "./loaders/serviceById";

// actions
import { categoryAction } from "./action/categoryAction.";
import { serviceAction } from "./action/serviceAction";

// pages
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Services from "./pages/Services";
import ServicesComponent from "./components/Services";
import AddService from "./pages/AddService";
import Login from "./pages/Login";
import AppLandingPage from "./pages/AppLandingPage";
import AdminCategories from "./pages/AdminCategories";
import UserServices from "./pages/UserServices";
import Customers from "./pages/Customers";

// css
import "./css/index.css";
import "./css/login.css";
import ServiceById from "./pages/ServiceById";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    loader: dashboard,
    children: [
      {
        index: true,
        element: <AppLandingPage />,
        loader: userCategory,
      },
      {
        path: "/categories/:id",
        element: <UserServices />,
        loader: serviceLoader,
      },
      {
        path: "/service/:id",
        element: <ServiceById />,
        loader: serviceById,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
    children: [
      {
        index: true,
        element: <Services />,
        // loader: serviceLoader,
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
        children: [
          {
            index: true,
            element: <ServicesComponent />,
            loader: adminServices,
          },
          {
            path: "/admin/services/add-service",
            element: <AddService />,
            loader: categoryLoader,
            action: serviceAction,
          },
        ],
      },

      {
        path: "/admin/customers",
        element: <Customers />,
        loader: getUsers,
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
    loader: login,
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
