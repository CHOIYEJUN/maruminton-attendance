import CreateAccount from '../pages/Auth/CreateAccount';
import Login from '../pages/Auth/Login';
import PrivateRoute from './PrivateRoute';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Flex } from '@chakra-ui/react';

import AttendList from '@pages/AttendList';
import Attendance from '@pages/Attendance';
import Layout from '@pages/Main';

const CustomRouterProvider = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <PrivateRoute element={<Layout />} />,
      children: [
        {
          path: 'attendance',
          element: <PrivateRoute element={<Attendance />} />,
        },
        {
          path: 'attendList',
          element: <PrivateRoute element={<AttendList />} />,
        },
      ],
    },
    {
      path: '/create-account',
      element: <CreateAccount />,
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);

  return (
    <Flex className={'RouterProvider'} maxWidth={'726px'} width={'100%'} margin={'0 auto'}>
      <RouterProvider router={router} />
    </Flex>
  );
};

export default CustomRouterProvider;
