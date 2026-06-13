import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Layout from "./components/Layout";

// Lazy Loaded Pages
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Auth = lazy(() => import("./pages/Auth"));
const Success = lazy(() => import("./pages/Success"));
const Account = lazy(() => import("./pages/Account"));

// Fallback Loader
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-bg font-sans uppercase tracking-[0.2em] text-text-secondary text-[0.8rem]">
    Loading...
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="auth" element={<Auth />} />
            <Route path="success" element={<Success />} />
            <Route path="account" element={<Account />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
