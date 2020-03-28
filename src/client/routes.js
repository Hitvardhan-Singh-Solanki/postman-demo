import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ErrorPage from './pages/ErrorPage';

export default [
  {
    path: '/',
    component: HomePage,
    exact: true
  },
  {
    path: '/auth',
    component: AuthPage
  },
  {
    path: '/error',
    component: ErrorPage
  }
  // {
  //     loadData,
  //     path: '/users',
  //     component: UsersListPage
  // }
];
