import { RouterProvider } from 'react-router-dom';

import { router } from './app/routes/router';
import { useFirebaseAuth } from './hooks/useFirebaseAuth';
import { Preloader, ErrorBoundary } from './components';

const App = () => {
  const { isCheckAuth } = useFirebaseAuth();
  return isCheckAuth ? (
    <Preloader />
  ) : (
    <ErrorBoundary>
      <div className="app">
        <RouterProvider router={router} />
      </div>
    </ErrorBoundary>
  );
};

export default App;
