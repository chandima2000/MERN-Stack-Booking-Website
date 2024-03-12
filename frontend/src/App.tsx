import {Route,  BrowserRouter , Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import AddHotel from './pages/AddHotel';
import { useAppContext } from './contexts/AppContext';



export default function App() {

      const {isLoggedIn} = useAppContext();

  return (
     <BrowserRouter>
        <Routes>

          <Route 
              path = "/" 
              element = {
                    <Layout>
                          <p>Home page</p>
                    </Layout>} 
          />

          <Route 
              path='/search' 
              element ={
                    <Layout>
                          <p>Search page</p>
                    </Layout>}
          />
        <Route 
              path = "/register" 
              element ={
                <Layout>
                    <Register/>
                </Layout>
              }
         />

         <Route
              path = "/sign-in"
              element = {
                  <Layout>
                        <SignIn/>
                  </Layout>
              }
         />

         {isLoggedIn && (
             <>
                  path = "/add-hotel"
                  element = {
                        <Layout>
                              <AddHotel/>
                        </Layout>
                  }
             </>
          )}

        </Routes>
     </BrowserRouter>
  );
};

