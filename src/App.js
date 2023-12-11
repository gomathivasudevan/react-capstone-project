import logo from './logo.svg';
import './App.css';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from "./components/Navbar"
import Home from './components/Home';
import slides from './data/carouselData.json';
import { Medicines } from './components/Medicines';
import { Cart } from './components/Cart';
import { MedicineContextProvider } from './components/MedicineContext';
import React, { Suspense, useEffect } from 'react';
import Login from './components/Login';
import More from './components/More';

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet/>
    </>
  )
}

const LazyEmployee = React.lazy(() => import ('./components/Employees'))
function App() {
  const navigate = useNavigate()

  //On browser refresh, redirect to Login page
  useEffect(() => {
      navigate('/login')
  }, []);
  //

  return (
    <>
    <MedicineContextProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home slides={slides}/>}></Route>
          <Route path="/employees" element={
            <Suspense fallback={<div>Loading...</div>}>
              <LazyEmployee/>
            </Suspense>
          }>
          </Route>
          <Route path="/medicines" element={<Medicines/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/more/:id" element={<More/>}></Route>
        </Route>
      </Routes>
    </MedicineContextProvider>
    </>
  );
}

export default App;
