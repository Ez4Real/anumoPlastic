import './App.css';
import { useLocation, useRoutes } from 'react-router-dom';
import Main from './Pages/Main';
import Header from './Components/Header';
import ContactUs from './Pages/ContactUs';
import Footer from './Components/Footer';

const App = () => {
  const routes = [
    {
      path: '/',
      element: <Main/>
    },
    {
      path: '/contact-us',
      element: <ContactUs />
    },
    {
      path: '*',
      element: <></>
    },
  ]

  const routesElement = useRoutes(routes);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <div className='container'>
      <Header isWhiteTheme={isHomePage ? true : undefined} />
      { routesElement }
      <Footer />
    </div>
  );
};

export default App;