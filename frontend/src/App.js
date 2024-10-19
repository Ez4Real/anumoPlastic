import './App.css';
import { useRoutes } from 'react-router-dom';
import Main from './Pages/Main';
import Header from './Components/Header';

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
      <Header />
      { routesElement }
    </div>
  );
};

export default App;