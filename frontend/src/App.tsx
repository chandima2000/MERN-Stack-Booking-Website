import {Route,  BrowserRouter , Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Register from './pages/Register';



export default function App() {
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


        </Routes>
     </BrowserRouter>
  );
};

