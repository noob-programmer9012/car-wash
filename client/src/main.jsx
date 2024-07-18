import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Services from "./pages/Services";
import ServicesComponent from "./components/Services";
import AddService from "./pages/AddService";
import { serviceLoader } from "./loaders/service";
import { login } from "./loaders/login";
import { adminServices } from "./loaders/adminServices";
import { categoryLoader } from "./loaders/category";
import { categoryAction } from "./action/categoryAction.";
import { serviceAction } from "./action/serviceAction";
import Login from "./pages/Login";
import { store, persistor } from "./store/auth";
import AppLandingPage from "./pages/AppLandingPage";
import AdminCategories from "./pages/AdminCategories";
import "./css/index.css";
import "./css/login.css";
import { dashboard } from "./loaders/dashbord";
import UserServices from "./pages/UserServices";
import { userCategory } from "./loaders/userCategory";

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
    ],
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
    children: [
      {
        index: true,
        element: <Services />,
        loader: serviceLoader,
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
