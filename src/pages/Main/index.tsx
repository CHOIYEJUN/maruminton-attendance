import { Outlet } from 'react-router';

import BottomMenu from '@pages/Main/Layout/BottomMenu';
import TopMenu from '@pages/Main/Layout/TopMenu';

import BasicFlex from '@components/layout/BasicFlex';

const Layout = () => {
  return (
    <BasicFlex
      direction={'vertical'}
      containerStyles={{
        width: '100%',
        height: '100vh',
      }}
    >
      <TopMenu />
      <BasicFlex
        containerStyles={{
          width: '100%',
          height: 'calc(100% - 100px)',
        }}
      >
        <Outlet />
      </BasicFlex>
      <BottomMenu />
    </BasicFlex>
  );
};

export default Layout;
