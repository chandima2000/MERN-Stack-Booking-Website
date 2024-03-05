import {Route,  BrowserRouter , Routes } from 'react-router-dom';
import Layout from './layouts/Layout';



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
      
        </Routes>
     </BrowserRouter>
  );
};

