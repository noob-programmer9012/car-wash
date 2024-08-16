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
import { getCategoryById } from "./loaders/getCategoryById";
import { editServiceFormLoader } from "./loaders/editServiceFormLoader";
import { cart } from "./loaders/cart";
import { resetPasswordLoader } from "./loaders/resetPasswordLoader";

// actions
import { categoryAction } from "./action/categoryAction.";
import { serviceAction } from "./action/serviceAction";
import { editCategoryAction } from "./action/editCategoryAction";
import { signUp } from "./action/signUp";
import { editService } from "./action/editService"

// pages
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Services from "./pages/Services";
import ServicesComponent from "./components/Services";
import AddService from "./components/AddService";
import Login from "./pages/Login";
import AppLandingPage from "./pages/AppLandingPage";
import AdminCategories from "./pages/AdminCategories";
import UserServices from "./pages/UserServices";
import Customers from "./pages/Customers";
import ServiceById from "./pages/ServiceById";
import Cart from "./pages/Cart";
import CategoryForm from "./components/CategoryForm";
import AdminCategoriesData from "./components/AdminCategoriesData";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";

// css
import "./css/index.css";
import "./css/login.css";
import { resetPassword } from "./action/resetPassword";

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
      {
        path: "/cart",
        element: <Cart />,
        loader: cart,
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
        children: [
          {
            index: true,
            element: <AdminCategoriesData />,
            loader: categoryLoader,
          },
          {
            path: "/admin/categories/add-category",
            element: <CategoryForm />,
            action: categoryAction,
          },
          {
            path: "/admin/categories/edit-category/:id",
            element: <CategoryForm />,
            loader: getCategoryById,
            action: editCategoryAction,
          },
        ],
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
          {
            path: "/admin/services/edit-service/:id",
            element: <AddService />,
            loader: editServiceFormLoader,
            action: editService,
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
  {
    path: "/signup",
    element: <Signup />,
    action: signUp,
  },
  {
    path: "/resetPassword/:resetToken",
    element: <ResetPassword />,
    loader: resetPasswordLoader,
    action: resetPassword,
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
