import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import { Header, Preloader } from '../../components';

const MainLayout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Preloader />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MainLayout;
