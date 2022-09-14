import { ContactsForm, Filter } from 'components';
import ContactsPage from 'pages/Contacts/ContactsPage';
import HomePage from 'pages/Home/HomePage';
import LoginPage from 'pages/Login/LoginPage';
import RegistrationPage from 'pages/Registration/RegistrationPage';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import authOperations from '../redux/auth/auth-operations';
import { useEffect } from 'react';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import PublicRoute from './PublicRoute/PublicRoute';

export const App = () => {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(
    state => state.auth.isFetchingCurrentUser
  );

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      {!isFetchingCurrentUser && (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="contacts"
              element={
                <PrivateRoute redirect="/login">
                  <ContactsPage />
                </PrivateRoute>
              }
            >
              <Route index element={<Filter />} />
              <Route path="add" element={<ContactsForm type={'add'} />} />
              <Route path="edit" element={<ContactsForm type={'update'} />} />
            </Route>

            <Route
              path="login"
              element={
                <PublicRoute redirect="/" restricted>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="registration"
              element={
                <PublicRoute redirect="/" restricted>
                  <RegistrationPage />
                </PublicRoute>
              }
            />
          </Route>
        </Routes>
      )}
    </>
  );
};
