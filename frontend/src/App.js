import './App.css';
import { useLocation, useRoutes } from 'react-router-dom';
import Main from './Pages/Main';
import Header from './Components/Header';
import ContactUs from './Pages/ContactUs';
import Footer from './Components/Footer';
import Projects from './Pages/Projects';
import Product from './Pages/Product';
import Checkout from './Pages/Checkout';

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
      path: '/projects',
      element: <Projects/>
    },
    {
      path: '/product',
      element: <Product/>
    },
    {
      path: '/checkout',
      element: <Checkout/>
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