import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Home from './pages/Home'
import ViewProduct from './pages/ViewProduct'
import Navbar from './pages/Navbar'
import AuthenticationPage from './pages/AuthenticationPage'
import SellerDashboard from './pages/seller/SellerDashboard'
import CustomerSearch from './pages/customer/pages/CustomerSearch'
import Products from './components/Products';
import { useEffect, useState } from 'react'; // Added useState import
import { getProducts } from './redux/userHandle';
import CustomerOrders from './pages/customer/pages/CustomerOrders';
import CheckoutSteps from './pages/customer/pages/CheckoutSteps';
import Profile from './pages/customer/pages/Profile';
import Logout from './pages/Logout';
import { isTokenValid } from './redux/userSlice';
import CheckoutAftermath from './pages/customer/pages/CheckoutAftermath';
import ViewOrder from './pages/customer/pages/ViewOrder';

const App = () => {

  const dispatch = useDispatch()

  const { isLoggedIn, currentToken, currentRole, productData } = useSelector(state => state.user);

  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    try {
      dispatch(isTokenValid());
    } catch (error) {
      setError(error); // Caught and set error
    }
  }, [dispatch]);

  if (error) {
    return <div>Error: {error.message}</div>; // Render error message
  }

  return (
    <BrowserRouter>
      {(!isLoggedIn && currentRole === null) &&
        <>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path='*' element={<Navigate to="/" />} />

            <Route path="/Products" element={<Products productData={productData} />} />

            <Route path="/product/view/:id" element={<ViewProduct />} />

            <Route path="/Search" element={<CustomerSearch mode="Mobile" />} />
            <Route path="/ProductSearch" element={<CustomerSearch mode="Desktop" />} />

            <Route path="/Customerregister" element={<AuthenticationPage mode="Register" role="Customer" />} />
            <Route path="/Customerlogin" element={<AuthenticationPage mode="Login" role="Customer" />} />
            <Route path="/Sellerregister" element={<AuthenticationPage mode="Register" role="Seller" />} />
            <Route path="/Sellerlogin" element={<AuthenticationPage mode="Login" role="Seller" />} />
          </Routes>
        </>
      }

      {(isLoggedIn && currentRole === "Customer") &&
        <>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path='*' element={<Navigate to="/" />} />

            <Route path="/Products" element={<Products productData={productData} />} />

            <Route path="/product/view/:id" element={<ViewProduct />} />

            <Route path="/Search" element={<CustomerSearch mode="Mobile" />} />
            <Route path="/ProductSearch" element={<CustomerSearch mode="Desktop" />} />

            <Route path="/Checkout" element={<CheckoutSteps />} />
          </Routes>
        </>
      }

        {(isLoggedIn && currentRole === "Seller") && (
           <SellerDashboard />
            )}

    </BrowserRouter >
  )
}

export default App