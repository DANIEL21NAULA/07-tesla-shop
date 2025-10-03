import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { ShopLayout } from "./shop/layouts/ShopLayout";
import { HomePage } from "./shop/pages/home/HomePage";
import { ProductPage } from "./shop/pages/product/ProductPage";
import { GenderPage } from "./shop/pages/gender/GenderPage";
//import { AuthLayout } from "./auth/layouts/AuthLayout";
import { LoginPage } from "./auth/pages/login/LoginPage";
import { RegisterPage } from "./auth/pages/register/RegisterPage";
//import { AdminLayout } from "./admin/layouts/AdminLayout";
import { DashboardPage } from "./admin/pages/dashboard/DashboardPage";
import { AdminProductsPage } from "./admin/pages/products/AdminProductsPage";
import { AdminProductPage } from "./admin/pages/product/AdminProductPage";

//! esta carga perezosa se lo hace porque son archivos que no van a ser utilizados al instante
const AuthLayout = lazy(() => import('./auth/layouts/AuthLayout'));
const AdminLayout = lazy(() => import('./admin/layouts/AdminLayout'));

export const appRouter = createBrowserRouter([
  //* Main Routers (Rutas Publicas)
  {
    path: '/',
    element: <ShopLayout />,//* Elemento que se muestra por default
    children: [//*las rutas publicas
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'product/:idSlug',
        element: <ProductPage />
      },
      {
        path: 'gender/:gender',
        element: <GenderPage /> ,
      }
    ]
  },
  //*Auth Routes
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login*" /> //* esto es por si alguien ingresa por error /auth se rediriga /auth/login
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      }
    ]
  },
  //* Admin Routes
  {
    path: '/admin',
    element: <AdminLayout />,
    children:[
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: 'products', //! cuando son rutas hijas no inician con /
        element: <AdminProductsPage />
      },
      {
        path: 'products/:id',
        element: <AdminProductPage />
      }
    ]
  },
  {//* Esta ruta es por si no es ninguna de las rutas declaradas se rediriga al home
    path: '*',
    element: <Navigate to="/"/>
  }
]);