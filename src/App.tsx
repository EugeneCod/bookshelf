import { RouterProvider } from 'react-router-dom';

import { router } from './app/routes/router';


const App = () => {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
