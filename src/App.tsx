import { RouterProvider } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';

import { router } from './app/routes/router';
import { useFirebaseAuth } from './hooks/useFirebaseAuth';
import { Preloader } from './components';

const App = () => {
  const { isCheckAuth } = useFirebaseAuth();
  return isCheckAuth ? (
    <Preloader />
  ) : (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};

export default withErrorBoundary(App, {
  fallback: <h1>Something went wrong.</h1>,
});
