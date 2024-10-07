import './App.css';
import { useRoutes } from 'react-router-dom';
import Main from './Pages/Main';

const App = () => {
  const routes = [
    {
      path: '/',
      element: <Main/>
    },
    {
      path: '*',
      element: <></>
    },
  ]

  const routesElement = useRoutes(routes);

  return (
    <div className='container'>
      { routesElement }
    </div>
  );
};

export default App;