import HomePage from './pages/Homepage';
import Registerpage from './pages/Registerpage';
import Loginpage from './pages/Loginpage';
import Profilepage from './pages/Profilepage';
import { Routes, Route } from 'react-router-dom';

const routes = [
  {
    id: 0,
    // element: <HomePage />,
    element: <HomePage />,
    path: '/',
  },
  {
    id: 1,
    path: '/register',
    element: <Registerpage />,
  },
  {
    id: 2,
    element: <Loginpage />,
    path: '/login',
  },
  {
    id: 3,
    element: <Profilepage />,
    path: '/profile',
  },
  {
    id: 100,
    path: '*',
    element: <h1>404</h1>,
  },
];

const AppRouter = () => {
  return (
    <Routes>
      {routes.map((r) => (
        <Route key={r.id} element={r.element} path={r.path} />
      ))}
    </Routes>
  );
};

export default AppRouter;
