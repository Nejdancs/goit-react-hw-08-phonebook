import { ContactsForm, Filter } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import authOperations from '../redux/auth/auth-operations';
import { Suspense, useEffect } from 'react';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import PublicRoute from './PublicRoute/PublicRoute';
import { lazy } from 'react';

const HomePage = lazy(() => import('../pages/Home/HomePage'));
const ContactsPage = lazy(() => import('../pages/Contacts/ContactsPage'));
const LoginPage = lazy(() => import('../pages/Login/LoginPage'));
const RegistrationPage = lazy(() =>
  import('../pages/Registration/RegistrationPage')
);

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
        <Suspense fallback={null}>
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
                <Route
                  path=":id/edit"
                  element={<ContactsForm type={'update'} />}
                />
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
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      )}
    </>
  );
};
