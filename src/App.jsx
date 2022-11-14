import React from 'react';
import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchCurrentUser } from "redux/auth/authOperations";
import { getAuth } from "redux/auth/authSlice";
import {PrivateRoute} from "./components/routes/PrivateRoute";
import {PublicRoute} from "./components/routes/PublicRoute";
import { Layout } from "./components/Layout/Layout";
import { LoaderRoute } from "./components/Loader/Loader";

const Phonebook = lazy(() => import('./components/Phonebook/Phonebook'))
const RegisterForm = lazy(() => import('./components/RegisterForm/RegisterForm'))
const LoginForm = lazy(() => import('./components/LoginForm/LoginForm'))
const NotFound = lazy(() => import('./components/NotFound/NotFound'))

export const App = () => {
  const dispatch = useDispatch();
  const { isLoadingUser } = useSelector(getAuth)

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch])

return (
    <>
      {isLoadingUser ? <LoaderRoute /> : 
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path="/register" element={<PublicRoute><RegisterForm /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><LoginForm /></PublicRoute>} />
          <Route path="/contacts" element={<PrivateRoute><Phonebook /></PrivateRoute>} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
      }
      <ToastContainer autoClose={1000}/>
    </>
  );
};