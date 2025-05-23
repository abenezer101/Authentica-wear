import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import ProductListingPage from "@/pages/ProductListingPage";
import ProductDetailsPage from "@/pages/ProductDetailsPage";
import CartPage from "@/pages/CartPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminDashboardPage from "@/pages/AdminPanelPages/AdminDashboardPage";
import AdminOrdersPage from "@/pages/AdminPanelPages/AdminOrdersPage";
import AdminProductsPage from "@/pages/AdminPanelPages/AdminProductsPage";
import AdminCustomersPage from "@/pages/AdminPanelPages/AdminCustomersPage";
import CustomerPortal from "@/pages/CustomerPortal";
import CustomerOrdersPage from "@/pages/CustomerOrdersPage";
import CustomerOrderDetailPage from "@/pages/CustomerOrderDetailPage";
import CustomerWishlistPage from "@/pages/CustomerWishlistPage";
import CustomerAddressesPage from "@/pages/CustomerAddressesPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="orders" element={<AdminOrdersPage />} />
                <Route path="products" element={<AdminProductsPage />} />
                <Route path="customers" element={<AdminCustomersPage />} />
              </Route>
              
              {/* Customer Portal Routes */}
              <Route path="/customer" element={
                <>
                  <Navbar />
                  <CustomerPortal />
                  <Footer />
                </>
              } />
              <Route path="/customer/orders" element={
                <>
                  <Navbar />
                  <CustomerOrdersPage />
                  <Footer />
                </>
              } />
              <Route path="/customer/orders/:orderId" element={
                <>
                  <Navbar />
                  <CustomerOrderDetailPage />
                  <Footer />
                </>
              } />
              <Route path="/customer/wishlist" element={
                <>
                  <Navbar />
                  <CustomerWishlistPage />
                  <Footer />
                </>
              } />
              <Route path="/customer/addresses" element={
                <>
                  <Navbar />
                  <CustomerAddressesPage />
                  <Footer />
                </>
              } />
              
              {/* Main site routes */}
              <Route path="/" element={
                <>
                  <Navbar />
                  <HomePage />
                  <Footer />
                </>
              } />
              <Route path="/category/:category" element={
                <>
                  <Navbar />
                  <ProductListingPage />
                  <Footer />
                </>
              } />
              <Route path="/product/:productId" element={
                <>
                  <Navbar />
                  <ProductDetailsPage />
                  <Footer />
                </>
              } />
              <Route path="/cart" element={
                <>
                  <Navbar />
                  <CartPage />
                  <Footer />
                </>
              } />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
